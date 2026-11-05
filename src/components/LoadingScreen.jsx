import React, { useEffect, useState, useRef } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Проверяем, что страница уже загружена
    if (document.readyState === 'complete') {
      handleLoadComplete();
      return;
    }

    // Имитация прогресса до 90% (пока ресурсы грузятся)
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 8 + 2; // случайный прирост 2-10%
      if (current > 90) current = 90; // останавливаемся на 90% до реальной загрузки
      setProgress(Math.floor(current));
    }, 150);

    // Реальное событие полной загрузки страницы
    const handleLoad = () => {
      clearInterval(intervalRef.current);
      handleLoadComplete();
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleLoadComplete = () => {
    // Доводим прогресс до 100%
    setProgress(100);

    // Даём пользователю увидеть "100%" и плавно скрываем
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 600); // время CSS transition
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-600 ease-in-out"
      style={{
        backgroundColor: '#3C388D',
        opacity: opacity,
        pointerEvents: opacity === 0 ? 'none' : 'auto',
      }}
    >
      {/* Логотип с эффектом заполнения */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        {/* Фоновый слой — контур логотипа (полупрозрачный) */}
        <img
          src="/logo.svg"
          alt="ТУСУР"
          className="absolute inset-0 w-full h-full opacity-20"
          style={{ filter: 'brightness(0) invert(1)' }}
        />

        {/* Заполняющий слой — белый логотип, обрезается clip-path */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(${100 - progress}% 0 0 0)`,
            transition: 'clip-path 0.2s ease-out',
          }}
        >
          <img
            src="/logo.svg"
            alt="ТУСУР"
            className="w-full h-full"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Декоративная линия прогресса под логотипом */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Проценты */}
      <div className="mt-16 text-white font-bold text-3xl md:text-4xl tracking-wider">
        {progress}%
      </div>
    </div>
  );
}