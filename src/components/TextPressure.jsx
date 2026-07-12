import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const distanceBetween = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const mapDistanceToAxis = (distance, maxDistance, minValue, maxValue) => {
  if (!maxDistance) return minValue;
  const value = maxValue - Math.abs((maxValue * distance) / maxDistance);
  return Math.max(minValue, value + minValue);
};

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
};

export default function TextPressure({
  text = 'Compressa',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#ffffff',
  strokeColor = '#ffffff',
  className = '',
  minFontSize = 24,
  maxFontSize = Infinity,
}) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    const setInitialCursor = () => {
      if (!containerRef.current) return;
      const { left, top, width: rectWidth, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + rectWidth / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    };

    const handleMouseMove = (event) => {
      cursorRef.current.x = event.clientX;
      cursorRef.current.y = event.clientY;
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      cursorRef.current.x = touch.clientX;
      cursorRef.current.y = touch.clientY;
    };

    setInitialCursor();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', setInitialCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', setInitialCursor);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerWidth, height: containerHeight } =
      containerRef.current.getBoundingClientRect();
    const widthBasedFontSize = containerWidth / Math.max(chars.length / 2, 1);
    const heightBasedFontSize = containerHeight ? containerHeight * 1.24 : widthBasedFontSize;
    const nextFontSize = Math.min(
      Math.max(Math.min(widthBasedFontSize, heightBasedFontSize), minFontSize),
      maxFontSize,
    );

    setFontSize(nextFontSize);
    setScaleY(1);
    setLineHeight(1);

    window.requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (!scale || !textRect.height) return;

      const nextScaleY = containerHeight / textRect.height;
      setScaleY(nextScaleY);
      setLineHeight(nextScaleY);
    });
  }, [chars.length, maxFontSize, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDistance = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };
          const cursorDistance = distanceBetween(mouseRef.current, charCenter);
          const wdth = width ? Math.floor(mapDistanceToAxis(cursorDistance, maxDistance, 5, 200)) : 100;
          const wght = weight
            ? Math.floor(mapDistanceToAxis(cursorDistance, maxDistance, 100, 900))
            : 400;
          const ital = italic
            ? mapDistanceToAxis(cursorDistance, maxDistance, 0, 1).toFixed(2)
            : 0;
          const opacity = alpha
            ? mapDistanceToAxis(cursorDistance, maxDistance, 0, 1).toFixed(2)
            : 1;
          const variation = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;

          if (span.style.fontVariationSettings !== variation) {
            span.style.fontVariationSettings = variation;
          }
          if (alpha && span.style.opacity !== opacity) {
            span.style.opacity = opacity;
          }
        });
      }

      rafId = window.requestAnimationFrame(animate);
    };

    animate();
    return () => window.cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleElement = useMemo(
    () => (
      <style>{`
        @import url('${fontUrl}');

        .text-pressure-flex {
          display: flex;
          justify-content: space-between;
        }

        .text-pressure-stroke span {
          position: relative;
          color: ${textColor};
        }

        .text-pressure-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: transparent;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
    ),
    [fontUrl, strokeColor, textColor],
  );

  const dynamicClassName = [
    'text-pressure-title',
    className,
    flex ? 'text-pressure-flex' : '',
    stroke ? 'text-pressure-stroke' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={containerRef} className="text-pressure-shell" aria-hidden="true">
      {styleElement}
      <span
        ref={titleRef}
        className={dynamicClassName}
        style={{
          color: textColor,
          fontFamily,
          fontSize,
          fontWeight: 100,
          lineHeight,
          margin: 0,
          textAlign: 'left',
          textTransform: 'uppercase',
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {chars.map((char, index) => (
          <span
            data-char={char}
            key={`${char}-${index}`}
            ref={(element) => {
              spansRef.current[index] = element;
            }}
            style={{
              color: stroke ? undefined : textColor,
              display: 'inline-block',
            }}
          >
            {char === ' ' ? '\u00a0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}
