import { useRef } from 'react';

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  rotateAmplitude = 10,
  scaleOnHover = 1.04,
  overlayContent = null,
  displayOverlayContent = false,
  className = '',
}) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  const setTilt = (event) => {
    const root = ref.current;
    if (!root) return;
    root.classList.add('is-tilted');

    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      const rotateX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
      const rotateY = (offsetX / (rect.width / 2)) * rotateAmplitude;
      const pointerX = ((event.clientX - rect.left) / rect.width) * 100;
      const pointerY = ((event.clientY - rect.top) / rect.height) * 100;

      root.style.setProperty('--tilt-rx', `${rotateX}deg`);
      root.style.setProperty('--tilt-ry', `${rotateY}deg`);
      root.style.setProperty('--tilt-x', `${pointerX}%`);
      root.style.setProperty('--tilt-y', `${pointerY}%`);
      root.style.setProperty('--tilt-scale', scaleOnHover);
    });
  };

  const resetTilt = () => {
    const root = ref.current;
    if (!root) return;
    root.classList.remove('is-tilted');
    root.style.setProperty('--tilt-rx', '0deg');
    root.style.setProperty('--tilt-ry', '0deg');
    root.style.setProperty('--tilt-scale', 1);
  };

  const activateTilt = () => {
    ref.current?.classList.add('is-tilted');
  };

  return (
    <figure
      className={`tilted-card-figure ${className}`.trim()}
      onMouseEnter={activateTilt}
      onMouseLeave={resetTilt}
      onMouseMove={setTilt}
      ref={ref}
    >
      <div className="tilted-card-inner">
        <img className="tilted-card-img" src={imageSrc} alt={altText} loading="lazy" />
        {displayOverlayContent && overlayContent ? (
          <div className="tilted-card-overlay">{overlayContent}</div>
        ) : null}
      </div>
      {captionText ? <figcaption className="tilted-card-caption">{captionText}</figcaption> : null}
    </figure>
  );
}
