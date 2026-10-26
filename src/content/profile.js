/**
 * Single source of truth for every fact this portfolio shows.
 *
 * Every string here is copied from /workshop/resume/resume_spec.md (via
 * resume_data.py). Nothing is invented: no numbers, companies, dates, titles or
 * achievements that the owner has not written down. If a fact is not in the
 * spec, it does not appear on the site.
 */

export const IDENTITY = {
  name: 'SUTHAN K',
  monogram: 'SK',
  title: 'Software Engineer | Full Stack Developer',
  location: 'Trivandrum, Kerala, India',
  summary:
    'Full Stack Software Engineer with 2+ years of experience building scalable, client-facing ' +
    'web applications with React.js, Next.js, JavaScript, TypeScript, Node.js and Python. Cut ' +
    'API response time by 25% by optimising REST and GraphQL APIs. Hands-on with JWT/RBAC ' +
    'authentication, PostgreSQL indexing, Dockerised microservices on AWS and CI/CD in ' +
    'cross-functional Agile teams.',
  intro: [
    'A highly motivated full stack developer with a solid foundation across the front end, the ' +
      'back end and the database layer, who adapts quickly to new environments and challenges.',
    'My goal is to contribute meaningfully to development teams by applying my skills in web ' +
      'development and problem-solving, and to keep building efficient, scalable solutions.',
  ],
  resume: '/Suthan_Developer_Resume.pdf',
}

export const CONTACT = {
  email: 'suthanks2000@gmail.com',
  phone: '+91 93843 40144',
  phoneHref: 'tel:+919384340144',
  whatsapp: 'https://wa.me/919384340144',
  portfolio: 'suthan.vercel.app',
  portfolioHref: 'https://suthan.vercel.app/',
  github: 'github.com/suthanks2000',
  githubHref: 'https://github.com/suthanks2000',
  linkedin: 'linkedin.com/in/suthan-k',
  linkedinHref: 'https://www.linkedin.com/in/suthan-k/',
  instagramHref: 'https://www.instagram.com/suthan_voyager/',
}

/** Skill groups, in the full-stack order the master resume uses. */
export const SKILL_GROUPS = [
  { label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'] },
  {
    label: 'Frontend',
    items: ['React.js', 'Next.js', 'Redux Toolkit', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    label: 'Backend & APIs',
    items: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'Flask',
      'REST APIs',
      'GraphQL',
      'WebSockets',
      'Microservices',
    ],
  },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'TypeORM'] },
  {
    label: 'Cloud & DevOps',
    items: ['AWS Lambda', 'Docker', 'GitHub Actions', 'CI/CD', 'Cloudflare', 'Vercel'],
  },
  { label: 'Security & Testing', items: ['JWT', 'RBAC', 'OAuth2', 'Jest', 'PyTest'] },
  {
    label: 'Tools & Practices',
    items: ['Git', 'Jira', 'Agile/Scrum', 'Data Structures & Algorithms'],
  },
]

export const EXPERIENCE = [
  {
    company: 'Magpii Innovations',
    role: 'Software Engineer',
    period: 'Nov 2025 – Present',
    bullets: [
      'Build client-facing features end to end with React.js, Node.js and Express.js, from ' +
        'requirement breakdown through to release in cross-functional Agile sprints.',
      'Design and maintain the REST APIs behind those features, including the integration ' +
        'points with other systems.',
      'Diagnose and resolve production errors across live application workflows, keeping ' +
        'client-facing features stable.',
      'Onboard new clients by translating their requirements into product configuration and the ' +
        'features their setup needs.',
    ],
  },
  {
    company: 'Comorins Technologies',
    role: 'Junior Software Developer',
    period: 'Mar 2025 – Oct 2025',
    bullets: [
      'Built server-side-rendered web applications with Next.js and TypeScript.',
      'Developed Node.js REST APIs and secured them with JWT authentication and role-based ' +
        'access control (RBAC).',
      'Automated manual steps in internal processes with AI-powered features and application ' +
        'workflows written in Python.',
      'Maintained the GitHub Actions and Vercel CI/CD pipelines used for application releases.',
    ],
  },
  {
    company: 'Devaxcel Tech Pvt. Ltd.',
    role: 'Junior Software Developer',
    period: 'Sep 2024 – Mar 2025',
    bullets: [
      'Optimised REST and GraphQL APIs, cutting API response time by 25%.',
      'Developed React.js features in TypeScript.',
      'Managed PostgreSQL migrations, indexing and secure queries for efficient data retrieval.',
      'Containerised microservices with Docker, deployed backend functions on AWS Lambda and ' +
        'supported the CI/CD pipelines and system integration for releases.',
    ],
  },
]

