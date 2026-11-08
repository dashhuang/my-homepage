'use client';

import { useCallback, useEffect, useState } from 'react';
import BalloonEffect from './BalloonEffect';
import { familyMembers } from '../constants/family';
import { texts } from '../constants/texts';
import type { Lang } from '../lib/i18n';

declare global {
  interface Window {
    triggerBalloonEffect?: () => void;
  }
}

function getTodayBirthdayPerson() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return familyMembers.find(member => member.birthday === `${month}-${day}`) ?? null;
}

function showBirthdayNotification(message: string) {
  const notification = document.createElement('div');
  notification.setAttribute('role', 'status');
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

// 家庭成员生日当天自动放气球并提示；也可以在控制台调用 window.triggerBalloonEffect()
export default function BalloonTrigger({ lang }: { lang: Lang }) {
  const [balloonRunId, setBalloonRunId] = useState(0);

  useEffect(() => {
    const birthdayPerson = getTodayBirthdayPerson();
    if (!birthdayPerson) return;

    // 减少动效时只显示文字提示，不放气球
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBalloonRunId(runId => runId + 1);
    }

    let removeNotification: (() => void) | undefined;
    const notificationTimer = window.setTimeout(() => {
      removeNotification = showBirthdayNotification(texts.birthday[lang](birthdayPerson.nickname));
    }, 3000);
    const removeTimer = window.setTimeout(() => {
      removeNotification?.();
    }, 13000);

    return () => {
      window.clearTimeout(notificationTimer);
      window.clearTimeout(removeTimer);
      removeNotification?.();
    };
  }, [lang]);

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
