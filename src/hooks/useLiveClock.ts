import { useState, useEffect } from 'react';

/**
 * useLiveClock - Dependency Inversion abstraction for live formatted timezone clock
 * Single Responsibility: Manages interval updates for a target timezone.
 */
export function useLiveClock(timeZone: string = 'Asia/Karachi'): string {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setFormattedTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return formattedTime;
}
