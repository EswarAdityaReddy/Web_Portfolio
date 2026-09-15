// ─── Types ───────────────────────────────────────────────────────────────────

export type Skill = {
  name: string;
  level: number;
  category: string;
};

export type Project = {
  name: string;
  category: string;
  summary: string;
  impact: string;
  tech: string[];
  accent: string;
  link?: string;
  features?: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  note: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  period: string;
  type: 'experience' | 'education';
  summary: string;
  tasks?: string[];
};

export type Achievement = {
  title: string;
  subtitle: string;
  detail: string;
  icon: 'trophy' | 'medal' | 'star';
};

export type Education = {
  institution: string;
  degree: string;
  detail: string;
  period: string;
  cgpa?: string;
};

// ─── Profile ─────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Sungala Eswar Aditya Reddy',
  title: 'Software Developer • AI Engineer • ML Enthusiast • Automation Engineer',
  location: 'India',
  intro:
    'Building intelligent systems powered by Artificial Intelligence, Automation, Mobile Development, and Modern Software Engineering.',
  mission:
    'Computer Science student at SRM University with a CGPA of 9.24 while simultaneously pursuing a Bachelor of Science in Data Science from IIT Madras. Passionate about Artificial Intelligence, Automation, Flutter Development, Java, Machine Learning, and scalable software engineering. Focused on building impactful products that solve real-world problems.',
  resumeHref: '/resume.pdf',
  githubUsername: 'EswarAdityaReddy',
  leetcodeUsername: 'sungalaeswaradityareddy265',
  email: 'adityareddysungala@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adityareddy265/',
  phone: '8074394544',
};

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Programming
  { name: 'Java', level: 92, category: 'Programming' },
  { name: 'C++', level: 85, category: 'Programming' },
  { name: 'Python', level: 90, category: 'Programming' },
  { name: 'JavaScript', level: 82, category: 'Programming' },
  { name: 'SQL', level: 80, category: 'Programming' },
  { name: 'Flutter', level: 88, category: 'Programming' },
  { name: 'React', level: 75, category: 'Programming' },
  { name: 'HTML', level: 85, category: 'Programming' },
  { name: 'CSS', level: 82, category: 'Programming' },

  // Databases
  { name: 'PostgreSQL', level: 82, category: 'Databases' },
  { name: 'MySQL', level: 80, category: 'Databases' },
  { name: 'SQLite', level: 78, category: 'Databases' },
  { name: 'Firebase', level: 85, category: 'Databases' },
  { name: 'Supabase', level: 80, category: 'Databases' },

  // AI/ML
  { name: 'TensorFlow', level: 85, category: 'AI/ML' },
  { name: 'YOLOv8', level: 82, category: 'AI/ML' },
  { name: 'Machine Learning', level: 88, category: 'AI/ML' },
  { name: 'Deep Learning', level: 80, category: 'AI/ML' },
  { name: 'NLP', level: 75, category: 'AI/ML' },
  { name: 'LLMs', level: 78, category: 'AI/ML' },

  // Automation
  { name: 'n8n', level: 88, category: 'Automation' },
  { name: 'Git', level: 90, category: 'Automation' },
  { name: 'GitHub', level: 88, category: 'Automation' },
  { name: 'VS Code', level: 92, category: 'Automation' },
  { name: 'AWS', level: 75, category: 'Automation' },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    name: 'AI Fitness Trainer',
    category: 'AI/ML',
    summary:
      'Real-time AI-powered fitness trainer using computer vision for exercise detection, pose estimation, and rep counting with instant AI feedback.',
    impact: 'Real-time exercise detection & counting',
    tech: ['Python', 'YOLOv8', 'OpenCV', 'Deep Learning'],
    accent: 'from-cyan/30 to-blue/10',
    link: '#',
    features: [
      'Exercise Detection',
      'Real-time Pose Estimation',
      'Push-up Counter',
      'Bicep Curl Counter',
      'AI Feedback',
    ],
  },
  {
    name: 'AROGION',
    category: 'Mobile',
    summary:
      'Comprehensive healthcare appointment system with video consultation, hospital discovery, and medical records management.',
    impact: 'Full-stack healthcare platform',
    tech: ['Flutter', 'Firebase', 'Supabase', 'PostgreSQL', 'Google Maps API', 'Agora'],
    accent: 'from-blue/30 to-cyan/10',
    link: '#',
    features: [
      'Appointment Booking',
      'Authentication',
      'Video Consultation',
      'Hospital Discovery',
      'Medical Records',
    ],
  },
];

// ─── Certifications ──────────────────────────────────────────────────────────

