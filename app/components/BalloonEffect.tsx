'use client';

import { useEffect } from 'react';

const baseColors = [
  'rgba(255, 82, 82, 0.8)',
  'rgba(255, 177, 66, 0.8)',
  'rgba(52, 172, 224, 0.8)',
  'rgba(51, 217, 178, 0.8)',
  'rgba(112, 111, 211, 0.8)',
  'rgba(255, 121, 63, 0.8)'
];

function createBalloons(container: HTMLElement, colors: string[], count: number, minDelay: number, maxDelay: number) {
  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'balloon-wrapper';
    wrapper.style.left = `${Math.random() * 100}%`;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';

    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    const baseColorMatch = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
    if (baseColorMatch) {
      const r = Number(baseColorMatch[1]);
      const g = Number(baseColorMatch[2]);
      const b = Number(baseColorMatch[3]);
      balloon.style.background = `radial-gradient(
        circle at 30% 20%,
        rgba(255, 255, 255, 0.9) 5%,
        rgba(${r}, ${g}, ${b}, 0.8) 20%,
        rgba(${r}, ${g}, ${b}, 0.6) 60%,
        rgba(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)}, 0.8) 100%
      )`;
    }

    const size = 60 + Math.random() * 40;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.3}px`;

    const balloonString = document.createElement('div');
    balloonString.className = 'balloon-string';
    const stringRotation = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2);
    balloonString.style.transform = `translateX(-50%) rotate(${stringRotation}deg)`;
    balloonString.style.height = `${40 + Math.random() * 15}px`;
    balloon.appendChild(balloonString);

    wrapper.appendChild(balloon);
    wrapper.style.transform = `rotate(${-10 + Math.random() * 20}deg)`;

    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    const floatSpeed = 5 + (Math.random() ** 2) * 15;
    wrapper.style.animation = `
      float ${floatSpeed}s linear ${delay}s forwards,
      sway ${2 + Math.random() * 3}s ease-in-out ${delay}s infinite
    `;

    container.appendChild(wrapper);
  }
}

function createBalloonsBatched(container: HTMLElement, colors: string[], totalCount: number, minDelay: number, maxDelay: number) {
  const timers: number[] = [];
  const initialBatchSize = Math.ceil(totalCount * 0.2);
  const remainingCount = totalCount - initialBatchSize;

  createBalloons(container, colors, initialBatchSize, minDelay, maxDelay);

  if (remainingCount > 0) {
    const secondBatchSize = Math.ceil(remainingCount * 0.4);
    timers.push(window.setTimeout(() => {
      createBalloons(container, colors, secondBatchSize, minDelay, maxDelay);

      const thirdBatchSize = remainingCount - secondBatchSize;
      if (thirdBatchSize > 0) {
        timers.push(window.setTimeout(() => {
          createBalloons(container, colors, thirdBatchSize, minDelay, maxDelay);
        }, 800));
      }
    }, 500));
  }

  return () => timers.forEach(timer => window.clearTimeout(timer));
}

function getBalloonCount(windowWidth: number) {
  if (windowWidth < 576) return 20;
  if (windowWidth < 992) return 25 + Math.floor((windowWidth - 576) / 100);
  if (windowWidth < 1600) return 30 + Math.floor((windowWidth - 992) / 100);
  return 30 + Math.min(10, Math.floor((windowWidth - 1600) / 200));
}

function showBalloons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const timers: number[] = [];
  const container = document.createElement('div');
  container.className = 'balloon-container';
  let cancelBatches = () => {};

  timers.push(window.setTimeout(() => {
    document.body.appendChild(container);
    cancelBatches = createBalloonsBatched(container, baseColors, getBalloonCount(window.innerWidth), 0.5, 3);

    timers.push(window.setTimeout(() => {
      cancelBatches();
      container.remove();
    }, 25000));
  }, 200));

  return () => {
    timers.forEach(timer => window.clearTimeout(timer));
    cancelBatches();
    container.remove();
  };
}

export default function BalloonEffect() {
  useEffect(() => showBalloons(), []);

  return null;
}
