import { useEffect, useRef, useState } from 'react';

export default function GooeyNav({
  items,
  animationTime = 620,
  particleCount = 12,
  particleDistances = [44, 8],
  particleR = 72,
  timeVariance = 220,
  colors = [1, 2, 1, 3, 1, 4],
  initialActiveIndex = 0,
  className = '',
}) {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const particleIdRef = useRef(0);
  const particleRunRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [particles, setParticles] = useState([]);

  const noise = (value = 1) => value / 2 - Math.random() * value;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (index, time, distances, radius) => {
    const rotate = noise(radius / 10);
    return {
      start: getXY(distances[0], particleCount - index, particleCount),
      end: getXY(distances[1] + noise(7), particleCount - index, particleCount),
      time,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + radius / 20) * 10 : (rotate - radius / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    element.classList.remove('is-active');
    particleRunRef.current += 1;
    const runId = particleRunRef.current;

    const nextParticles = Array.from({ length: particleCount }, (_, index) => {
      const time = animationTime * 2 + noise(timeVariance * 2);
      const particle = createParticle(index, time, particleDistances, particleR);
      return {
        id: particleIdRef.current++,
        startX: `${particle.start[0]}px`,
        startY: `${particle.start[1]}px`,
        endX: `${particle.end[0]}px`,
        endY: `${particle.end[1]}px`,
        time: `${particle.time}ms`,
        scale: particle.scale,
        color: `var(--gooey-color-${particle.color})`,
        rotate: `${particle.rotate}deg`,
      };
    });

    setParticles(nextParticles);
    window.requestAnimationFrame(() => element.classList.add('is-active'));
    window.setTimeout(() => {
      if (particleRunRef.current === runId) setParticles([]);
    }, bubbleTime);
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();
    const styles = {
      left: `${itemRect.x - containerRect.x}px`,
      top: `${itemRect.y - containerRect.y}px`,
      width: `${itemRect.width}px`,
      height: `${itemRect.height}px`,
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.textContent = element.textContent;
  };

  const activateItem = (element, index) => {
    setActiveIndex(index);
    updateEffectPosition(element);

    setParticles([]);

    if (textRef.current) {
      textRef.current.classList.remove('is-active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('is-active');
    }
  };

  const handleClick = (event, index) => {
    activateItem(event.currentTarget, index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    activateItem(event.currentTarget, index);
    if (event.currentTarget.href) window.location.href = event.currentTarget.href;
  };

  useEffect(() => {
    let frameId = 0;

    const getScrollActiveIndex = () => {
      const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;

      if (pageBottom) return items.length - 1;

      const navBottom = containerRef.current?.getBoundingClientRect().bottom ?? 0;
      const viewportTop = Math.max(0, navBottom + 12);
      const viewportBottom = window.innerHeight;
      let currentIndex = 0;
      let maxVisibleArea = 0;

      items.forEach((item, index) => {
        const section = document.querySelector(item.href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, viewportTop);
        const visibleBottom = Math.min(rect.bottom, viewportBottom);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);

        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          currentIndex = index;
        }
      });

      return currentIndex;
    };

    const syncFromScroll = () => {
      frameId = 0;
      const nextIndex = getScrollActiveIndex();
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestSyncFromScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(syncFromScroll);
    };

    const syncHash = () => {
      requestSyncFromScroll();
      window.setTimeout(requestSyncFromScroll, 160);
      window.setTimeout(requestSyncFromScroll, 560);
    };

    syncHash();
    requestSyncFromScroll();
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('scroll', requestSyncFromScroll, { passive: true });
    window.addEventListener('resize', requestSyncFromScroll);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('scroll', requestSyncFromScroll);
      window.removeEventListener('resize', requestSyncFromScroll);
    };
  }, [items]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return undefined;

    const activeElement = navRef.current.querySelectorAll('a')[activeIndex];
    if (activeElement) {
      updateEffectPosition(activeElement);
      textRef.current?.classList.add('is-active');
    }

    if (filterRef.current && activeElement) {
      if (hasInitializedRef.current) {
        textRef.current?.classList.remove('is-active');
        void textRef.current?.offsetWidth;
        textRef.current?.classList.add('is-active');
        makeParticles(filterRef.current);
      } else {
        hasInitializedRef.current = true;
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveElement = navRef.current?.querySelectorAll('a')[activeIndex];
      if (currentActiveElement) updateEffectPosition(currentActiveElement);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className={`gooey-nav ${className}`} ref={containerRef}>
      <nav aria-label="页面导航">
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              className={activeIndex === index ? 'is-active' : ''}
              key={item.href}
            >
              <a
                aria-current={activeIndex === index ? 'page' : undefined}
                href={item.href}
                onClick={(event) => handleClick(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="gooey-effect gooey-filter" ref={filterRef} aria-hidden="true">
        {particles.map((particle) => (
          <span
            className="gooey-particle"
            key={particle.id}
            style={{
              '--start-x': particle.startX,
              '--start-y': particle.startY,
              '--end-x': particle.endX,
              '--end-y': particle.endY,
              '--time': particle.time,
              '--scale': particle.scale,
              '--color': particle.color,
              '--rotate': particle.rotate,
            }}
          >
            <span className="gooey-point" />
          </span>
        ))}
      </span>
      <span className="gooey-effect gooey-text" ref={textRef} aria-hidden="true" />
    </div>
  );
}
