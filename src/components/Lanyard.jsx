import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Lanyard.css';

const portraitSrc = '/assets/work/hugo-profile-photo-20260707.jpg?v=2';

export default function Lanyard({ open, onClose }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--badge-rx', `${y * -9}deg`);
    card.style.setProperty('--badge-ry', `${x * 11}deg`);
    card.style.setProperty('--badge-glow-x', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--badge-glow-y', `${(y + 0.5) * 100}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--badge-rx', '0deg');
    card.style.setProperty('--badge-ry', '0deg');
  };

  return (
    <div className="lanyard-popover" aria-label="我的工牌" role="region">
      <div className="lanyard-scene">
        <div className="lanyard-cords" aria-hidden="true">
          <span />
          <span />
        </div>
        <article
          className="lanyard-card"
          onPointerLeave={resetTilt}
          onPointerMove={handlePointerMove}
          ref={cardRef}
        >
          <div className="lanyard-card-hole" aria-hidden="true" />
          <header className="lanyard-card-top">
            <span>VISUAL ID</span>
            <strong>HUGO WU</strong>
          </header>

          <section className="lanyard-identity">
            <div className="lanyard-title-block">
              <span className="lanyard-unit">AIGC CREATOR / PHOTOGRAPHER</span>
              <h2>WU-24</h2>
              <p>Photo x AI x Cinema</p>
            </div>
            <figure className="lanyard-photo">
              <img src={portraitSrc} alt="吴鸿坤" />
              <figcaption>吴鸿坤</figcaption>
            </figure>
          </section>

          <div className="lanyard-data-strip" aria-hidden="true">
            <span>AI IMAGE</span>
            <span>BAR MEMORY</span>
            <span>LIVE FRAME</span>
          </div>

          <section className="lanyard-modules" aria-label="creator identity">
            <div className="lanyard-module is-wide">
              <span>ROLE</span>
              <strong>AIGC Creator & AI Builder</strong>
            </div>
            <div className="lanyard-module">
              <span>FIELD</span>
              <strong>Photo / Fashion / Film</strong>
            </div>
            <div className="lanyard-module">
              <span>SOCIAL</span>
              <strong>小吴2.0</strong>
            </div>
          </section>

          <dl className="lanyard-card-info">
            <div>
              <dt>Email</dt>
              <dd>344497524@qq.com</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Available Worldwide</dd>
            </div>
          </dl>

          <div className="lanyard-footer">
            <div className="lanyard-barcode" aria-hidden="true" />
            <a className="lanyard-mail" href="mailto:344497524@qq.com">
              联系我
              <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
