export type StatusType = {
  text: string;
  color: string;
  subtext: string;
};

const statusConfig: Record<string, StatusType> = {
  AVAILABLE: {
    text: 'Available for new projects',
    color: 'bg-emerald-500',
    subtext: 'Typically respond within 24-48 hours'
  },
  VACATION: {
    text: 'Currently on vacation',
    color: 'bg-amber-500',
    subtext: 'Will respond after returning'
  },
  BUSY: {
    text: 'Building project for client',
    color: 'bg-sky-500',
    subtext: 'Limited availability for new projects'
  },
  TOUR: {
    text: 'On tour',
    color: 'bg-violet-500',
    subtext: 'Response time may vary'
  }
};

export function getStatus(): StatusType {
  const currentStatus = process.env.NEXT_PUBLIC_CURRENT_STATUS || 'AVAILABLE';
  return statusConfig[currentStatus] || statusConfig.AVAILABLE;
}