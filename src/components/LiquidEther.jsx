import { useEffect, useRef } from 'react';
import './LiquidEther.css';

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.split('').map((char) => char + char).join('') : value;
  const number = Number.parseInt(full, 16);

  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

export default function LiquidEther({
  colors = ['#d81622', '#7f0710', '#f4eee9'],
  mouseForce = 18,
  cursorSize = 140,
  resolution = 0.62,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const palette = colors.map(hexToRgb);
    const blobs = palette.map((color, index) => ({
      color,
      angle: index * 2.1,
      radius: 0.18 + index * 0.045,
      speed: (0.16 + index * 0.035) * autoSpeed,
      size: 0.34 - index * 0.035,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let lastX = window.innerWidth * 0.5;
    let lastY = window.innerHeight * 0.5;

    const resize = () => {
      const nextWidth = Math.max(1, Math.floor(window.innerWidth * resolution));
      const nextHeight = Math.max(1, Math.floor(window.innerHeight * resolution));
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const setPointer = (clientX, clientY) => {
      const pointer = pointerRef.current;
      const vx = clientX - lastX;
      const vy = clientY - lastY;
      lastX = clientX;
      lastY = clientY;
      pointer.tx = clientX / Math.max(1, window.innerWidth);
      pointer.ty = clientY / Math.max(1, window.innerHeight);
      pointer.speed = Math.min(1, Math.hypot(vx, vy) / Math.max(1, mouseForce));
    };

    const onPointerMove = (event) => setPointer(event.clientX, event.clientY);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resize);
    resize();

    const drawGlow = (x, y, radius, color, alpha) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
      gradient.addColorStop(0.38, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.36})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = (time = 0) => {
      resize();
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const pointer = pointerRef.current;
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      pointer.speed *= 0.92;

      blobs.forEach((blob, index) => {
        const orbit = time * 0.0001 * blob.speed + blob.angle;
        const drift = autoDemo ? autoIntensity : 1;
        const x = width * (0.5 + Math.cos(orbit * 1.7 + index) * blob.radius * drift);
        const y = height * (0.5 + Math.sin(orbit * 1.15 - index) * blob.radius * 0.72 * drift);
        const pulse = 0.75 + Math.sin(time * 0.0012 + index) * 0.22;
        drawGlow(x, y, Math.max(width, height) * blob.size * pulse, blob.color, 0.06);
      });

      const cursorColor = palette[0] || { r: 216, g: 22, b: 34 };
      drawGlow(
        pointer.x * width,
        pointer.y * height,
        cursorSize * resolution * (1 + pointer.speed * 1.8),
        cursorColor,
        0.08 + pointer.speed * 0.12,
      );

      ctx.globalCompositeOperation = 'source-over';

      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, [autoDemo, autoIntensity, autoSpeed, colors, cursorSize, mouseForce, resolution]);

  return (
    <canvas
      aria-hidden="true"
      className={`liquid-ether-container ${className}`}
      ref={canvasRef}
      style={style}
    />
  );
}
