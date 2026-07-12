import { useCallback, useEffect, useRef } from 'react';
import './BorderGlow.css';

function parseHsl(hsl) {
  const match = hsl.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 356, s: 86, l: 58 };
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

function glowVars(glowColor, intensity) {
  const { h, s, l } = parseHsl(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  return {
    '--glow-color': `hsl(${base} / ${Math.min(100 * intensity, 100)}%)`,
    '--glow-color-60': `hsl(${base} / ${Math.min(60 * intensity, 100)}%)`,
    '--glow-color-40': `hsl(${base} / ${Math.min(40 * intensity, 100)}%)`,
    '--glow-color-20': `hsl(${base} / ${Math.min(20 * intensity, 100)}%)`,
  };
}

function gradientVars(colors) {
  const [one, two = one, three = two] = colors;
  return {
    '--gradient-one': `radial-gradient(at 80% 55%, ${one} 0px, transparent 54%)`,
    '--gradient-two': `radial-gradient(at 18% 18%, ${two} 0px, transparent 52%)`,
    '--gradient-three': `radial-gradient(at 48% 82%, ${three} 0px, transparent 58%)`,
    '--gradient-base': `linear-gradient(135deg, ${one}, ${two}, ${three})`,
  };
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, onUpdate, onEnd }) {
  const run = () => {
    const started = performance.now();
    const tick = () => {
      const raw = Math.min((performance.now() - started) / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      onUpdate(start + (end - start) * eased);
      if (raw < 1) requestAnimationFrame(tick);
      else onEnd?.();
    };
    requestAnimationFrame(tick);
  };
  window.setTimeout(run, delay);
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 24,
  glowColor = '356 86 58',
  backgroundColor = '#070707',
  borderRadius = 8,
  glowRadius = 34,
  glowIntensity = 1,
  coneSpread = 28,
  animated = false,
  colors = ['#d81622', '#f4eee9', '#7f0710'],
  fillOpacity = 0.28,
}) {
  const cardRef = useRef(null);

  const getCenter = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const [cx, cy] = getCenter(card);
      const dx = x - cx;
      const dy = y - cy;
      const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
      const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
      const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
      card.style.setProperty('--cursor-angle', `${angle < 0 ? angle + 360 : angle}deg`);
    },
    [getCenter],
  );

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined;
    const card = cardRef.current;
    card.classList.add('sweep-active');
    card.style.setProperty('--cursor-angle', '120deg');
    animateValue({
      duration: 900,
      onUpdate: (value) => card.style.setProperty('--edge-proximity', value),
    });
    animateValue({
      delay: 900,
      duration: 1000,
      start: 100,
      end: 0,
      onUpdate: (value) => card.style.setProperty('--edge-proximity', value),
      onEnd: () => card.classList.remove('sweep-active'),
    });
    return undefined;
  }, [animated]);

  return (
    <div
      className={`border-glow-card ${className}`}
      onPointerMove={handlePointerMove}
      ref={cardRef}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVars(glowColor, glowIntensity),
        ...gradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
