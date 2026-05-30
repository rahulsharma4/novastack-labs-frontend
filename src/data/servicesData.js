export const servicesData = [
  {
    id: "website-dev",
    title: "Custom Website Development",
    icon: "Globe",
    shortDesc: "High-performance websites that boost brand value and capture customers.",
    longDesc: "We design and build bespoke marketing websites tailored to convey authority and drive user conversions. Using Next.js, we deliver fast, SEO-optimized static and dynamic sites that score 95+ on Lighthouse audits.",
    features: ["Responsive layouts", "Tailwind CSS styling", "Lighthouse optimization", "Interactive micro-interactions"],
    architecture: "Static Site Generation (SSG) with ISR (Incremental Static Regeneration) on Edge networks.",
    benefits: "Faster loading times (under 1.5s LCP), leading to higher Google rankings and higher conversion rates."
  },
  {
    id: "web-apps",
    title: "Web Application Development",
    icon: "Cpu",
    shortDesc: "Scalable interactive web applications using React and robust APIs.",
    longDesc: "Our team builds custom web portals, dashboard panels, and client portals with clean code guidelines. We construct complex application states using optimized React flows connecting to high-speed endpoints.",
    features: ["Global state management", "Secure JWT authentication", "RESTful API mappings", "Interactive data charts"],
    architecture: "Single Page Application architecture with secure JSON Web Token authorization layers.",
    benefits: "Centralizes business processes, reducing staff manual workloads by up to 40%."
  },
  {
    id: "saas-platforms",
    title: "SaaS Platform Development",
    icon: "Layers",
    shortDesc: "Multi-tenant software architectures built to support millions of subscribers.",
    longDesc: "We build modern software-as-a-service platforms from scratch. We handle tenant onboarding, subscription tiers, Stripe billing integrations, and separate tenant data schemas.",
    features: ["Multi-tenant isolation", "Stripe subscription engine", "Usage metrics dashboards", "Automated email updates"],
    architecture: "Logical database separation using MongoDB sub-documents or multiple PostgreSQL databases.",
    benefits: "Enables subscription business models to scale to millions in ARR without database lockups."
  },
  {
    id: "crm-systems",
    title: "CRM System Development",
    icon: "Users",
    shortDesc: "Custom customer relationship suites built for your business workflow.",
    longDesc: "Avoid expensive monthly license costs of third-party CRMs. We construct custom relationship software that tracks clients, logs sales activities, and generates automated reminders.",
    features: ["Customer profiles tracking", "Deal pipeline visual board", "Activity logging", "Reports generation"],
    architecture: "Mongoose database models paired with automated background triggers in Node.js.",
    benefits: "Saves up to $80/user monthly compared to Salesforce while fitting your exact internal workflow."
  },
  {
    id: "erp-systems",
    title: "ERP System Development",
    icon: "Briefcase",
    shortDesc: "Integrated operational suites coordinating inventory, logistics, and payroll.",
    longDesc: "Connect your departments into a single source of truth. We engineer ERP platforms that handle real-time inventory updates, supplier communication logs, and internal accounting processes.",
    features: ["Inventory control boards", "Supplier tracking portal", "Payroll & invoices generation", "Audit trail logs"],
    architecture: "Relational database transactions (PostgreSQL) guaranteeing strict ACID compliance.",
    benefits: "Eliminates double bookings and data entry errors across different departments completely."
  },
  {
    id: "healthcare-solutions",
    title: "Healthcare Software Solutions",
    icon: "ShieldAlert",
    shortDesc: "HIPAA-compliant, highly secure digital health systems for clinics and patients.",
    longDesc: "We build secure medical portals, booking tools, and diagnostic records indexes. Security is prioritized with audit logs, database row encryption, and SSL pipelines.",
    features: ["Secure diagnostic archives", "Patient scheduling logs", "Doctor calendars", "Encrypted document sharing"],
    architecture: "AES-256 encrypted database backups hosted on HIPAA-certified AWS instance configurations.",
    benefits: "Guarantees 100% compliance with data privacy laws, removing penalty risks for healthcare providers."
  },
  {
    id: "ecommerce-dev",
    title: "E-commerce Development",
    icon: "ShoppingBag",
    shortDesc: "Headless e-commerce stores achieving fast loads and high mobile checkouts.",
    longDesc: "Standard stores suffer from mobile page load lag. Our headless configurations load instantly, boosting search results positions and decreasing checkout abandonment rates.",
    features: ["Headless storefront checkouts", "Inventory sync APIs", "Coupon and promo tools", "Stripe direct gateway"],
    architecture: "Next.js frontend calling optimized inventory APIs, utilizing Stripe API webhook callbacks.",
    benefits: "Improves conversion rates by up to 35% compared to monolithic Shopify/WooCommerce platforms."
  },
  {
    id: "ai-integration",
    title: "AI Integration Services",
    icon: "Sparkles",
    shortDesc: "Enrich your digital products with secure AI, search, and chat modules.",
    longDesc: "We integrate Large Language Models (LLMs) into your active portals. This includes customer support chat systems, automated contract analyses, and smart search integrations.",
    features: ["OpenAI LLM connectors", "Vector embeddings indexing", "Semantic search fields", "Smart agent automation"],
    architecture: "LangChain frameworks parsing text to index into pgvector or MongoDB Atlas vector indexes.",
    benefits: "Automates up to 60% of customer support queries, significantly reducing operational expenses."
  },
  {
    id: "react-native-apps",
    title: "React Native Mobile Apps",
    icon: "Smartphone",
    shortDesc: "Native iOS and Android mobile apps written from a single clean codebase.",
    longDesc: "Deploy your application directly to App Store and Google Play using React Native. We write high-speed, interactive applications sharing over 80% logic with your web codebase.",
    features: ["Cross-platform iOS/Android", "Offline support caching", "Push notifications integrations", "Camera & GPS hookups"],
    architecture: "React Native components calling secure Node/Express backend APIs.",
    benefits: "Cuts app development costs and times in half while maintaining premium native feel."
  },
  {
    id: "seo-services",
    title: "Technical SEO Optimization",
    icon: "TrendingUp",
    shortDesc: "Improve search positions with Lighthouse speed optimization and schemas.",
    longDesc: "A pretty website is useless if nobody can find it. We optimize your page loading structures, tag configurations, site maps, and JSON-LD schema layouts to dominate search rankings.",
    features: ["Core Web Vitals checks", "JSON-LD schema markup", "Dynamic sitemap indexing", "Speed caching updates"],
    architecture: "Next.js metadata configurations rendering crawlable layouts directly to search engines.",
    benefits: "Increases organic traffic by up to 200% within 6 months of implementation."
  },
  {
    id: "maintenance",
    title: "Website Maintenance & Support",
    icon: "Settings",
    shortDesc: "Uptime monitoring, packages updates, and priority bug resolution support.",
    longDesc: "Ensure your corporate portal is online 24/7. We monitor uptime, install security patches, optimize databases periodically, and fix layout bugs within hours.",
    features: ["Uptime monitoring hooks", "Dependency version upgrades", "Regular database backup cycles", "Priority bug resolution"],
    architecture: "Automated status indicators firing Slack and email alerts on downtime detections.",
    benefits: "Provides total peace of mind, ensuring customers never hit broken pages or security warnings."
  },
  {
    id: "cloud-deployment",
    title: "Cloud Deployment & DevOps",
    icon: "Cloud",
    shortDesc: "Configure stable VPS servers, Docker containers, and CI/CD pipelines.",
    longDesc: "We move your applications to AWS, DigitalOcean, or private VPS setups. We write Dockerfiles, configure reverse proxies (Nginx), deploy via PM2, and set up automatic deployments on commits.",
    features: ["Docker image pipelines", "Nginx server mappings", "PM2 process manager setups", "GitHub Actions CI/CD"],
    architecture: "Nginx reverse proxy routing web requests to Node.js applications managed by PM2.",
    benefits: "Guarantees zero-downtime rolling updates and minimizes server hosting costs."
  }
];
