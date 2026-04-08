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
  thumbnail?: string; // Optional image field
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

export interface PortfolioData {
  identity: {
    name: string;
    nickname: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    github: string;
    linkedin: string;
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
}

export const portfolioData: PortfolioData = {
  identity: {
    name: 'Aaron Christian Basa',
    nickname: 'Aaron',
    firstName: 'Aaron',
    lastName: 'Basa',
    title: 'Full-Stack Developer + AI Specialist',
    email: 'aaronchristianbasa@gmail.com',
    github: 'https://github.com/aaron-basa',
    linkedin: 'https://linkedin.com/in/aaron-basa',
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
      { icon: '🎓', title: 'Education', desc: 'BS IT' },
      { icon: '📍', title: 'Location', desc: 'Manila, PH' },
      { icon: '💼', title: 'Focus', desc: 'Full-Stack / AI' },
      { icon: '🌐', title: 'Languages', desc: 'EN / FIL' },
    ],
  },
  experience: [
    {
      role: 'Junior Office Manager',
      company: 'University of the Philippines System (SPMO / OVPA)',
      period: '2024 – Present',
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
      period: '2023 – 2024',
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
};
