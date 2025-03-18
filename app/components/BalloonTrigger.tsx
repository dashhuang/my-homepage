'use client';

import { useState, useEffect } from 'react';
import BalloonEffect from './BalloonEffect';

// 定义组件属性类型
interface BalloonTriggerProps {
  // 自动显示气球的特殊日期, 格式: 'MM-DD'，如："01-01"表示1月1日
  specialDates?: string[];
  // 是否在页面首次加载时显示
  showOnFirstVisit?: boolean;
  // 是否启用页面加载时的自动显示逻辑
  autoTriggerEnabled?: boolean;
}

// 定义生日信息映射
const birthdayInfo: Record<string, { name: string, chineseName: string }> = {
  '03-18': { name: 'Dash', chineseName: 'Dash' },
  '12-14': { name: 'Cherry', chineseName: 'Cherry' },
  '03-23': { name: 'Jimmy', chineseName: 'Jimmy' },
  '09-21': { name: 'Tinny', chineseName: 'Tinny' },
  '10-16': { name: 'Kelly', chineseName: 'Kelly' }
};

export default function BalloonTrigger({
  specialDates = [],
  showOnFirstVisit = false,
  autoTriggerEnabled = true
}: BalloonTriggerProps) {
  // 是否显示气球
  const [showBalloons, setShowBalloons] = useState(false);
  // 当前庆祝的生日人名
  const [birthdayPerson, setBirthdayPerson] = useState<{name: string, chineseName: string} | null>(null);
  
  // 检查是否是首次访问
  const checkFirstVisit = () => {
    if (typeof window !== 'undefined') {
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        localStorage.setItem('hasVisited', 'true');
        return true;
      }
    }
    return false;
  };
  
  // 检查当前日期是否是特殊日期
  const isSpecialDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${month}-${day}`;
    
    if (specialDates.includes(dateString)) {
      // 如果是特殊日期（家庭成员生日），设置生日人信息
      setBirthdayPerson(birthdayInfo[dateString] || null);
      return true;
    }
    return false;
  };
  
  // 根据条件自动触发气球效果
  useEffect(() => {
    // 如果自动触发被禁用，则不执行
    if (!autoTriggerEnabled) return;
    
    // 检查是否满足显示条件
    const shouldShowBalloons = 
      (showOnFirstVisit && checkFirstVisit()) || 
      isSpecialDate();
    
    if (shouldShowBalloons) {
      setShowBalloons(true);
      
      // 如果是生日，显示提示消息
      if (birthdayPerson && typeof window !== 'undefined') {
        // 延迟显示提示，等气球效果开始后
        setTimeout(() => {
          const language = localStorage.getItem('language') as 'zh' | 'en' || 'zh';
          const message = language === 'zh' 
            ? `今天是${birthdayPerson.chineseName}的生日！` 
            : `Today is ${birthdayPerson.name}'s birthday!`;
          
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
          notification.textContent = message;
          
          document.body.appendChild(notification);
          
          // 10秒后移除提示
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 10000);
        }, 3000);
      }
    }
  }, [showOnFirstVisit, specialDates, autoTriggerEnabled, birthdayPerson]);
  
  // 手动触发气球效果的方法
  const triggerBalloons = () => {
    setShowBalloons(true);
    
    // 气球效果结束后重置状态
    setTimeout(() => {
      setShowBalloons(false);
    }, 26000); // 略长于气球效果的持续时间
  };
  
  // 将触发方法暴露给全局，以便其他组件可以调用
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error - 添加全局方法
      window.triggerBalloonEffect = triggerBalloons;
    }
    
    // 组件卸载时移除全局方法
    return () => {
      if (typeof window !== 'undefined') {
        // @ts-expect-error - 移除全局方法
        delete window.triggerBalloonEffect;
      }
    };
  }, []);
  
  return (
    <>
      {showBalloons && <BalloonEffect />}
    </>
  );
} 