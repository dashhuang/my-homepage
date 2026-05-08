'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import BalloonEffect from './BalloonEffect';

declare global {
  interface Window {
    triggerBalloonEffect?: () => void;
  }
}

interface BalloonTriggerProps {
  specialDates?: string[];
  showOnFirstVisit?: boolean;
  autoTriggerEnabled?: boolean;
}

const birthdayInfo: Record<string, { name: string, chineseName: string }> = {
  '03-18': { name: 'Dash', chineseName: 'Dash' },
  '12-14': { name: 'Cherry', chineseName: 'Cherry' },
  '03-23': { name: 'Jimmy', chineseName: 'Jimmy' },
  '09-21': { name: 'Tinny', chineseName: 'Tinny' },
  '10-16': { name: 'Kelly', chineseName: 'Kelly' }
};

function checkFirstVisit() {
  const hasVisited = localStorage.getItem('hasVisited');
  if (hasVisited) return false;

  localStorage.setItem('hasVisited', 'true');
  return true;
}

function getTodaySpecialPerson(specialDates: string[]) {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${month}-${day}`;

  if (!specialDates.includes(dateString)) {
    return null;
  }

  return birthdayInfo[dateString] || null;
}

function showBirthdayNotification(person: { name: string, chineseName: string }) {
  const language = localStorage.getItem('language') as 'zh' | 'en' || 'zh';
  const message = language === 'zh'
    ? `今天是${person.chineseName}的生日！`
    : `Today is ${person.name}'s birthday!`;

  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '2rem';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  notification.style.color = 'white';
  notification.style.padding = '1rem 2rem';
  notification.style.borderRadius = '4px';
  notification.style.zIndex = '10001';
  notification.style.fontSize = '1.2rem';
  notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  notification.style.whiteSpace = 'nowrap';
  notification.textContent = message;

  document.body.appendChild(notification);
  return () => notification.remove();
}

export default function BalloonTrigger({
  specialDates = [],
  showOnFirstVisit = false,
  autoTriggerEnabled = true
}: BalloonTriggerProps) {
  const [balloonRunId, setBalloonRunId] = useState(0);
  const specialDateKey = useMemo(() => specialDates.join('|'), [specialDates]);

  useEffect(() => {
    if (!autoTriggerEnabled) return;

    const normalizedSpecialDates = specialDateKey ? specialDateKey.split('|') : [];
    const birthdayPerson = getTodaySpecialPerson(normalizedSpecialDates);
    const shouldShowBalloons = (showOnFirstVisit && checkFirstVisit()) || Boolean(birthdayPerson);

    if (!shouldShowBalloons) return;

    setBalloonRunId(runId => runId + 1);

    let removeNotification: (() => void) | undefined;
    const notificationTimer = birthdayPerson
      ? window.setTimeout(() => {
          removeNotification = showBirthdayNotification(birthdayPerson);
        }, 3000)
      : undefined;
    const removeTimer = birthdayPerson
      ? window.setTimeout(() => {
          removeNotification?.();
        }, 13000)
      : undefined;

    return () => {
      if (notificationTimer) window.clearTimeout(notificationTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
      removeNotification?.();
    };
  }, [autoTriggerEnabled, showOnFirstVisit, specialDateKey]);

  const triggerBalloons = useCallback(() => {
    setBalloonRunId(runId => runId + 1);
  }, []);

  useEffect(() => {
    window.triggerBalloonEffect = triggerBalloons;

    return () => {
      delete window.triggerBalloonEffect;
    };
  }, [triggerBalloons]);

  return balloonRunId > 0 ? <BalloonEffect key={balloonRunId} /> : null;
}
