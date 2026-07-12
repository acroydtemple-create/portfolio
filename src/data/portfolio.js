import {
  Aperture,
  ArrowUpRight,
  BrainCircuit,
  Camera,
  Layers3,
  ScanLine,
  Sparkles,
} from 'lucide-react';

export const profile = {
  chineseName: '吴鸿坤',
  englishName: 'Hugo Wu',
  email: '344497524@qq.com',
  douyin: '抖音 / 小吴2.0',
  location: 'China / Available Worldwide',
};

export const navItems = [
  { label: '个人简介', href: '#experience' },
  { label: '作品预览', href: '#projects' },
  { label: 'AI视频', href: '#videos' },
  { label: '个人优势', href: '#strengths' },
  { label: '联系我', href: '#contact' },
];

export const profileStats = [
  { value: '3+', label: '年摄影行业经验' },
  { value: '4', label: '产品 / 模特 / 旅行 / 视觉' },
  { value: 'AI+', label: '多年 AI 影像探索' },
  { value: '2.0', label: '小吴视觉身份升级中' },
];

export const contactLinks = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Douyin', value: '小吴2.0', href: '#contact' },
  { label: 'Name', value: `${profile.englishName} / ${profile.chineseName}`, href: '#top' },
];

export const projects = [
  {
    index: '01',
    title: 'AI Fashion Editorial',
    category: 'AI Fashion',
    image: '/assets/work/fashion-paris-street.webp',
    orientation: 'portrait',
    description:
      '以 AI 生成时尚人物、街景和造型关系，保留摄影式的现场感、服装质感和人物气质。',
  },
  {
    index: '02',
    title: 'Cinematic Worldbuilding',
    category: 'AI Cinema',
    image: '/assets/work/ai-cinematic-cathedral.webp',
    orientation: 'landscape',
    description:
      '构建电影感场景、空间秩序和光线氛围，让单张图具备世界观和预告片气质。',
  },
  {
    index: '03',
    title: 'Product / Model / Travel',
    category: 'Photography',
    image: '/assets/project-red-silhouette.jpg',
    orientation: 'landscape',
    description:
      '三年多摄影经验覆盖产品摄影、模特拍摄和旅行跟拍，擅长把人、物和场景放进清晰叙事。',
  },
  {
    index: '04',
    title: 'Space Character Frames',
    category: 'AI Character',
    image: '/assets/work/ai-space-portrait.webp',
    orientation: 'landscape',
    description:
      '用电影镜头语言处理人物和场景，把科幻角色、空间材质和情绪光线组合成完整画面。',
  },
  {
    index: '05',
    title: 'Noir Mood Studies',
    category: 'Film Look',
    image: '/assets/work/cinematic-noir-desk.webp',
    orientation: 'landscape',
    description:
      '从电影观看经验里提炼明暗、烟雾、窗影和角色状态，用 AI 做出可延展的视觉参考。',
  },
  {
    index: '06',
    title: 'Desert Fashion System',
    category: 'AI Fashion',
    image: '/assets/work/fashion-desert-station.webp',
    orientation: 'portrait',
    description:
      '探索更商业化的时尚大片方向：强太阳光、荒漠空间、服装廓形和高识别度人物姿态。',
  },
  {
    index: '07',
    title: 'Rain City Portraits',
    category: 'AI Editorial',
    image: '/assets/work/fashion-rain-rooftop.webp',
    orientation: 'portrait',
    description:
      '偏冷调、雨夜、城市和人物肖像的组合，适合作为封面、海报和系列视觉延展。',
  },
  {
    index: '08',
    title: 'Bar Light Memory',
    category: 'Atmosphere',
    image: '/assets/work/fashion-candle-portrait.webp',
    orientation: 'portrait',
    description:
      '调酒师经历让你对暗场、器皿、反光和夜间氛围更敏感，这些经验也进入你的影像方法。',
  },
];

