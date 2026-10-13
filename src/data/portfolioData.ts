export interface SkillItem {
  title: string;
  icon?: string;
  badge?: string;
  items: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  category: 'backend' | 'frontend' | 'cloud' | 'database' | 'security' | 'architecture' | 'tools' | 'soft-skills';
  icon: string;
  image: string;
  accentColor: string;
  skills: SkillItem[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Karl Mendoza',
    nickname: 'Karl',
    role: 'Technical Lead .NET Developer',
    subRoles: ['Technical Lead .NET Developer', 'Senior Software Engineer / Tech Lead', 'Enterprise .NET Specialist', 'Cloud Systems Architect', 'React Full-Stack Developer'],
    bio: `Allow me to introduce myself. I am Karl Mendoza, a Technical Lead and Senior Software Engineer with more than 10 years of hands-on experience designing, architecting, and delivering high-performance enterprise systems. With a natural passion for complex puzzles, algorithmic problem-solving, and mentoring high-performing engineering teams, I specialize in crafting robust C# / ASP.NET Core backends, event-driven microservices, high-throughput SQL architectures, and scalable cloud solutions on Microsoft Azure. Whether leading architectural decisions, untangling complex legacy codebases, designing resilient distributed architectures, or building responsive modern interfaces with React, I bring technical rigor, clean code principles, and an unwavering commitment to quality.`,
    cvUrl: '/cv/KarlMendozaCV_2026.pdf',
    avatar: '/images/Karl.jpg',
    avatarNoBg: '/images/karlnobg.png',
    location: 'Villamor, Pasay City, Metro Manila, Philippines',
    email: 'mendozajohnkarl@gmail.com',
    phone: '+63 977 049 3214',
    social: {
      github: 'https://github.com/dagz08',
      linkedin: 'https://www.linkedin.com/in/john-karl-mendoza-67ab73216/',
      facebook: 'https://www.facebook.com/dagz.o8',
      instagram: 'https://www.instagram.com/dagzzzzzzz/',
    },
    emailJs: {
      serviceId: 'service_8u7gzns',
      templateId: 'template_ohznp8p',
      publicKey: 'oWBQ2RmYdImLyX_2X',
    }
  },

  stats: [
    { label: 'Years of Experience', value: '10+', suffix: 'Years', icon: 'Clock', desc: 'Enterprise & freelance development' },
    { label: 'Delivered Projects', value: '30+', suffix: 'Projects', icon: 'Briefcase', desc: 'Web, desktop & cloud solutions' },
    { label: 'Coffee Consumed', value: '1,432+', suffix: 'Cups', icon: 'Coffee', desc: 'Fueling late-night architecture' },
    { label: 'Gaming Passion', value: 'Dota 2 & CS:GO', suffix: '', icon: 'Gamepad2', desc: 'Tactical team coordination' },
  ],

  services: [
    {
      title: 'Enterprise Web & API Development',
      badge: 'Core Expertise',
      description: 'End-to-end development of mission-critical web applications and high-throughput RESTful / Minimal APIs using ASP.NET Core (.NET 6–9), C#, and modern frontend integrations.',
      highlights: ['REST APIs & Minimal APIs', 'Microservices & Dependency Injection', 'Asynchronous & parallel processing', 'High concurrency & low latency'],
      icon: 'Server'
    },
    {
      title: 'Cloud Architecture & DevOps',
      badge: 'Azure Specialization',
      description: 'Architecting resilient, scalable cloud infrastructure on Microsoft Azure, incorporating containerization with Docker & AKS, and automated CI/CD pipelines.',
      highlights: ['Azure App Services & Functions', 'Service Bus & Event Grid', 'Docker & Kubernetes (AKS)', 'CI/CD Pipelines (Azure DevOps & GitHub Actions)'],
      icon: 'Cloud'
    },
    {
      title: 'Database & Performance Engineering',
      badge: 'High Performance',
      description: 'Complex relational database schema design, index tuning, advanced T-SQL optimization, and ORM performance engineering with EF Core and Dapper.',
      highlights: ['Advanced T-SQL & Stored Procedures', 'Execution plan analysis & index tuning', 'EF Core & Dapper optimizations', 'Transactions & high concurrency locking'],
      icon: 'Database'
    },
    {
      title: 'Desktop Apps & System Integration',
      badge: 'Systems Engineering',
      description: 'Specialized desktop solutions and hardware-software integrations such as RFID attendance systems, payroll automation, and distributed reporting tools.',
      highlights: ['Hardware RFID & Sensor integrations', 'Automated payroll & accounting tools', 'Custom Windows desktop applications', 'Legacy system modernization'],
      icon: 'Cpu'
    }
  ],

  skillCategories: [
    {
      id: 'dotnet-backend',
      title: '.NET & Programming Expertise',
      subtitle: 'Modern C# & Enterprise ASP.NET Core',
      category: 'backend',
      icon: 'Code2',
      image: '/images/NetCore.png',
      accentColor: '#9333ea',
      skills: [
        {
          title: 'C# Mastery',
          icon: 'Terminal',
          items: [
            'Advanced C# (Generics, Delegates, Events, LINQ, Task Parallel Library)',
            'Asynchronous, multithreading & parallel programming (async/await)',
            'Memory management, value types, reference types, and garbage collection optimization'
          ]
        },
        {
          title: '.NET Ecosystem & Frameworks',
          icon: 'Layers',
          items: [
            '.NET 6, 7, 8 and 9 / .NET Core runtime architecture',
            'ASP.NET Core (REST APIs, MVC, Minimal APIs, Custom Middleware)',
            'Built-in Dependency Injection (IoC Container lifetimes & best practices)',
            'Enterprise .NET Microservices architectures'
          ]
        },
        {
          title: 'Data Access & ORM',
          icon: 'Database',
          items: [
            'Entity Framework Core (Code-First & Database-First, Change Tracking, Compiled Queries)',
            'Dapper (High-performance micro-ORM for mission-critical queries)',
            'ADO.NET low-level data streaming and batch operations'
          ]
        },
        {
          title: 'Design Principles & Patterns',
          icon: 'ShieldCheck',
          items: [
            'SOLID principles, Clean Code craftsmanship, DRY, KISS',
            'Gang of Four Design Patterns (Factory, Singleton, Strategy, Observer, Decorator)',
            'CQRS (Command Query Responsibility Segregation) & MediatR pattern',
            'Repository & Unit of Work patterns'
          ]
        }
      ]
    },

    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps Engineering',
      subtitle: 'Microsoft Azure & CI/CD Automation',
      category: 'cloud',
      icon: 'Cloud',
      image: '/images/AzureDevops.png',
      accentColor: '#0284c7',
      skills: [
        {
          title: 'Azure Cloud Services',
          icon: 'CloudLightning',
          items: [
            'Azure App Services & Serverless Azure Functions',
            'Azure Storage (Blob, Table, Queue Storage) & Cosmos DB',
            'Azure SQL Database configuration, failover, and scaling',
            'Azure Key Vault secret and certificate management'
          ]
        },
        {
          title: 'Messaging & Event Streaming',
          icon: 'Radio',
          items: [
            'Azure Service Bus (Queues & Topics/Subscriptions, Dead-letter handling)',
            'Azure Event Grid & Azure Event Hub for high-throughput event processing'
          ]
        },
        {
          title: 'Containers & Infrastructure',
          icon: 'Box',
          items: [
            'Docker containerization for multi-service applications',
            'Azure Kubernetes Service (AKS) deployment & pod orchestration',
            'Infrastructure as Code (IaC) using ARM templates & Terraform'
          ]
        },
        {
          title: 'CI/CD & Observability',
          icon: 'Activity',
          items: [
            'Azure DevOps (Repos, Pipelines, Artifacts, Boards)',
            'GitHub Actions automated build, test & deploy pipelines',
            'Observability: Azure Monitor, Application Insights, Log Analytics & telemetry'
          ]
        }
      ]
    },

    {
      id: 'database-sql',
      title: 'Database Technologies & Optimization',
      subtitle: 'Microsoft SQL Server & Data Architecture',
      category: 'database',
      icon: 'Database',
      image: '/images/SqlServer.png',
      accentColor: '#dc2626',
      skills: [
        {
          title: 'Advanced T-SQL',
          icon: 'FileCode',
          items: [
            'Complex T-SQL queries, joins, subqueries, CTEs, and window functions',
            'High-efficiency Stored Procedures, User-Defined Functions, and Triggers',
            'Parameterized queries and SQL injection prevention'
          ]
        },
        {
          title: 'Performance Tuning & Indexing',
          icon: 'TrendingUp',
          items: [
            'Clustered & Non-clustered indexing strategies, Columnstore indexes',
            'Execution plan analysis, Query Store, and SQL Server Profiler',
            'Deadlock detection, isolation levels, concurrency handling & locking mechanisms'
          ]
        },
        {
          title: 'Data Modeling & Administration',
          icon: 'HardDrive',
          items: [
            'Relational schema design, Normalization (1NF-3NF) vs strategic Denormalization',
            'Code-First and Database-First migrations via EF Core',
            'Backup, restore, disaster recovery strategies, and data auditing'
          ]
        }
      ]
    },

    {
      id: 'software-architecture',
      title: 'Software & Systems Architecture',
      subtitle: 'Distributed Systems & Clean Architecture',
      category: 'architecture',
      icon: 'Network',
      image: '/images/CSharp.png',
      accentColor: '#10b981',
      skills: [
        {
          title: 'Architectural Styles',
          icon: 'GitBranch',
          items: [
            'Clean Architecture, Onion Architecture, Hexagonal / Ports & Adapters',
            'Microservices Architecture with domain isolation',
            'Event-Driven Architecture & asynchronous pub/sub messaging patterns'
          ]
        },
        {
          title: 'Domain-Driven Design (DDD)',
          icon: 'FolderTree',
          items: [
            'Domain Modeling: Aggregates, Entities, Value Objects, Domain Events',
            'Bounded Contexts and Context Mapping',
            'Rich Domain Models vs Anemic Domain Models'
          ]
        },
        {
          title: 'Distributed System Resiliency',
          icon: 'Cpu',
          items: [
            'API Gateways (Ocelot, YARP, Azure API Management)',
            'Distributed caching (Redis), Circuit Breaker & Retry policies (Polly)',
            'Eventual consistency and idempotent message handling'
          ]
        }
      ]
    },

    {
      id: 'api-security',
      title: 'API Security & Integration',
      subtitle: 'Authentication, Authorization & Hardening',
      category: 'security',
      icon: 'Shield',
      image: '/images/Postman.png',
      accentColor: '#f59e0b',
      skills: [
        {
          title: 'Identity & Authentication',
          icon: 'Key',
          items: [
            'OAuth 2.0 and OpenID Connect (OIDC) protocols',
            'JSON Web Tokens (JWT) creation, signing, validation & refresh rotation',
            'Role-Based Access Control (RBAC) and Claims-Based Authorization policies'
          ]
        },
        {
          title: 'API Hardening & Protection',
          icon: 'Lock',
          items: [
            'API Gateway Security policies & IP whitelisting',
            'Rate Limiting, Throttling & anti-abuse protections',
            'Strict Request sanitization, input validation & Cross-Site Scripting (XSS) guards',
            'HTTPS, CORS policies, TLS encryption & security header management'
          ]
        }
      ]
    },

    {
      id: 'frontend-development',
      title: 'Front-End Web Development',
      subtitle: 'React, Angular & Modern Web Technologies',
      category: 'frontend',
      icon: 'Monitor',
      image: '/images/ReactAngular.png',
      accentColor: '#06b6d4',
      skills: [
        {
          title: 'React Ecosystem',
          icon: 'Sparkles',
          items: [
            'React (v18+) functional components, Hooks & custom Hooks',
            'State management: Context API, Redux Toolkit, Zustand, React Query / TanStack',
            'React Router, React Hook Form, and controlled/uncontrolled inputs',
            'Performance optimizations (useMemo, useCallback, React.memo, lazy loading)',
            'Robust React + ASP.NET Core API integration patterns'
          ]
        },
        {
          title: 'Modern TypeScript & Tooling',
          icon: 'FileCode2',
          items: [
            'TypeScript strongly-typed frontend architectures & strict interfaces',
            'Modern ES6+ JavaScript (async/await, modules, destructuring, promises)',
            'Vite and Webpack bundling, hot-module replacement & build optimization'
          ]
        },
        {
          title: 'Angular Framework',
          icon: 'Layers',
          items: [
            'Angular (v16+) components, services & dependency injection',
            'RxJS Observables, subjects & reactive data streams',
            'Reactive Forms, route guards, and NgRx state management'
          ]
        },
        {
          title: 'UI/UX & Styling',
          icon: 'Palette',
          items: [
            'Tailwind CSS, SCSS, CSS3 Grid & Flexbox responsive design',
            'Material UI, Bootstrap, Lucide icons, glassmorphism & modern dark themes',
            'WCAG accessibility standards and cross-browser responsiveness'
          ]
        }
      ]
    },

    {
      id: 'tools-workflow',
      title: 'Tools & Development Workflow',
      subtitle: 'Version Control, IDEs & Agile Tooling',
      category: 'tools',
      icon: 'Wrench',
      image: '/images/Git.png',
      accentColor: '#ec4899',
      skills: [
        {
          title: 'Source Control & Collaboration',
          icon: 'GitPullRequest',
          items: [
            'Git (Branching strategies, Gitflow, pull requests, rebase, merge conflict resolution)',
            'TortoiseSVN for legacy version-controlled enterprise repositories',
            'GitHub & Azure DevOps integrated repositories'
          ]
        },
        {
          title: 'IDEs & Productivity Tools',
          icon: 'Terminal',
          items: [
            'Visual Studio Enterprise, VS Code, JetBrains Rider',
            'Postman for API design, documentation & automated regression test collections',
            'Docker Desktop, Azure Storage Explorer, SQL Server Management Studio (SSMS)'
          ]
        },
        {
          title: 'Agile & Project Management',
          icon: 'Kanban',
          items: [
            'Jira Software, Azure Boards, sprint planning & backlog grooming',
            'Continuous documentation and pull request review workflows'
          ]
        }
      ]
    },

    {
      id: 'professional-soft-skills',
      title: 'Professional Leadership & Soft Skills',
      subtitle: 'Collaboration, Mentorship & Ownership',
      category: 'soft-skills',
      icon: 'Users',
      image: '/images/SoftSkills.png',
      accentColor: '#14b8a6',
      skills: [
        {
          title: 'Leadership & Engineering Culture',
          icon: 'Award',
          items: [
            'Technical mentorship for junior and mid-level software engineers',
            'High-standard Code Reviews promoting architectural consistency and clean code',
            'Full accountability and end-to-end ownership of project deliverables'
          ]
        },
        {
          title: 'Problem-Solving & Delivery',
          icon: 'Compass',
          items: [
            'Analytical thinking and complex debugging under production constraints',
            'Scrum & Agile sprint participation and cross-functional team coordination',
            'Clear technical articulation between developers, stakeholders, and business clients'
          ]
        }
      ]
    }
  ]
};
