# Design QA

final result: passed

## Scope

- Built a new React + Vite portfolio at `MiroFish/portfolio`.
- Visual target: selected concept 3, refined to emphasize photographer + AI creator.
- Desktop target checked primarily against the local preview at `http://127.0.0.1:5174/`.

## Checks

- Opening animation exits cleanly and reveals the hero.
- Hero `<video>` plays from a local MP4 asset and has a poster fallback.
- Hero title now promotes the Chinese name `吴鸿坤` above `HUGO WU / VISUALS`.
- Hero English title uses the local `TextPressure` component with full white/red word rendering, without the over-compressed transparent outline look.
- Anchor navigation applies a fixed-header offset so Chinese nav clicks land at the visible top of each section.
- Navigation bar uses a frosted-glass treatment with translucent background, blur, border, and rounded edge.
- Navigation labels are Chinese and use the local `GooeyNav` liquid active-pill treatment.
- Navigation now scroll-spies the largest visible section, so the active item follows normal page browsing instead of changing late only when a section reaches the fixed header.
- Navigation scroll-spy now prioritizes the section top near the fixed header and no longer lets the URL hash keep the wrong item active; Profile correctly highlights `个人简介`.
- Primary clickable controls use `GooeyAction` particle feedback.
- Project and still image media use `TiltedCard` hover treatment where they remain card-based.
- GSAP ScrollTrigger animations fire for section titles, cards, image reveal, and parallax.
- Projects now use a horizontal editorial strip gallery with wheel-to-sideways browsing and click-to-open lightbox previews.
- Project lightbox previews now constrain images inside the viewport with `object-fit: contain`; portrait images use a dedicated vertical preview stage so 9:16 works open without cropping, while the project strip keeps the editorial `cover` treatment.
- Global section spacing was tightened again: the hero-to-profile transition has less dead space, the profile grid uses a fixed media stage, and the profile content fits inside the tested 720px viewport.
- Profile portrait framing now anchors to the top of the image so the face is preserved after the media stage height was tightened.
- Selected Works title was scaled up with a larger editorial intro block to fill the previously empty header area.
- Cinematic still cards now open a full lightbox preview with keyboard close/previous/next behavior.
- AI video browser was tightened so the player and right-side list share the same top and bottom alignment.
- Desktop visual density was tightened by reducing oversized nav, section spacing, video browser height, card heights, and large breakpoint typography.
- Added AI video browsing with 5 clips; V05 maps to `video-snow-chase-loop.mp4`.
- AI video tab numbers now have their own left inset and pill treatment so `V01`/`V02` no longer sit on the card edge.
- AI video intro uses oversized typography layers to reduce the empty lead-in area.
- Added 4 cinematic still previews from the latest supplied images.
- Removed the contact preview strip per annotation; `.contact-preview-strip` is no longer rendered.
- Desktop hero, experience, projects, videos, strengths, and contact screens are structured to avoid visible text overlap.
- Final production build passed with Vite.

## Follow-Up Content

- Resume numbers, email, WeChat, Instagram, and project copy are provisional.
- Replace placeholder/editorial images with the user's final photography and AI work when available.
