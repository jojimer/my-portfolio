"use client";

import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/stores/game-store';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { canvasWidth, canvasHeight, isPlaying } = useGameStore();
  const [isDragging, setIsDragging] = useState(false);
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const calculatePosition = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 6 - 3;
      const y = -((clientY - rect.top) / rect.height) * 3 + 1.5;
      return {
        x: Math.max(-3, Math.min(3, x)),
        y: Math.max(-1.5, Math.min(1.5, y))
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = calculatePosition(e.clientX, e.clientY);
      setPosition(newPosition);
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setLastTouchPosition(calculatePosition(touch.clientX, touch.clientY));
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDragging) return;

      const touch = e.touches[0];
      const newPosition = calculatePosition(touch.clientX, touch.clientY);
      setPosition(newPosition);
      setLastTouchPosition(newPosition);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    // Mouse events
    window.addEventListener('mousemove', handleMouseMove);

    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canvasWidth, canvasHeight, isPlaying, isDragging]);

  return position;
}