import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [fillWidth, setFillWidth] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    const fillTimer = setTimeout(() => {
      setFillWidth(215);
      const fadeTimer = setTimeout(() => {
        setLogoOpacity(0);
        if (onComplete) setTimeout(onComplete, 300);
      }, 1200);
      return () => clearTimeout(fadeTimer);
    }, 100);
    return () => clearTimeout(fillTimer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#3C388D] flex items-center justify-center z-[100]">
      <svg
        width="430"
        height="92"
        viewBox="0 0 215 46"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        style={{
          opacity: logoOpacity,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <clipPath id="tusur-logo-clip">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.0747 41L23.1281 12.5817H37.3361V5H0V12.5817H14.208V41H23.0747Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M204.733 5H177.546L177.492 40.947H186.412V32.1457H204.68C210.502 32.1457 215.202 27.4798 215.202 21.7009V15.4446C215.255 9.66545 210.555 5 204.733 5V5ZM206.549 24.7232H186.412V12.5819H206.549V24.7232Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M100.257 41H123.385V33.4183H98.6542V12.5817H123.385V5H100.257C94.4345 5 89.7341 9.66568 89.7341 15.4446V30.5552C89.7341 36.3345 94.4347 41 100.257 41Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M66.9981 40.947L86.2034 5H77.0553L65.3472 26.9139L52.3564 5H43.2081L57.1986 28.9979C58.3192 30.9201 60.343 32.0994 62.5297 32.1048L62.5741 32.105L57.8501 40.9472H66.9981V40.947Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M148.411 32.105L148.456 32.1053L143.732 40.9475H152.88L172.085 5.00049H162.937L151.229 26.9144L138.238 5.00049H129.09L143.08 28.9984C144.201 30.9206 146.224 32.0999 148.411 32.105V32.105Z" />
          </clipPath>
        </defs>
        <rect
          x="0"
          y="0"
          width={fillWidth}
          height="46"
          fill="white"
          clipPath="url(#tusur-logo-clip)"
          style={{ transition: 'width 1.2s ease-out' }}
        />
      </svg>
    </div>
  );
}