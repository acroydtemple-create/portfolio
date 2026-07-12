import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  cinematicStills,
  contactLinks,
  navItems,
  profile,
  profileStats,
  projects,
  services,
  strengths,
  videos,
} from './data/portfolio.js';
import GooeyAction from './components/GooeyAction.jsx';
import GooeyNav from './components/GooeyNav.jsx';
import TextPressure from './components/TextPressure.jsx';
import TiltedCard from './components/TiltedCard.jsx';
import LiquidEther from './components/LiquidEther.jsx';
import EvilEye from './components/EvilEye.jsx';
import Lanyard from './components/Lanyard.jsx';
import BorderGlow from './components/BorderGlow.jsx';
import { MagicBentoCard, MagicBentoGrid } from './components/MagicBento.jsx';
import Lightning from './components/Lightning.jsx';

gsap.registerPlugin(ScrollTrigger);

function Header({ isBadgeOpen, onBadgeToggle }) {
  return (
    <header className="nav-shell" aria-label="Primary navigation">
      <div className="nav-identity">
        <a className="brand-mark" href="#portfolio" aria-label="Back to portfolio top">
          <span>H</span>
          <span>W</span>
        </a>
        <button
          aria-pressed={isBadgeOpen}
          className={`badge-button ${isBadgeOpen ? 'is-active' : ''}`}
          onClick={onBadgeToggle}
          type="button"
        >
          我的工牌
        </button>
      </div>
      <GooeyNav className="nav-links" items={navItems} />
      <GooeyAction className="contact-button" href="#contact">
        <span>联系</span>
        <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
      </GooeyAction>
    </header>
  );
}

