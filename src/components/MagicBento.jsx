import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

function createParticle(color) {
  const particle = document.createElement('span');
  particle.className = 'magic-bento-particle';
  particle.style.setProperty('--particle-color', `rgb(${color})`);
  return particle;
}

export function MagicBentoGrid({ children, className = '' }) {
  return <div className={`magic-bento-grid ${className}`}>{children}</div>;
}

export function MagicBentoCard({
  as: Component = 'div',
  children,
  className = '',
  glowColor = '216, 22, 34',
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  particleCount = 8,
  ...props
}) {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clearParticles = () => {
      particlesRef.current.forEach((particle) => {
        gsap.to(particle, {
          opacity: 0,
          scale: 0,
          duration: 0.24,
          ease: 'power2.out',
          onComplete: () => particle.remove(),
        });
      });
      particlesRef.current = [];
    };

    const handleEnter = () => {
      if (prefersReduced) return;
      clearParticles();
      const rect = card.getBoundingClientRect();
      particlesRef.current = Array.from({ length: particleCount }, () => {
        const particle = createParticle(glowColor);
        particle.style.left = `${Math.random() * rect.width}px`;
        particle.style.top = `${Math.random() * rect.height}px`;
        card.appendChild(particle);
        gsap.fromTo(
          particle,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.28, ease: 'back.out(1.7)' },
        );
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 90,
          y: (Math.random() - 0.5) * 90,
          opacity: 0.24,
          duration: 1.8 + Math.random() * 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        return particle;
      });
    };

    const handleLeave = () => {
      card.style.setProperty('--glow-intensity', '0');
      clearParticles();
      if (prefersReduced) return;
      gsap.to(card, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.42,
        ease: 'power3.out',
      });
    };

    const handleMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const edge = Math.max(Math.abs(x - centerX) / centerX, Math.abs(y - centerY) / centerY);

      card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      card.style.setProperty('--glow-intensity', `${Math.max(0.26, edge)}`);

      if (prefersReduced) return;

      gsap.to(card, {
        x: enableMagnetism ? (x - centerX) * 0.035 : 0,
        y: enableMagnetism ? (y - centerY) * 0.035 : 0,
        rotateX: enableTilt ? ((y - centerY) / centerY) * -6 : 0,
        rotateY: enableTilt ? ((x - centerX) / centerX) * 6 : 0,
        transformPerspective: 900,
        duration: 0.18,
        ease: 'power2.out',
      });
    };

    const handleClick = (event) => {
      if (!clickEffect || prefersReduced) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 1.35;
      const ripple = document.createElement('span');
      ripple.className = 'magic-bento-ripple';
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.setProperty('--particle-color', `rgb(${glowColor})`);
      card.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { opacity: 0.44, scale: 0 },
        {
          opacity: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        },
      );
    };

    card.addEventListener('pointerenter', handleEnter);
    card.addEventListener('pointerleave', handleLeave);
    card.addEventListener('pointermove', handleMove);
    card.addEventListener('click', handleClick);

    return () => {
      card.removeEventListener('pointerenter', handleEnter);
      card.removeEventListener('pointerleave', handleLeave);
      card.removeEventListener('pointermove', handleMove);
      card.removeEventListener('click', handleClick);
      clearParticles();
    };
  }, [clickEffect, enableMagnetism, enableTilt, glowColor, particleCount]);

  return (
    <Component
      className={`magic-bento-card ${className}`}
      ref={cardRef}
      style={{ '--magic-glow-color': glowColor }}
      {...props}
    >
      <span className="magic-bento-shine" aria-hidden="true" />
      {children}
    </Component>
  );
}