export const PROJECTS = [
  {
    id: 'iot',
    index: '01',
    name: 'Enterprise Industrial IoT & Digital Twin Platform',
    short: 'Industrial IoT & Digital Twin',
    stack: ['.NET 8/9', 'ASP.NET Core', 'React 19', 'Azure', 'Docker'],
    bullets: [
      'Designed and deployed 7+ Docker microservices on Azure Container Apps for telemetry ' +
        'ingestion, graph models and caching.',
      'Streamed 50,000+ telemetry points/sec at sub-80 ms latency (SignalR WebSockets, Azure ' +
        'Event Hubs); cut graph query latency 42% with Apache AGE on PostgreSQL.',
      'Delivered a low-code React 19 + Redux Toolkit cockpit that reduced dashboard ' +
        'configuration deployments by 80%; Azure DevOps GitOps pipelines with Trivy scanning ' +
        'kept releases under 12 minutes.',
    ],
  },
  {
    id: 'healthtech',
    index: '02',
    name: 'HealthTech Platform',
    short: 'HealthTech Platform',
    stack: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS Lambda'],
    bullets: [
      'Built order-management workflows supporting 10,000+ daily orders; automated backend ' +
        'tasks with AWS Lambda.',
      'Implemented JWT authentication and RBAC, and integrated REST and GraphQL APIs with ' +
        'microservices.',
    ],
  },
  {
    id: 'lms',
    index: '03',
    name: 'Learning Management System',
    short: 'Learning Management System',
    stack: ['React.js', 'Node.js', 'REST APIs'],
    bullets: [
      'Created responsive learning modules and REST APIs for course management and dashboards.',
      'Fixed defects and supported deployment and integration alongside QA, UI/UX and product ' +
        'teams.',
    ],
  },
]

/**
 * The Scene 7 architecture walk-through. Each node is a component the IoT
 * platform bullets above already describe - no new capability is claimed here.
 */
export const IOT_ARCHITECTURE = [
  { label: 'Telemetry devices', detail: 'Field sensors emitting the device stream' },
  { label: 'Azure Event Hubs', detail: 'Ingestion of 50,000+ telemetry points/sec' },
  { label: 'Docker microservices', detail: '7+ services on Azure Container Apps' },
  { label: 'SignalR WebSockets', detail: 'Sub-80 ms push to connected clients' },
  { label: 'Apache AGE on PostgreSQL', detail: 'Graph models, 42% lower query latency' },
  { label: 'Redis caching', detail: 'Hot telemetry and graph reads' },
  { label: 'React 19 cockpit', detail: 'Low-code dashboards, 80% fewer config deployments' },
]

export const EDUCATION = {
  degree: 'Bachelor of Engineering (B.E.)',
  institution: 'University College of Engineering, Nagercoil',
  period: '2019 – 2022',
}

/**
 * The ten chapters of the showreel, in scroll order. `camera` drives the rig in
 * src/scene/CameraRig.jsx, so the 3D universe and the DOM overlay always agree
 * on where we are.
 */
export const CHAPTERS = [
  { id: 'enter', label: 'Enter', nav: null },
  { id: 'hero', label: 'Hero', nav: 'Home' },
  { id: 'about', label: 'About', nav: 'About' },
  { id: 'skills', label: 'Skills', nav: 'Skills' },
  { id: 'experience', label: 'Experience', nav: 'Experience' },
  { id: 'projects', label: 'Projects', nav: 'Projects' },
  { id: 'iot', label: 'IoT Platform', nav: null },
  { id: 'platforms', label: 'Platforms', nav: null },
  { id: 'education', label: 'Education', nav: null },
  { id: 'contact', label: 'Contact', nav: 'Contact' },
]
