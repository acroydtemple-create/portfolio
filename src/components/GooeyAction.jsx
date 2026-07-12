import { useCallback, useRef } from 'react';

export default function GooeyAction({
  as,
  children,
  className = '',
  particleCount = 10,
  onClick,
  onPointerEnter,
  ...props
}) {
  const ref = useRef(null);
  const Component = as || (props.href ? 'a' : 'button');

  const spawnParticles = useCallback(
    (event) => {
      const root = ref.current;
      const burst = root?.querySelector('.gooey-action-burst');
      if (!root || !burst) return;

      const rect = root.getBoundingClientRect();
      const originX = event?.clientX ? event.clientX - rect.left : rect.width / 2;
      const originY = event?.clientY ? event.clientY - rect.top : rect.height / 2;

      for (let index = 0; index < particleCount; index += 1) {
        const angle = (Math.PI * 2 * index) / particleCount + (Math.random() - 0.5) * 0.75;
        const distance = 18 + Math.random() * 36;
        const particle = document.createElement('span');
        particle.className = 'gooey-action-particle';
        particle.style.setProperty('--origin-x', `${originX}px`);
        particle.style.setProperty('--origin-y', `${originY}px`);
        particle.style.setProperty('--move-x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--move-y', `${Math.sin(angle) * distance}px`);
        particle.style.setProperty('--scale', `${0.7 + Math.random() * 0.55}`);
        particle.style.setProperty('--delay', `${Math.random() * 80}ms`);
        burst.appendChild(particle);
        window.setTimeout(() => particle.remove(), 760);
      }
    },
    [particleCount],
  );

  const handlePointerEnter = (event) => {
    spawnParticles(event);
    onPointerEnter?.(event);
  };

  const handleClick = (event) => {
    spawnParticles(event);
    onClick?.(event);
  };

  return (
    <Component
      {...props}
      className={`gooey-action ${className}`.trim()}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      ref={ref}
    >
      <span className="gooey-action-burst" aria-hidden="true" />
      {children}
    </Component>
  );
}
