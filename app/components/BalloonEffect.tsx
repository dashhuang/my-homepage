'use client';

import { useEffect } from 'react';

export default function BalloonEffect() {
  useEffect(() => {
    // 在组件挂载时显示气球
    showBalloons();

    // 组件卸载时清理
    return () => {
      const container = document.querySelector('.balloon-container');
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  // 创建全屏气球效果
  function showBalloons() {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'balloon-container';
    
    // 气球基础颜色
    const baseColors = [
      'rgba(255, 82, 82, 0.8)', // 红色
      'rgba(255, 177, 66, 0.8)', // 橙色
      'rgba(52, 172, 224, 0.8)', // 蓝色
      'rgba(51, 217, 178, 0.8)', // 绿色
      'rgba(112, 111, 211, 0.8)', // 紫色
      'rgba(255, 121, 63, 0.8)'  // 橙红色
    ];
    
    // 根据浏览器窗口宽度动态确定气球数量
    const windowWidth = window.innerWidth;
    let balloonCount;
    
    // 根据不同宽度范围设置气球数量
    if (windowWidth < 576) { // 手机
      balloonCount = 20;
    } else if (windowWidth < 992) { // 平板
      balloonCount = 25 + Math.floor((windowWidth - 576) / 100); // 25-30个
    } else if (windowWidth < 1600) { // 桌面正常屏幕
      balloonCount = 30 + Math.floor((windowWidth - 992) / 100); // 30-40个
    } else { // 大屏幕/超宽屏幕
      balloonCount = 30 + Math.min(10, Math.floor((windowWidth - 1600) / 200)); // 30-40个，显著减少
    }
    
    // 创建容器但先不添加到页面，等延迟后再添加
    // 这样可以确保气球效果在DOM准备好之后才开始
    setTimeout(() => {
      // 添加到页面
      document.body.appendChild(container);
      
      // 分批创建气球，减轻初始加载压力
      createBalloonsBatched(container, baseColors, balloonCount, 0.5, 3);
      
      // 25秒后自动关闭容器（基于最长的气球上升时间约为20秒）
      setTimeout(() => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }, 25000);
    }, 200); // 等待200ms，让页面完全加载后再开始气球效果
  }
  
  // 分批创建气球
  function createBalloonsBatched(container: HTMLElement, colors: string[], totalCount: number, minDelay: number, maxDelay: number) {
    // 初始批次 - 立即创建20%的气球
    const initialBatchSize = Math.ceil(totalCount * 0.2);
    const remainingCount = totalCount - initialBatchSize;
    
    // 创建第一批气球（立即）
    createBalloons(container, colors, initialBatchSize, minDelay, maxDelay);
    
    // 如果还有剩余气球，分2批创建
    if (remainingCount > 0) {
      // 第二批 - 500ms后创建40%的剩余气球
      const secondBatchSize = Math.ceil(remainingCount * 0.4);
      setTimeout(() => {
        createBalloons(container, colors, secondBatchSize, minDelay, maxDelay);
        
        // 第三批 - 再过800ms后创建剩余气球
        const thirdBatchSize = remainingCount - secondBatchSize;
        if (thirdBatchSize > 0) {
          setTimeout(() => {
            createBalloons(container, colors, thirdBatchSize, minDelay, maxDelay);
          }, 800);
        }
      }, 500);
    }
  }
  
  // 创建气球函数
  function createBalloons(container: HTMLElement, colors: string[], count: number, minDelay: number, maxDelay: number) {
    for (let i = 0; i < count; i++) {
      // 创建气球包装器
      const wrapper = document.createElement('div');
      wrapper.className = 'balloon-wrapper';
      
      // 随机位置和延迟
      const left = Math.random() * 100;
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      wrapper.style.left = `${left}%`;
      
      // 创建气球元素
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      
      // 随机基础颜色
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      
      // 获取纯色值用于生成渐变
      const baseColorMatch = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
      if (baseColorMatch) {
        const r = baseColorMatch[1];
        const g = baseColorMatch[2];
        const b = baseColorMatch[3];
        
        // 创建径向渐变与基础颜色结合
        const gradient = `radial-gradient(
          circle at 30% 20%, 
          rgba(255, 255, 255, 0.9) 5%, 
          rgba(${r}, ${g}, ${b}, 0.8) 20%, 
          rgba(${r}, ${g}, ${b}, 0.6) 60%,
          rgba(${Math.max(0, parseInt(r)-50)}, ${Math.max(0, parseInt(g)-50)}, ${Math.max(0, parseInt(b)-50)}, 0.8) 100%
        )`;
        
        balloon.style.background = gradient;
      }
      
      // 随机尺寸
      const size = 60 + Math.random() * 40; // 60px到100px之间
      balloon.style.width = `${size}px`;
      balloon.style.height = `${size * 1.3}px`;
      
      // 向包装器添加气球
      wrapper.appendChild(balloon);
      
      // 创建气球线元素
      const balloonString = document.createElement('div');
      balloonString.className = 'balloon-string';
      
      // 随机弯曲角度 (-4 到 4度之间)
      const stringRotation = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 2);
      balloonString.style.transform = `translateX(-50%) rotate(${stringRotation}deg)`;
      
      // 随机线长 (40px 到 55px之间)
      const stringLength = 40 + Math.random() * 15;
      balloonString.style.height = `${stringLength}px`;
      
      // 将线添加到气球下面
      balloon.appendChild(balloonString);
      
      // 随机旋转包装器
      const rotation = -10 + Math.random() * 20;
      wrapper.style.transform = `rotate(${rotation}deg)`;
      
      // 设置包装器动画 - 更快的上升速度和更多的快速气球
      const randomValue = Math.random();
      // 使用平方函数使分布偏向快速气球（5-12秒），减少慢速气球（15-20秒）
      const floatSpeed = 5 + (randomValue * randomValue) * 15;
      wrapper.style.animation = `
        float ${floatSpeed}s linear ${delay}s forwards,
        sway ${2 + Math.random() * 3}s ease-in-out ${delay}s infinite
      `;
      
      // 添加包装器到容器
      container.appendChild(wrapper);
    }
  }

  return null; // 此组件不渲染任何UI，只添加气球效果
} 