export interface Project {
  slug: string;
  title: string;
  role: string;
  description: string;
  longDescription: string;
  features: string[];
  impact: string[];
  tags: string[];
  color: string;
  icon: string;
  link: string;
  thumbnail?: string;
  category: 'enterprise' | 'web-app';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
  icon: string;
}

export interface AppEvent {
  title: string;
  date: string;
  description: string;
  category: string;
}


export interface PortfolioData {
  identity: {
    name: string;
    nickname: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
  };
  hero: {
    shortBio: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  about: {
    paragraphs: string[];
    infoCards: {
      icon: string;
      title: string;
      desc: string;
    }[];
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  achievements: Achievement[];
  events: AppEvent[];
}

export const portfolioData: PortfolioData = {
  identity: {
    name: 'Aaron Christian Basa',
    nickname: 'Aaron',
    firstName: 'Aaron',
    lastName: 'Basa',
    title: 'Full-Stack Developer + AI Specialist',
    email: 'acjbasa00@gmail.com',
  },
  hero: {
    shortBio: 'I craft robust, AI-powered web applications and scalable enterprise systems that bridge the gap between traditional governance and modern efficiency.',
    stats: [
      { value: '7+', label: 'Years Exp.' },
      { value: '10+', label: 'Projects' },
      { value: '10+', label: 'Technologies' },
    ],
  },
  about: {
    paragraphs: [
      "My journey as a developer began with a fascination for how technology can transform rigid, traditional systems into agile, data-driven powerhouses. Over the last 7 years, I have evolved from a full-stack developer into an AI Specialist, focusing on the intersection of robust backend architectures and intelligent automation.",
      "My work at the University of the Philippines has been a testament to this, where I have spearheaded digitalization initiatives that modernized critical government workflows. I am driven by the challenge of \"injecting modern process into traditional government workflows.\"",
      "Whether I am architecting multi-tenant SaaS platforms like the SPMO Suite or serving as an ISO and Data Champion, my goal is always to create systems that are technically superior and deeply impactful. I believe that AI is not just a tool but a fundamental shift in how we solve problems.",
    ],
    infoCards: [
      { icon: '🎓', title: 'Education', desc: 'Information Technology' },
      { icon: '📍', title: 'Location', desc: 'Manila, PH' },
      { icon: '💼', title: 'Focus', desc: 'Full-Stack / AI' },
      { icon: '🌐', title: 'Languages', desc: 'EN / FIL' },
    ],
  },
  experience: [
    {
      role: 'Full-Stack Developer (Contract)',
      company: 'PhMedtech-Europe',
      period: '2024 – Present',
      description: 'Architecting and maintaining a specialized multi-tenant LMS and career platform for German language education.',
      highlights: [
        'Developed a multi-tenant architecture with school-specific branding and data isolation',
        'Implemented a gamified learning system with point-based progression and achievements',
        'Built a dynamic resource hub using HTMX for seamless, app-like user interactions',
        'Integrated automated quiz engines and activity submission systems for structured learning',
      ],
    },
    {
      role: 'Junior Office Manager',
      company: 'University of the Philippines System (SSPMO / OVPA)',
      period: '2025 – Present',
      description: 'Leading digitalization initiatives and system implementations for the System Supply and Property Management Office. Serving as ISO, Values, and Data Champion.',
      highlights: [
        'Sole developer for key digitalization initiatives and office systems',
        'Architected and implemented AI-powered automations to streamline government workflows',
        'Injecting modern, agile processes into traditional bureaucratic systems',
        'Overseeing data integrity and compliance as a designated Data Champion',
      ],
    },
    {
      role: 'Junior Programmer',
      company: 'University of the Philippines System (OVPA)',
      period: '2023 – 2025',
      description: 'Focused on the development of specialized office systems and internal automations to improve administrative efficiency.',
      highlights: [
        'Developed native and AI-integrated applications for office management',
        'Supported the digital transformation of vertical administrative units',
        'Ensured high standards of code quality and system security in institutional projects',
      ],
    },
  ],
  projects: [
    {
      slug: 'german-learning-platform',
      title: 'German Learning Platform',
      role: 'Full-Stack Developer & Systems Architect',
      description: 'A specialized multi-tenant Learning Management System (LMS) for German education and career consulting.',
      longDescription: 'PhMedtechEu is a robust, multi-tenant platform designed to streamline German language education. It provides an interactive environment for schools to manage structured courses (A1-C2), engaging students through gamification and integrated career resources for transitions to Germany.',
      features: [
        'Multi-Tenant Architecture: Secure data isolation and custom branding for multiple institutions',
        'Gamified Progression: Point systems, badging, and level tracking to boost student engagement',
        'Comprehensive LMS: Support for diverse lesson types, interactive quizzes, and activity submissions',
        'Resource Management: Dynamic hub for DIY guides and career news with rich-text support (CKEditor)',
        'HTMX-Driven UX: Modern, responsive transitions for an app-like experience without page reloads',
      ],
      impact: [
        'Operational Scalability: Seamlessly onboard new schools with unique subdomains and branding',
        'Increased Conversion: Integrated lead generation for career consulting and program enrollments',
        'Enhanced Learning: 92% completion rate achieved through automated feedback and gamification',
      ],
      tags: ['Django', 'HTMX', 'Postgres', 'Multi-tenant', 'Vanilla CSS'],
      color: 'from-blue-600 to-indigo-600',
      icon: '🇩🇪',
      link: 'https://phmedtecheu.com/',
      thumbnail: '/projects/phmedtecheu.png',
      category: 'enterprise',
    },
    {
      slug: 'sspmo-hub',
      title: 'SPMO Hub: The Central Ecosystem Portal',
      role: 'Lead Architect & Full-Stack Developer',
      description: 'The primary digital gateway for the UP System Supply and Property Management Office. Acts as the administrative bridge for institutional coordination and public transparency.',
      longDescription: 'The SPMO Hub serves as the digital backbone and unified gateway for the Supply and Property Management Office (SPMO). It centralizes institutional communications, news advisories, and provides a single, secure point of access to the suite’s specialized management modules.',
      features: [
        'Institutional CMS: Custom-built for news, advisories, and memo distribution',
        'Inspection Scheduler: Public-facing dashboard for property inspection tracking',
        'Unified Navigation: Global authentication and cross-app routing',
        'Responsive Architecture: Mobile-optimized administrative access',
      ],
      impact: [
        'Centralized Infrastructure: Consolidated four disparate administrative functions into a unified, containerized ecosystem',
        'Operational Transparency: Reduced administrative inquiries by 40% through the Inspection Dashboard',
        'Scalable Deployment: Orchestrated a multi-service Docker environment with centralized Nginx routing',
      ],
      tags: ['Django', 'Postgres', 'Docker', 'Nginx', 'Vanilla CSS'],
      color: 'from-indigo-600 to-blue-600',
      icon: '🏛️',
      link: 'https://sspmo.up.edu.ph',
      thumbnail: '/projects/sspmo-hub.png',
      category: 'enterprise',
    },
    {
      slug: 'gamit-asset-core',
      title: 'GAMIT: Enterprise Asset & Inventory Management',
      role: 'Systems Architect & Core Developer',
      description: 'High-fidelity property management system designed for the end-to-end lifecycle tracking of Property, Plant, and Equipment (PPE).',
      longDescription: 'GAMIT is a high-fidelity property management system designed for the end-to-end lifecycle tracking of Property, Plant, and Equipment (PPE). It automates the transition from manual spreadsheet tracking to a robust, audit-ready digital repository.',
      features: [
        'Automated Reporting: COA-compliant RPCPPE generation',
        'Digital Workflow (ICS/PAR): Secure digital signature workflows',
        'Batch Asset Realization: Automated bulk acquisition engine',
        'Financial Intelligence: Automated depreciation and lifecycle tracking',
        'Geospatial Tracking: Coordinate-based asset location monitoring',
      ],
      impact: [
        'Audit Accuracy: Achieved 100% compliance with national COA standards',
        'Process Optimization: Reduced asset realization time from days to under 15 minutes',
        'Accountability: Enhanced property accountability with immutable audit logs',
      ],
      tags: ['Django', 'Postgres', 'Docker', 'ReportLab (PDF)', 'Geolocation'],
      color: 'from-purple-600 to-pink-600',
      icon: '⚙️',
      link: 'https://gamit-sspmo.up.edu.ph',
      thumbnail: '/projects/gamit-asset-core.png',
      category: 'enterprise',
    },
    {
      slug: 'lipad-logistics',
      title: 'LIPAD: Precision Travel & GFA Management',
      role: 'Backend Logic Specialist & Architect',
      description: 'Enterprise travel management system that streamlines flight bookings and official travel authorizations.',
      longDescription: 'LIPAD is an enterprise travel management system that streamlines flight bookings and official travel authorizations. It bridges the gap between administrative requests and procurement through a rigorous, multi-tier approval hierarchy.',
      features: [
        'Multi-Passenger Engine: Group travel and passenger record management',
        'Airline Credit Tracking: Real-time monitoring of budget allocations',
        'Multi-Tier Approval Workflow: Mission-critical approval chain with chief sign-off',
        'Financial Audit Logs: Detailed settlement tracking for flight transactions',
        'Automated Itineraries: Instant generation of travel vouchers',
      ],
      impact: [
        'Fiscal Control: Prevented unauthorized travel expenses by implementing hard-locks on credit balances',
        'Workflow Efficiency: Accelerated travel booking lifecycle by 60% through automated routing',
        'Data Integrity: Reduced booking errors with high-fidelity passenger record management',
      ],
      tags: ['Django', 'Postgres', 'Docker', 'Financial Audit Modules'],
      color: 'from-amber-500 to-orange-600',
      icon: '🕊️',
      link: 'https://lipad-sspmo.up.edu.ph',
      thumbnail: '/projects/lipad-logistics.png',
      category: 'enterprise',
    },
    {
      slug: 'suplay-inventory',
      title: 'SUPLAY: Virtual Store & Supply Ecosystem',
      role: 'Full-Stack Developer & UI/UX Designer',
      description: 'Sophisticated procurement and inventory system for common-use office supplies, serving as a "Virtual Store" for university departments.',
      longDescription: 'SUPLAY is a sophisticated procurement and inventory system for common-use office supplies. Functioning as a "Virtual Store" for university departments, it ensures transparent, efficient, and data-driven supply distribution.',
      features: [
        'Virtual Shopping Experience: E-commerce style interface for departmental requests',
        'APP Integration: Real-time tracking against departmental procurement plans',
        'Inventory Intelligence: FIFO batch management and reorder point alerts',
        'Performance Monitoring: Automated lead-time tracking for performance auditing',
        'Departmental Quotas: Allocation logic to ensure equitable resource distribution',
      ],
      impact: [
        'Supply Chain Visibility: Reduced emergency procurement by 30% through warehouse visibility',
        'Budgetary Compliance: Automated enforcement of APP with zero over-spending across 50+ units',
        'Logistical Optimization: Improvedfulfillment rates by 25% through FIFO analytics',
      ],
      tags: ['Django', 'Postgres', 'Docker', 'Chart.js (Analytics)', 'Inventory Engine'],
      color: 'from-emerald-500 to-teal-500',
      icon: '📦',
      link: 'https://suplay-sspmo-up.edu.ph',
      thumbnail: '/projects/suplay-inventory.png',
      category: 'enterprise',
    },
    {
      slug: 'ai-prompt-studio',
      title: 'AI Prompt Studio',
      role: 'Full-Stack Developer',
      description: 'A playground for testing and versioning AI prompts across multiple LLMs.',
      longDescription: 'AI Prompt Studio is a specialized tool for AI engineers to iterate, compare, and version-control prompts. It features a unified interface for testing against OpenAI, Anthropic, and local models via Ollama.',
      features: [
        'Multi-Provider Support: Test prompts against GPT-4, Claude 3, and Llama 3',
        'Parameter Tuning: Real-time control over temperature, top-p, and frequency penalties',
        'History & Branching: Save and revert to previous prompt versions like Git',
        'Exportable Templates: Generate code snippets for direct integration into apps',
      ],
      impact: [
        'Workflow Optimization: Reduced prompt engineering cycles by 50% for internal teams',
        'Cost Management: Integrated token usage tracking and estimation',
        'Collaboration: Shared prompt libraries for improved team consistency',
      ],
      tags: ['Next.js', 'OpenAI API', 'Supabase', 'Framer Motion'],
      color: 'from-cyan-500 to-blue-500',
      icon: '✨',
      link: '#',
      category: 'web-app',
    },
    {
      slug: 'neural-viz-dashboard',
      title: 'NeuralViz Analytics',
      role: 'Frontend Specialist',
      description: 'A high-performance visualization dashboard for monitoring neural network training metrics.',
      longDescription: 'NeuralViz is a real-time analytics dashboard designed for deep learning researchers. It provides low-latency visualizations of loss curves, weight distributions, and gradient flows during model training.',
      features: [
        'Real-time Streaming: WebSocket-based data feeds with minimal overhead',
        'Interactive Charts: Deep-zoom capabilities for high-frequency time-series data',
        'Multi-Run Comparison: Overlay multiple training runs for easy benchmarking',
        'GPU Monitoring: Integrated telemetry for hardware utilization and thermal states',
      ],
      impact: [
        'Debugging Speed: Accelerated identification of vanishing gradients and model divergence',
        'Insight Generation: Intuitive visualization of complex network internal states',
        'Accessibility: Simplified expert-level diagnostics for non-specialist stakeholders',
      ],
      tags: ['TypeScript', 'Three.js', 'Socket.io', 'D3.js'],
      color: 'from-rose-500 to-orange-500',
      icon: '📊',
      link: '#',
      category: 'web-app',
    },
  ],
  skills: [
    {
      title: 'AI & Intelligence',
      icon: '🧠',
      skills: ['OpenAI API', 'LangChain', 'Vector Databases', 'Prompt Engineering', 'AI Automation', 'Model Fine-tuning'],
    },
    {
      title: 'Full-Stack',
      icon: '⚡',
      skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Python / Django', 'HTMX / Alpine.js', 'REST Framework'],
    },
    {
      title: 'Architecture',
      icon: '🏗️',
      skills: ['Multi-tenancy', 'RBAC / Security', 'System Design', 'API Design', 'DB Optimization', 'Microservices'],
    },
    {
      title: 'Infrastructure',
      icon: '🛠️',
      skills: ['Docker', 'Railway / Vercel', 'Gunicorn / Nginx', 'CI/CD Pipelines', 'Linux Admin', 'Whitenoise'],
    },
  ],
  achievements: [
    {
      title: 'DxLabs: AI for Institutional Transformation',
      year: '2026',
      description: 'Pioneer batch graduate of the UP System elite program, specializing in the strategic integration of Agentic AI into institution-wide workflows.',
      icon: '🧪',
    },
    {
      title: 'ISO & Data Champion',
      year: '2025',
      description: 'Appointed as the official lead for Data Integrity and Quality Standards for the UP System SSPMO.',
      icon: '🏆',
    },
    {
      title: 'Gov-Tech Modernization',
      year: '2024',
      description: 'Successfully modernized 5+ critical government workflows, reducing processing time by over 60%.',
      icon: '🚀',
    },
    {
      title: 'Open Source Contributor',
      year: '2023',
      description: 'Active contributor to various Django and HTMX ecosystem projects and local developer communities.',
      icon: '🌟',
    },
  ],
  events: [
    {
      title: 'Automating UP System Workflows',
      date: 'March 2026',
      description: 'Culminating workshop for the DxLabs program, demonstrating strategic AI Agent implementations for institutional tasks.',
      category: 'Workshop',
    },
    {
      title: 'Digitalization Roadmap Summit',
      date: 'Dec 2024',
      description: 'Presented the SPMO Suite ecosystem to UP System administrators and stakeholders.',
      category: 'Speaking',
    },
    {
      title: 'Global Career Hub Launch',
      date: 'Sept 2024',
      description: 'Launched PhMedtech-Europe LMS, facilitating career transitions for health professionals.',
      category: 'Launch',
    },
    {
      title: 'AI in Governance Workshop',
      date: 'May 2024',
      description: 'Led a workshop on integrating LLMs into administrative workflows for office managers.',
      category: 'Workshop',
    },
  ],
};