export const certifications: Certification[] = [
  {
    name: 'AWS AI Practitioner',
    issuer: 'Amazon Web Services',
    year: '2025',
    note: 'Certified AI practitioner with expertise in AWS AI/ML services and cloud-based AI solutions.',
  },
  {
    name: 'Salesforce Agentforce',
    issuer: 'Salesforce',
    year: '2025',
    note: 'Specialized in building autonomous AI agents with Salesforce Agentforce platform.',
  },
  {
    name: 'NPTEL Machine Learning',
    issuer: 'NPTEL / IIT',
    year: '2024',
    note: 'Comprehensive machine learning certification covering algorithms, neural networks, and practical applications.',
  },
  {
    name: 'Cisco IoT',
    issuer: 'Cisco',
    year: '2024',
    note: 'Internet of Things fundamentals, sensor networks, and connected device architectures.',
  },
  {
    name: 'Skillsoft',
    issuer: 'Skillsoft',
    year: '2024',
    note: 'Professional development in software engineering best practices and modern development workflows.',
  },
  {
    name: 'Algo University Graph Camp',
    issuer: 'Algo University',
    year: '2024',
    note: 'Advanced graph algorithms, data structures, and competitive programming techniques.',
  },
];

// ─── Experiences ─────────────────────────────────────────────────────────────

export const experiences: ExperienceItem[] = [
  {
    role: 'Automation & App Development Intern',
    organization: 'XORSTACK',
    period: '2024 - Present',
    type: 'experience',
    summary:
      'Developed AI-powered content generation workflows using n8n, built Flutter puzzle games with SQLite integration, implemented workflow automation pipelines, and created AI-personalized mobile applications.',
    tasks: [
      'AI Content Generation using n8n',
      'Flutter Puzzle Game',
      'SQLite Integration',
      'Workflow Automation',
      'AI Personalization',
      'Mobile Development',
    ],
  },
];

// ─── Achievements ────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    title: 'Top 60 — Deloitte Hacksplosion',
    subtitle: 'Out of 21,000+ Teams',
    detail:
      'Secured a position in the Top 60 teams nationwide in the prestigious Deloitte Hacksplosion hackathon, competing against 21,000+ teams.',
    icon: 'trophy',
  },
  {
    title: '3rd Prize — Product Expo',
    subtitle: 'Cash Prize Winner',
    detail:
      'Won 3rd prize with a cash award for an AI-powered Agriculture project at the university Product Expo.',
    icon: 'medal',
  },
];

// ─── Education ───────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    institution: 'SRM University',
    degree: 'B.Tech Computer Science',
    detail:
      'Pursuing Bachelor of Technology in Computer Science with a strong focus on AI, ML, and software engineering.',
    period: '2023 - 2027',
    cgpa: '9.24',
  },
  {
    institution: 'IIT Madras',
    degree: 'BS Data Science',
    detail:
      'Simultaneously pursuing a Bachelor of Science in Data Science, currently at Foundation Level.',
    period: '2024 - Present',
  },
];

// ─── Project Filters ─────────────────────────────────────────────────────────

export const projectFilters = ['All', 'AI/ML', 'Mobile'];

// ─── Assistant Quick Actions ─────────────────────────────────────────────────

export const assistantQuickActions = [
  { command: 'about', label: 'About' },
  { command: 'skills', label: 'Skills' },
  { command: 'projects', label: 'Projects' },
  { command: 'experience', label: 'Experience' },
  { command: 'achievements', label: 'Achievements' },
  { command: 'education', label: 'Education' },
  { command: 'certifications', label: 'Certifications' },
  { command: 'contact', label: 'Contact' },
];

// ─── Assistant Responses (JARVIS-style) ──────────────────────────────────────

export const assistantResponses: Record<string, string> = {
  help: 'Available commands: about, skills, projects, experience, achievements, education, certifications, contact, resume, clear',
  about:
    'Commander Eswar is a Computer Science student at SRM University with a CGPA of 9.24, simultaneously pursuing BS Data Science from IIT Madras. Specializations include AI, Machine Learning, Flutter Development, and Workflow Automation.',
  skills:
    'According to my database, Commander Eswar has expertise in Java, Python, C++, Flutter, React, TensorFlow, YOLOv8, and n8n workflow automation. Full-stack capabilities confirmed across 9 programming languages.',
  projects:
    'Project database contains 2 flagship missions: AI Fitness Trainer (YOLOv8 + OpenCV) and AROGION Healthcare Platform (Flutter + Firebase). Both systems are operational.',
  experience:
    'Commander Eswar served as Automation & App Development Intern at XORSTACK, executing 6 mission modules including AI content generation, Flutter development, and workflow automation.',
  achievements:
    'Notable achievements logged: Top 60 in Deloitte Hacksplosion (21,000+ teams), 3rd Prize at Product Expo for AI Agriculture Project. Achievement clearance: Exceptional.',
  education:
    'Dual enrollment detected: B.Tech Computer Science at SRM University (CGPA: 9.24) and BS Data Science at IIT Madras (Foundation Level). Academic status: Outstanding.',
  certifications:
    '6 verified credentials on file: AWS AI Practitioner, Salesforce Agentforce, NPTEL Machine Learning, Cisco IoT, Skillsoft, and Algo University Graph Camp.',
  contact:
    'Communication channels active. Email: adityareddysungala@gmail.com. LinkedIn and GitHub profiles are online. Transmission ready.',
  resume: 'Resume download armed. Initiating document transfer protocol.',
  clear: 'Console memory purged. Awaiting new directives, Commander.',
};