function ThunderLanding({ isLeaving, onStart }) {
  return (
    <section
      className={`thunder-landing ${isLeaving ? 'is-leaving' : ''}`}
      id="top"
      aria-label="Thunder resume entry"
    >
      <div className="thunder-lightning" aria-hidden="true">
        <Lightning hue={224} intensity={1.32} size={1.08} speed={0.82} xOffset={0} />
      </div>
      <div className="thunder-shell">
        <div className="thunder-kicker">
          <span>NEW</span>
          <strong>小吴视觉身份 2.0</strong>
        </div>
        <h1 className="thunder-title">
          <span className="title-mask">
            <span className="title-line">欢迎查看</span>
          </span>
          <span className="title-mask">
            <span className="title-line">小吴的雷霆简历</span>
          </span>
        </h1>
        <p className="thunder-copy">
          摄影师、调酒师、AI 创作者。这里不是传统模板简历，而是一份可以被观看的视觉履历。
        </p>
        <div className="thunder-actions">
          <GooeyAction className="thunder-start" onClick={onStart} type="button">
            开始查看简历
          </GooeyAction>
          <GooeyAction className="thunder-hire" type="button">
            直接录取
          </GooeyAction>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="hero" id="portfolio" aria-label="Portfolio hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/work/hero-hugo-poster.jpg"
      >
        <source src="/assets/work/hero-main-background.mp4" type="video/mp4" />
      </video>
      <div className="hero-scrim" />
      <div className="signal-layer" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-kicker">
          <span>{profile.chineseName}</span>
          <span>Photographer 3+ Years</span>
          <span>AI Image Creator</span>
        </div>
        <h1 className="hero-title" aria-label="吴鸿坤 Hugo Wu Visuals">
          <span className="title-mask title-mask-name">
            <span className="title-line title-line-cn" data-text={profile.chineseName}>
              {profile.chineseName}
            </span>
          </span>
          <span className="title-mask title-mask-pressure">
            <span className="title-line title-line-pressure">
              <TextPressure
                text="HUGO WU"
                alpha={false}
                flex={false}
                italic
                scale={false}
                textColor="#f4eee9"
                weight
                width={false}
                className="hero-pressure hero-pressure-name"
                maxFontSize={184}
                minFontSize={76}
              />
            </span>
          </span>
          <span className="title-mask title-mask-pressure title-mask-red">
            <span className="title-line title-line-pressure">
              <TextPressure
                text="VISUALS"
                alpha={false}
                flex={false}
                italic
                scale={false}
                textColor="#d81622"
                weight
                width={false}
                className="hero-pressure hero-pressure-red"
                maxFontSize={184}
                minFontSize={76}
              />
            </span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-subcopy">
            我是吴鸿坤，也可以叫 Hugo Wu。三年多摄影经验覆盖产品摄影、模特拍摄和旅行跟拍，
            同时长期探索 AI 影像，把真实拍摄的判断力和生成式画面的想象力放在同一个作品系统里。
          </p>
          <div className="hero-actions">
            <GooeyAction className="primary-link" href="#projects">
              <span>View Works</span>
              <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </GooeyAction>
            <GooeyAction className="secondary-link" href="#experience">
              Profile
            </GooeyAction>
          </div>
          <div className="hero-meta" aria-label="Portfolio metadata">
            <span>{profile.location}</span>
            <span>Portfolio 2026</span>
            <span>Photo x AI x Cinema</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, lead }) {
  if (title === 'AI IMAGE ARCHIVE') {
    return (
      <div className="section-intro projects-intro">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
        <div className="projects-intro-panel">
          <span className="projects-intro-kicker">Portfolio 2026 / Scroll Catalog</span>
          <p>
            这里先把你提供的 AI 时尚图和电影感图作为主作品集素材。后续可以继续补真实摄影项目，让摄影和 AI 两条线更清晰地并置。
          </p>
          <div className="projects-intro-stats" aria-label="works index">
            <span>
              <strong>{projects.length.toString().padStart(2, '0')}</strong>
              <em>Live Studies</em>
            </span>
            <span>
              <strong>04</strong>
              <em>Visual Directions</em>
            </span>
          </div>
          <div className="projects-intro-tags">
            <span>AI Fashion</span>
            <span>Cinematic Frame</span>
            <span>Photography Logic</span>
            <span>Click to Open</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}

function Experience() {
  return (
    <section className="motion-section experience-section" id="experience">
      <div className="container">
        <SectionIntro
          eyebrow="01 / Profile"
          title="HUGO WU"
          lead="摄影负责把真实世界拍得可信，AI 负责把脑海里的画面提前变成可观看的视觉样片。我的方向是把两者合成一套更完整的创作方式。"
        />
        <div className="experience-grid">
          <div className="portrait-stack reveal-media" data-speed="slow">
            <img
              src="/assets/work/hugo-profile-photo-20260707.jpg?v=2"
              alt="吴鸿坤 portrait"
              loading="lazy"
            />
            <div className="portrait-caption">
              <span>Hugo Wu / {profile.chineseName}</span>
              <strong>Photography / AI Fashion / Cinematic Frames</strong>
            </div>
          </div>
          <div className="profile-copy" data-stagger>
            <p>
              我从事摄影行业三年多，做过产品摄影、模特拍摄和旅行跟拍。拍摄经验让我更在意光线、
              材质、人物状态和画面真实感，而 AI 让我可以把电影感、时尚感和想象场景快速推演出来。
            </p>
            <p>
              调酒师经历也影响了我的审美：暗光、玻璃、液体、吧台氛围和夜间情绪，都会进入我的视觉判断。
              现在我希望把摄影和 AI 创作合成一个更鲜明的个人作品集。
            </p>
            <MagicBentoGrid className="contact-list">
              {contactLinks.map((item) => (
                <MagicBentoCard as="a" className="contact-bento-card" key={item.label} href={item.href}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </MagicBentoCard>
              ))}
            </MagicBentoGrid>
          </div>
          <MagicBentoGrid className="stats-grid">
            {profileStats.map((stat) => (
              <MagicBentoCard className="stat-card" data-stagger key={stat.label}>
                <span>{stat.value}</span>
                <p>{stat.label}</p>
              </MagicBentoCard>
            ))}
          </MagicBentoGrid>
        </div>
      </div>
    </section>
  );
}

function ExperienceDossier() {
  const careerTimeline = [
    {
      period: '2021 - 2023',
      title: '摄影学习 / 影像基础',
      text: '从摄影与摄像基础开始，建立光线、构图、镜头语言和画面秩序的判断。',
    },
    {
      period: '2023',
      title: '摄影助理 / 产品拍摄',
      text: '进入商业拍摄现场，参与产品图、详情图和拍摄流程，理解交付效率与画面标准。',
    },
    {
      period: '2023 - 2024',
      title: '平铺摄影师 / 商品视觉',
      text: '负责平台商品静物拍摄，长期处理布光、构图、质感呈现和日常拍摄节奏。',
    },
    {
      period: 'After Hours',
      title: '调酒师 / 酒馆经营',
      text: '接触吧台、液体、玻璃、暗光和夜间情绪，这段经历进入了我的视觉审美。',
    },
    {
      period: 'Now',
      title: 'AI 创作者 / AIGC 老师',
      text: '把真实摄影经验、电影观看经验和 AI 生成流程结合，做可展示、可教学的视觉系统。',
    },
  ];

  const dossierTags = [
    '产品摄影',
    '模特拍摄',
    '旅行跟拍',
    'AI 时尚图',
    '电影感画面',
    'AIGC 教学',
    '暗光审美',
    '视觉提案',
  ];

  return (
    <section className="motion-section experience-section experience-dossier-section" id="experience">
      <div className="container">
        <SectionIntro
          eyebrow="01 / Profile"
          title="PHOTO / AI / BAR MEMORY"
          lead="这不是一份传统模板简历，而是一张创作者档案：摄影负责真实，AI 负责想象，调酒经历负责暗光、液体和夜间情绪。"
        />
        <div className="experience-dossier">
          <aside className="dossier-id" data-stagger>
            <figure className="portrait-stack reveal-media" data-speed="slow">
              <img className="dossier-photo" src="/assets/work/hugo-profile-photo-20260707.jpg?v=2" alt="吴鸿坤 portrait" loading="lazy" />
            </figure>
            <div className="portrait-caption dossier-caption">
              <span>Hugo Wu / {profile.chineseName}</span>
              <strong>Photo x AI x Cinema</strong>
              <em>Photographer / AI Creator / AIGC Teacher</em>
            </div>
          </aside>

          <article className="dossier-main" data-stagger>
            <div className="profile-copy">
              <span className="dossier-label">Creator File</span>
              <p>
                我从学习摄影开始进入影像行业，做过产品摄影、模特拍摄和旅行跟拍。
                真实拍摄训练了我对光线、材质、人物状态和画面可信度的判断。
              </p>
              <p>
                后来我做过调酒师，也经营过酒馆。暗光、玻璃、液体、吧台氛围和夜间情绪，
                都变成了我看画面的方式。现在我把摄影经验和 AI 生成结合，同时在培训机构做 AIGC 教学。
              </p>
            </div>

            <div className="career-track" aria-label="Career timeline">
              {careerTimeline.map((item) => (
                <div className="career-item" key={item.period}>
                  <span>{item.period}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="dossier-side">
            <MagicBentoGrid className="stats-grid">
              {profileStats.map((stat) => (
                <MagicBentoCard className="stat-card" data-stagger key={stat.label} glowColor="128, 8, 16">
                  <span>{stat.value}</span>
                  <p>{stat.label}</p>
                </MagicBentoCard>
              ))}
            </MagicBentoGrid>
            <div className="dossier-tags" aria-label="Creator skills">
              {dossierTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <MagicBentoGrid className="contact-list">
              {contactLinks.map((item) => (
                <MagicBentoCard
                  as="a"
                  className="contact-bento-card"
                  key={item.label}
                  href={item.href}
                  glowColor="128, 8, 16"
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </MagicBentoCard>
              ))}
            </MagicBentoGrid>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const railRef = useRef(null);
  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];

  useEffect(() => {
    if (activeProjectIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveProjectIndex(null);
      if (event.key === 'ArrowRight') {
        setActiveProjectIndex((current) => (current === null ? 0 : (current + 1) % projects.length));
      }
      if (event.key === 'ArrowLeft') {
        setActiveProjectIndex((current) =>
          current === null ? 0 : (current - 1 + projects.length) % projects.length,
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProjectIndex]);

  const handleProjectWheel = (event) => {
    if (!railRef.current) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    railRef.current.scrollLeft += event.deltaY;
  };

  return (
    <section className="motion-section projects-section" id="projects">
      <div className="container">
        <SectionIntro
          eyebrow="02 / Selected Works"
          title="AI IMAGE ARCHIVE"
          lead="这里先把你提供的 AI 时尚图和电影感图作为主作品集素材。后续可以继续补真实摄影项目，让摄影和 AI 两条线更清晰地并置。"
        />
        <div className="project-channel-shell" data-stagger>
          <div className="project-channel-meta">
            <span>CHANNEL: SELECTED</span>
            <span>{projects.length.toString().padStart(2, '0')} LIVE STUDIES</span>
            <span>SCROLL / CLICK TO OPEN</span>
          </div>
          <div
            aria-label="Horizontal project browser"
            className="project-channel"
            onWheel={handleProjectWheel}
            ref={railRef}
            tabIndex={0}
          >
            {projects.map((project, index) => (
              <BorderGlow
                animated={index === 0}
                backgroundColor="#070707"
                borderRadius={0}
                className={`project-slice-frame ${project.orientation === 'portrait' ? 'is-portrait' : ''}`}
                colors={['rgba(244, 238, 233, 0.78)', '#3b0509', '#080607']}
                edgeSensitivity={20}
                fillOpacity={0.1}
                glowColor="358 56 27"
                glowIntensity={0.9}
                glowRadius={22}
                key={project.index}
              >
                <button
                  aria-label={`Open ${project.title}`}
                  className={`project-slice ${project.orientation === 'portrait' ? 'is-portrait' : ''}`}
                  onClick={() => setActiveProjectIndex(index)}
                  type="button"
                >
                  <span className="project-slice-media reveal-media">
                    <img className="project-slice-img" src={project.image} alt={project.title} loading="lazy" />
                  </span>
                  <span className="project-slice-index">{project.index}</span>
                  <span className="project-slice-label">{project.category}</span>
                  <span className="project-slice-copy">
                    <strong>Visual Study</strong>
                    <b>{project.index}</b>
                    <em>{project.title}</em>
                  </span>
                </button>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
      {activeProject ? (
        <div
          className="project-lightbox"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProjectIndex(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} preview`}
        >
          <div
            className={`project-lightbox-panel ${
              activeProject.orientation === 'portrait' ? 'is-portrait-preview' : ''
            }`}
          >
            <button
              className="project-lightbox-close"
              onClick={() => setActiveProjectIndex(null)}
              type="button"
            >
              Close
            </button>
            <div className="project-lightbox-media">
              <img className="project-lightbox-bg" src={activeProject.image} alt="" aria-hidden="true" />
              <img className="project-lightbox-img" src={activeProject.image} alt={activeProject.title} />
            </div>
            <div className="project-lightbox-copy">
              <span>{activeProject.category}</span>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.description}</p>
              <div className="project-lightbox-actions">
                <button
                  onClick={() =>
                    setActiveProjectIndex((current) =>
                      current === null ? 0 : (current - 1 + projects.length) % projects.length,
                    )
                  }
                  type="button"
                >
                  Prev
                </button>
                <strong>{activeProject.index}</strong>
                <button
                  onClick={() =>
                    setActiveProjectIndex((current) => (current === null ? 0 : (current + 1) % projects.length))
                  }
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function VideoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStillIndex, setActiveStillIndex] = useState(null);
  const activeVideo = videos[activeIndex];
  const activeStill = activeStillIndex === null ? null : cinematicStills[activeStillIndex];

  useEffect(() => {
    if (activeStillIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveStillIndex(null);
      if (event.key === 'ArrowRight') {
        setActiveStillIndex((current) => (current === null ? 0 : (current + 1) % cinematicStills.length));
      }
      if (event.key === 'ArrowLeft') {
        setActiveStillIndex((current) =>
          current === null ? 0 : (current - 1 + cinematicStills.length) % cinematicStills.length,
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeStillIndex]);

  return (
    <section className="motion-section video-section" id="videos">
      <div className="container">
        <SectionIntro
          eyebrow="03 / AI Video"
          title="MOVING IMAGE LAB"
          lead="把 AI 视频放成独立浏览层：动态预览、电影感 loop、未来短片实验都可以在这里持续扩展。"
        />
        <div className="video-browser" data-stagger>
          <div className="video-stage reveal-media">
            <video
              key={activeVideo.video}
              src={activeVideo.video}
              preload="auto"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <div className="video-stage-meta">
              <span>{activeVideo.index}</span>
              <strong>{activeVideo.category}</strong>
            </div>
          </div>
          <div className="video-panel">
            <span className="eyebrow">AI Video Browser</span>
            <h3>{activeVideo.title}</h3>
            <p>{activeVideo.displayDescription || activeVideo.description}</p>
            <div className="video-tabs" aria-label="AI video clips">
              {videos.map((video, index) => (
                <GooeyAction
                  as="button"
                  className={index === activeIndex ? 'is-active' : ''}
                  key={video.index}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <span>{video.index}</span>
                  <strong>{video.title}</strong>
                </GooeyAction>
              ))}
            </div>
          </div>
        </div>
        <div className="cinematic-wall">
          {cinematicStills.map((still, index) => (
            <article
              className="still-card"
              data-stagger
              key={still.index}
              onClick={() => setActiveStillIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActiveStillIndex(index);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <BorderGlow
                backgroundColor="#090707"
                borderRadius={8}
                className="still-card-glow"
                colors={['rgba(244, 238, 233, 0.76)', '#3b0509', '#080607']}
                edgeSensitivity={24}
                fillOpacity={0.1}
                glowColor="358 56 27"
                glowIntensity={0.86}
                glowRadius={22}
              >
                <TiltedCard
                  altText={still.title}
                  captionText={still.title}
                  className="still-media reveal-media"
                  imageSrc={still.image}
                  rotateAmplitude={6}
                  scaleOnHover={1.04}
                />
                <div className="still-copy">
                  <span>{still.index}</span>
                  <h3>{still.title}</h3>
                  <p>{still.description}</p>
                </div>
              </BorderGlow>
            </article>
          ))}
        </div>
      </div>
      {activeStill ? (
        <div
          className="project-lightbox still-lightbox"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveStillIndex(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStill.title} preview`}
        >
          <div className="project-lightbox-panel still-lightbox-panel">
            <button
              className="project-lightbox-close"
              onClick={() => setActiveStillIndex(null)}
              type="button"
            >
              Close
            </button>
            <div className="project-lightbox-media">
              <img className="project-lightbox-bg" src={activeStill.image} alt="" aria-hidden="true" />
              <img className="project-lightbox-img" src={activeStill.image} alt={activeStill.title} />
            </div>
            <div className="project-lightbox-copy">
              <span>{activeStill.index}</span>
              <h3>{activeStill.title}</h3>
              <p>{activeStill.description}</p>
              <div className="project-lightbox-actions">
                <button
                  onClick={() =>
                    setActiveStillIndex((current) =>
                      current === null ? 0 : (current - 1 + cinematicStills.length) % cinematicStills.length,
                    )
                  }
                  type="button"
                >
                  Prev
                </button>
                <strong>{activeStill.index}</strong>
                <button
                  onClick={() =>
                    setActiveStillIndex((current) =>
                      current === null ? 0 : (current + 1) % cinematicStills.length,
                    )
                  }
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Strengths() {
  return (
    <section className="motion-section strengths-section" id="strengths">
      <div className="container">
        <SectionIntro
          eyebrow="04 / Strengths"
          title="MAKE THE FRAME BELIEVABLE"
          lead="你的优势不只是会拍或会生成，而是能用摄影经验判断 AI 画面是否真实、是否有镜头感、是否能成为一套可展示的作品。"
        />
        <div className="strengths-grid">
          {strengths.map((item) => {
            const Icon = item.icon;
            return (
              <article className="strength-card" data-stagger key={item.title}>
                <Icon size={28} strokeWidth={1.4} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
        <div className="service-strip" aria-label="Services">
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="motion-section contact-section" id="contact">
      <div className="contact-bg reveal-media" aria-hidden="true">
        <img src="/assets/work/ai-fantasy-sky-war.webp" alt="" loading="lazy" />
      </div>
      <div className="contact-eye" aria-hidden="true">
        <EvilEye
          backgroundColor="#020102"
          eyeColor="#ff6f37"
          flameSpeed={0.72}
          glowIntensity={0.78}
          intensity={2.25}
          irisWidth={0.34}
          noiseScale={1.08}
          pupilFollow={0.36}
          pupilSize={0.86}
          scale={0.78}
        />
      </div>
      <div className="container contact-inner">
        <span className="eyebrow">05 / Contact</span>
        <h2 className="section-title">MAKE THE NEXT FRAME FEEL REAL.</h2>
        <p>
          产品摄影、模特拍摄、旅行跟拍、AI 时尚图、电影感视觉参考，都可以从这里联系 Hugo Wu。
        </p>
        <div className="contact-actions" data-stagger>
          <GooeyAction className="primary-link" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </GooeyAction>
          <GooeyAction className="secondary-link" href="#top">
            {profile.douyin}
          </GooeyAction>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const appRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isBadgeOpen, setIsBadgeOpen] = useState(false);

  const handleEnterResume = () => {
    if (isEntering) return;

    setIsEntering(true);
    window.setTimeout(() => {
      setHasEntered(true);
      setIsEntering(false);
      setIsBadgeOpen(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 880);
  };

  useEffect(() => {
    const handleAnchorClick = (event) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = hash === '#top' ? document.getElementById('portfolio') || document.getElementById('top') : document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const offset = hash === '#top' || hash === '#portfolio' ? 0 : 116;
      const nextTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.history.pushState(null, '', hash);
      window.dispatchEvent(new Event('hashchange'));
      window.scrollTo({ top: Math.max(0, nextTop), behavior: 'smooth' });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!hasEntered) {
        if (prefersReduced) {
          gsap.set(['.thunder-kicker', '.thunder-copy', '.thunder-actions'], {
            autoAlpha: 1,
            y: 0,
          });
          gsap.set('.thunder-title .title-line', { yPercent: 0, scaleY: 1 });
          return;
        }

        gsap.set(['.thunder-kicker', '.thunder-copy', '.thunder-actions'], {
          autoAlpha: 0,
          y: 28,
        });
        gsap.set('.thunder-title .title-line', {
          yPercent: 115,
          scaleY: 0.48,
          transformOrigin: '50% 100%',
        });

        gsap.timeline({ defaults: { ease: 'power4.out' } })
          .to(
            '.thunder-title .title-line',
            {
              yPercent: 0,
              scaleY: 1,
              duration: 1.12,
              stagger: 0.08,
              ease: 'expo.out',
            },
            0.12,
          )
          .to(
            ['.thunder-kicker', '.thunder-copy', '.thunder-actions'],
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.86,
              stagger: 0.08,
            },
            0.28,
          );
        return;
      }

      if (prefersReduced) {
        gsap.set(['.nav-shell', '.hero-kicker', '.hero-subcopy', '.hero-actions', '.hero-meta'], {
          autoAlpha: 1,
          y: 0,
        });
        gsap.set('.hero-title .title-line', { yPercent: 0, scaleY: 1 });
        return;
      }

      gsap.set(['.nav-shell', '.hero-kicker', '.hero-subcopy', '.hero-actions', '.hero-meta'], {
        autoAlpha: 0,
        y: 28,
      });
      gsap.set('.hero-title .title-line', {
        yPercent: 115,
        scaleY: 0.48,
        transformOrigin: '50% 100%',
      });
      gsap.set('.hero-video', { scale: 1.18, filter: 'contrast(1.18) saturate(0.82)' });

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to(
          '.hero-title .title-line',
          {
            yPercent: 0,
            scaleY: 1,
            duration: 1.35,
            stagger: 0.14,
            ease: 'expo.out',
          },
          0.1,
        )
        .to(
          '.hero-video',
          {
            scale: 1,
            filter: 'contrast(1) saturate(1)',
            duration: 1.5,
            ease: 'power3.out',
          },
          0,
        )
        .to(
          ['.nav-shell', '.hero-kicker', '.hero-subcopy', '.hero-actions', '.hero-meta'],
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
          },
          0.72,
        );

      gsap.utils.toArray('.motion-section').forEach((section) => {
        const title = section.querySelector('.section-title');
        const intro = section.querySelector('.section-intro p, .contact-inner > p');
        const staggerItems = section.querySelectorAll('[data-stagger]');
        const media = section.querySelectorAll('.reveal-media');

        if (title) {
          gsap.from(title, {
            x: -180,
            autoAlpha: 0,
            scaleX: 0.82,
            transformOrigin: 'left center',
            duration: 1.35,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
            },
          });
        }

        if (intro) {
          gsap.from(intro, {
            y: 44,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: intro,
              start: 'top 82%',
            },
          });
        }

        if (staggerItems.length) {
          gsap.from(staggerItems, {
            y: 70,
            autoAlpha: 0,
            duration: 1.12,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 64%',
            },
          });
        }

        media.forEach((item) => {
          const image = item.querySelector('img');
          gsap.fromTo(
            item,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.15,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: item,
                start: 'top 78%',
              },
            },
          );

          if (image) {
            gsap.to(image, {
              yPercent: item.dataset.speed === 'slow' ? -8 : -12,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            });
          }
        });
      });

      ScrollTrigger.refresh();
    }, appRef);

    return () => ctx.revert();
  }, [hasEntered]);

  return (
    <main ref={appRef}>
      <LiquidEther
        autoIntensity={2}
        autoSpeed={0.42}
        className="site-ether"
        colors={['#d81622', '#7f0710', '#f4eee9']}
        cursorSize={170}
        mouseForce={20}
        resolution={0.54}
      />
      {hasEntered ? (
        <>
          <Header isBadgeOpen={isBadgeOpen} onBadgeToggle={() => setIsBadgeOpen((value) => !value)} />
          <Lanyard open={isBadgeOpen} onClose={() => setIsBadgeOpen(false)} />
          <Hero />
          <ExperienceDossier />
          <Projects />
          <VideoGallery />
          <Strengths />
          <Contact />
        </>
      ) : (
        <ThunderLanding isLeaving={isEntering} onStart={handleEnterResume} />
      )}
    </main>
  );
}
