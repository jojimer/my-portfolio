import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { time } from "node:console";

// In-memory store for rate limiting
const rateLimit = new Map();

// Rate limit window in seconds
const WINDOW_SIZE = 60;
// Maximum requests per window
const MAX_REQUESTS = 5;

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/api/send-message') {
    const ip = request.ip ?? 'anonymous';
    const now = Date.now();
    const windowStart = now - WINDOW_SIZE * 1000;

    const requestTimestamps = rateLimit.get(ip) || [];
    const recentRequests = requestTimestamps.filter((timestamp: number) => timestamp > windowStart);

    if (recentRequests.length >= MAX_REQUESTS) {
      return NextResponse.json(
        { message: 'Too many requests' },
        { status: 429 }
      );
    }

    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/send-message',
};