export const videos = [
  {
    index: 'V01',
    title: 'Frozen Crown Loop',
    category: 'Cinematic World',
    video: '/assets/work/ai-video-01.mp4',
    poster: '/assets/work/ai-cinematic-cathedral.webp',
    description: '冰封王座的慢速镜头实验，重点放在冷光、空间纵深和史诗感氛围，适合作为首页视觉和世界观片头。',
    legacyDescription:
      '由冰冷王座场景延展出的慢速推镜预览，用来展示电影感 AI 场景未来进入视频序列的方向。',
  },
  {
    index: 'V02',
    title: 'Orbital Portrait Test',
    category: 'AI Character',
    video: '/assets/work/ai-video-02.mp4',
    poster: '/assets/work/ai-space-portrait.webp',
    description: '太空舱人物的动态肖像测试，用微弱呼吸、舱内反光和视线变化强化角色临场感。',
    legacyDescription:
      '科幻人物画面的轻微运动版本，适合后续扩展成角色短片、封面动态背景或视觉提案。',
  },
  {
    index: 'V03',
    title: 'Noir Light Memory',
    category: 'Film Atmosphere',
    video: '/assets/work/ai-video-03.mp4',
    poster: '/assets/work/cinematic-noir-desk.webp',
    description: '把窗影、烟雾、暗光和酒馆经验转译成影像氛围，强调情绪、质感和电影里的停顿。',
    legacyDescription:
      '把窗影、烟雾和暗场角色做成可浏览的视频预览，突出电影观看经验对画面的影响。',
  },
  {
    index: 'V04',
    title: 'Desert Fashion Motion',
    category: 'AI Fashion',
    video: '/assets/work/ai-video-04.mp4',
    poster: '/assets/work/fashion-desert-station.webp',
    description: '荒漠时尚人物的动态预览，关注服装材质、日光反射和人物姿态，保留大片式视觉张力。',
    legacyDescription:
      '时尚人物图的动态浏览版本，后续可替换成真实 AI 视频或 Runway / Kling / 可灵生成片段。',
  },
  {
    index: 'V05',
    title: 'Snow Chase Preview',
    category: 'Action Sequence',
    video: '/assets/work/ai-video-05.mp4',
    poster: '/assets/work/cinematic-snow-chase.webp',
    displayDescription: '雪地追逐的动作镜头实验，用速度、粉雪、航拍压迫感和运动模糊制造预告片节奏。',
    description: '雪地追逐图的动态预览版本，保留高速运动、粉雪、航拍压力和电影动作片的镜头感。',
  },
];

export const cinematicStills = [
  {
    index: 'S01',
    title: 'Snow Chase',
    image: '/assets/work/cinematic-snow-chase.webp',
    description: '雪地追逐、直升机、速度和粉雪颗粒，偏动作片预告片质感。',
  },
  {
    index: 'S02',
    title: 'Deck Close-Up',
    image: '/assets/work/cinematic-ship-portrait.webp',
    description: '海盗船甲板上的人物近景，强调逆光、人脸状态和冒险片气质。',
  },
  {
    index: 'S03',
    title: 'Suburb Night',
    image: '/assets/work/cinematic-suburb-night.webp',
    description: '雾气、街灯、空旷街区和人物站位，偏悬疑电影开场镜头。',
  },
  {
    index: 'S04',
    title: 'Sky War',
    image: '/assets/work/cinematic-fantasy-sky.webp',
    description: '大场面奇幻天空战争，用光束、剪影和空间层次建立世界观。',
  },
];

export const strengths = [
  {
    icon: Camera,
    title: '商业摄影执行',
    text: '做过产品摄影、模特拍摄和旅行跟拍，知道如何在真实场景里处理光线、构图和交付。',
  },
  {
    icon: BrainCircuit,
    title: 'AI 影像创作',
    text: '多年接触 AI，把提示词、参考图、审美判断和后期筛选整合成可持续的视觉生产流程。',
  },
  {
    icon: Aperture,
    title: '人物与造型感',
    text: '关注模特状态、服装线条、面部情绪和环境关系，让时尚图片更像被拍出来的真实大片。',
  },
  {
    icon: Layers3,
    title: '项目视觉包装',
    text: '从单张图升级到系列：封面、海报、社媒切图、项目卡片和个人作品集都保持统一调性。',
  },
  {
    icon: ScanLine,
    title: '电影感转译',
    text: '把电影观看经验转译成光比、镜头距离、场景层次和角色姿态，强化画面的故事入口。',
  },
  {
    icon: Sparkles,
    title: '夜间氛围控制',
    text: '调酒经历带来对吧台、玻璃、液体、暗光和社交氛围的敏感度，让画面更有情绪。',
  },
];

export const services = [
  'Product photography',
  'Model shooting',
  'Travel follow shoot',
  'AI fashion visuals',
];

export { ArrowUpRight };
