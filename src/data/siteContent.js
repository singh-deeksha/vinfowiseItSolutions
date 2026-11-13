import {
  CodeXml,
  MonitorSmartphone,
  Smartphone,
  Layers,
  Cloud,
  Workflow,
  TestTubeDiagonal,
  Bot,
  BriefcaseBusiness,
  Users,
  ShieldCheck,
  Gauge,
  Rocket,
  Earth,
  Target,
  Building2,
  HeartPulse,
  LockKeyhole,
  Sparkles,
  ShoppingCart,
  Activity,
  BadgeCheck,
  Database,
  MessageSquareText,
  PhoneCall,
  CircleCheck,
} from 'lucide-react';

export const company = {
  name: "Vinfowise IT Solutions",
  industry: "IT Services, Software Development, Web Development, Automation, and Digital Solutions",
  tagline: "Empowering businesses through scalable digital solutions.",
  email: "singhdeeksha2426@gmail.com",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  address: "Mohali, Chandigarh - remote and in-person consultations by appointment",
  serviceArea: "Mohali, Chandigarh",
  owner: "Deeksha Singh",
  coOwner: "Akshay Chandla",
  responseTime: "Average response time within 24 business hours",
  businessHours: "Monday to Friday, 9:00 AM - 6:00 PM",
  social: {
    LinkedIn: "https://linkedin.com",
    Instagram: "https://instagram.com",
    Facebook: "https://facebook.com",
  },
};

export const defaultWhatsAppMessage = "Hi Vinfowise, I want to discuss a website/software project.";

export const getWhatsAppUrl = (message = defaultWhatsAppMessage, phone = company.whatsapp) => {
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
  const text = encodeURIComponent(message);
  return cleanPhone
    ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`
    : `https://api.whatsapp.com/send?text=${text}&app_absent=0`;
};

export const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Insights", path: "/insights" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

export const metrics = [
  { value: "24h", label: "Typical response time" },
  { value: "100%", label: "Custom project planning" },
  { value: "Full-cycle", label: "Design to deployment" },
  { value: "Remote-ready", label: "Flexible delivery model" },
];

export const services = [
  {
    title: "Software Development",
    slug: "software-development",
    path: "/software-development",
    icon: CodeXml,
    summary: "Custom business applications, dashboards, and digital tools built around real operational needs.",
    features: ["Requirement planning", "Clean architecture", "Scalable codebase"],
  },
  {
    title: "Web Development",
    slug: "web-development",
    path: "/web-development",
    icon: MonitorSmartphone,
    summary: "Professional websites, landing pages, portals, and responsive web apps for modern businesses.",
    features: ["Responsive UI", "SEO foundations", "Fast loading pages"],
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    path: "/mobile-app-development",
    icon: Smartphone,
    summary: "Mobile app planning and development for customer-facing and internal business workflows.",
    features: ["Android and iOS planning", "Secure login flows", "API integration"],
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    path: "/ui-ux-design",
    icon: Layers,
    summary: "Clean, conversion-focused interfaces that make websites and applications easier to use.",
    features: ["Modern layouts", "Interactive prototypes", "User-friendly flows"],
  },
  {
    title: "Cloud Solutions",
    slug: "cloud-solutions",
    path: "/cloud-solutions",
    icon: Cloud,
    summary: "Deployment support, hosting setup, cloud-ready architecture, and performance improvements.",
    features: ["Hosting guidance", "Cloud deployment", "Monitoring basics"],
  },
  {
    title: "Automation",
    slug: "automation",
    path: "/automation",
    icon: Workflow,
    summary: "Business workflow automation to reduce repetitive manual work and improve team efficiency.",
    features: ["Process mapping", "CRM workflows", "Task automation"],
  },
  {
    title: "QA Testing",
    slug: "qa-testing",
    path: "/qa-testing",
    icon: TestTubeDiagonal,
    summary: "Manual and automation testing support to catch issues before your users do.",
    features: ["Functional testing", "Regression checks", "Bug reporting"],
  },
  {
    title: "AI Solutions",
    slug: "ai-solutions",
    path: "/ai-solutions",
    icon: Bot,
    summary: "Practical AI and chatbot solutions for support, lead capture, content, and workflow assistance.",
    features: ["AI chatbots", "Document assistance", "Automation strategy"],
  },
  {
    title: "IT Consulting",
    slug: "it-consulting",
    path: "/it-consulting",
    icon: BriefcaseBusiness,
    summary: "Technology planning and guidance for businesses choosing the right tools, platforms, and roadmap.",
    features: ["Project planning", "Technology selection", "Growth roadmap"],
  },
];

export const serviceInterestOptions = [
  "Website Development",
  "Web App Development",
  "Software Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "Business Automation",
  "AI Solutions",
  "AI Chatbot Development",
  "QA Testing",
  "Automation Testing",
  "Chrome Extension Development",
  "School Management Software",
  "CRM Development",
  "E-commerce Development",
  "Admin Panel Development",
  "API Development & Integration",
  "Database Design",
  "DevOps & Deployment",
  "SEO & Performance Optimization",
  "Website Maintenance",
  "IT Consulting",
  "Dedicated Developer Hiring",
  "Other IT Requirement",
];

export const serviceDetails = {
  "web-development": {
    title: "Web Development in Mohali Chandigarh",
    serviceTitle: "Web Development",
    hero: "Professional websites that build trust and generate inquiries.",
    description: "Vinfowise IT Solutions builds responsive business websites, landing pages, company profiles, and web applications for clients in Mohali, Chandigarh, and remote locations.",
    keywords: ["Business websites", "Landing pages", "SEO-ready structure", "Responsive design", "Inquiry forms", "Website redesign"],
    outcomes: ["Professional online presence", "Better lead capture", "Fast mobile experience", "Easy future updates"],
    cover: ["Business websites and landing pages", "Service detail pages and inquiry journeys", "SEO-ready content structure", "Performance and mobile optimization"],
    deliverables: ["Responsive website UI", "Validated contact forms", "Analytics-ready pages", "Vercel deployment setup"],
    stack: ["React", "Next.js", "Vite", "Tailwind CSS", "SEO foundations", "CMS-ready structure"],
  },
  "mobile-app-development": {
    title: "Mobile App Development for Business Workflows",
    serviceTitle: "Mobile App Development",
    hero: "Mobile experiences planned for customers, teams, and daily operations.",
    description: "We plan and build mobile app experiences for appointment booking, customer portals, school operations, service tracking, internal teams, and business workflows that need reliable access on phones.",
    keywords: ["Android planning", "iOS planning", "React Native", "Secure login", "Push notifications", "API integration"],
    outcomes: ["Better customer access", "Mobile-ready operations", "Secure account flows", "App roadmap clarity"],
    cover: ["App planning for Android and iOS", "Customer portals and booking flows", "Push notification planning", "API-connected mobile experiences"],
    deliverables: ["App screen flow", "Mobile UI prototype", "Authentication plan", "Backend integration roadmap"],
    stack: ["React Native planning", "Firebase", "REST APIs", "Push notifications", "Secure auth", "Cloud hosting"],
  },
  "ui-ux-design": {
    title: "UI UX Design for Websites and Software",
    serviceTitle: "UI/UX Design",
    hero: "Clean interfaces that help people understand, trust, and act faster.",
    description: "Vinfowise IT Solutions designs responsive website, dashboard, portal, and app interfaces with clear user journeys, practical layouts, and conversion-focused screens.",
    keywords: ["Wireframes", "Responsive layouts", "Dashboard UI", "Landing page design", "Design systems", "Interactive prototypes"],
    outcomes: ["Cleaner navigation", "Higher inquiry confidence", "Less user confusion", "Professional product feel"],
    cover: ["User journey mapping", "Wireframes and page layouts", "Dashboard and admin UI design", "Conversion-focused interface refinement"],
    deliverables: ["Responsive design layouts", "Prototype-ready screens", "Design system basics", "Developer handoff notes"],
    stack: ["Figma-ready systems", "Tailwind UI patterns", "Accessibility basics", "Responsive grids", "Component planning"],
  },
  "cloud-solutions": {
    title: "Cloud Solutions and Deployment Support",
    serviceTitle: "Cloud Solutions",
    hero: "Cloud-ready hosting, deployment, monitoring, and performance support.",
    description: "We help teams prepare applications for reliable hosting with practical cloud architecture, environment setup, domain configuration, CI/CD basics, and performance improvements.",
    keywords: ["AWS", "Vercel", "Docker", "CI/CD", "Monitoring", "Cloud deployment"],
    outcomes: ["Reliable deployments", "Faster release cycles", "Scalable infrastructure", "Cleaner production setup"],
    cover: ["Hosting and deployment planning", "Domain and environment setup", "CI/CD workflow basics", "Monitoring and performance readiness"],
    deliverables: ["Cloud deployment checklist", "Production environment setup", "Backup and monitoring plan", "Performance improvement notes"],
    stack: ["AWS", "Vercel", "Docker", "GitHub Actions", "PostgreSQL", "Monitoring basics"],
  },
  "software-development": {
    title: "Software Development in Mohali Chandigarh",
    serviceTitle: "Software Development",
    hero: "Custom software for workflows, dashboards, and business operations.",
    description: "We plan and build custom software solutions for businesses that need organized data, customer tracking, internal tools, reporting, and process management.",
    keywords: ["Custom dashboards", "Business applications", "Admin panels", "API integration", "Database design", "Workflow tools"],
    outcomes: ["Centralized data", "Less manual work", "Scalable foundation", "Cleaner team operations"],
    cover: ["Requirement discovery and feature mapping", "Database and API architecture", "Role-based admin dashboards", "Reports, exports, and integrations"],
    deliverables: ["Functional specification", "Responsive web app or dashboard", "Secure user flows", "Deployment-ready codebase"],
    stack: ["React", "Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  "automation": {
    title: "Business Automation in Mohali Chandigarh",
    serviceTitle: "Automation",
    hero: "Automation that reduces repetitive work and saves business time.",
    description: "Vinfowise IT Solutions helps businesses automate lead capture, follow-ups, reports, notifications, CRM steps, and routine digital workflows.",
    keywords: ["Lead automation", "CRM workflows", "Task reminders", "Email workflows", "Reporting automation", "Process optimization"],
    outcomes: ["Faster follow-ups", "Fewer missed tasks", "Better consistency", "Improved productivity"],
    cover: ["Lead capture and follow-up flows", "CRM and task automation", "Email and notification workflows", "Reporting and reminder systems"],
    deliverables: ["Workflow map", "Automation logic plan", "Notification templates", "Testing and handover notes"],
    stack: ["Zapier-style workflows", "Custom APIs", "Email automation", "CRM integrations", "Chrome extensions", "Scheduled jobs"],
  },
  "qa-testing": {
    title: "QA Testing and Automation Testing",
    serviceTitle: "QA Testing",
    hero: "Manual and automation testing that protects launch quality.",
    description: "Our QA support covers functional testing, regression checks, usability review, bug reporting, and automation planning so teams can ship with better confidence.",
    keywords: ["Manual testing", "Automation testing", "Selenium", "Playwright", "Regression testing", "Bug reports"],
    outcomes: ["Fewer production issues", "Better user experience", "Clear defect visibility", "Repeatable release checks"],
    cover: ["Manual functional testing", "Regression and smoke testing", "Form and responsive checks", "Automation testing planning"],
    deliverables: ["Test scenarios", "Bug reports with priority", "Regression checklist", "Release readiness summary"],
    stack: ["Selenium", "Playwright", "Cypress", "Manual QA", "Responsive QA", "Bug tracking"],
  },
  "ai-solutions": {
    title: "AI Solutions in Mohali Chandigarh",
    serviceTitle: "AI Solutions",
    hero: "Practical AI tools for support, leads, documents, and operations.",
    description: "We create practical AI and chatbot solutions that help businesses answer common questions, capture leads, summarize documents, and support daily workflows.",
    keywords: ["AI chatbots", "Lead capture bots", "Document assistance", "Support automation", "AI workflow planning", "Business AI tools"],
    outcomes: ["Quicker responses", "Better customer support", "Smarter workflows", "Modern digital experience"],
    cover: ["AI chatbot planning", "Knowledge-base assistants", "Lead qualification flows", "Document and workflow assistance"],
    deliverables: ["AI assistant flow", "Prompt and knowledge strategy", "Handoff to email or WhatsApp", "Safety and fallback rules"],
    stack: ["OpenAI API", "LangChain", "Embeddings planning", "Knowledge bases", "React chat UI", "Automation APIs"],
  },
  "it-consulting": {
    title: "IT Consulting and Digital Transformation",
    serviceTitle: "IT Consulting",
    hero: "Practical technology planning for smarter business decisions.",
    description: "We guide businesses through platform selection, software planning, automation roadmaps, AI adoption, and digital transformation decisions with a focus on realistic delivery.",
    keywords: ["Technology roadmap", "Digital transformation", "Platform selection", "Architecture planning", "Automation strategy", "AI adoption"],
    outcomes: ["Clear roadmap", "Reduced technical risk", "Better budget planning", "Future-ready systems"],
    cover: ["Technology roadmap planning", "Platform and tool selection", "Architecture review", "Digital transformation strategy"],
    deliverables: ["Discovery summary", "Recommended tech stack", "Budget and timeline guidance", "Phased implementation roadmap"],
    stack: ["System architecture", "Cloud planning", "Security basics", "AI adoption", "Process automation", "Product roadmap"],
  },
};

export const whyChooseUs = [
  {
    title: "Personal Attention",
    icon: Users,
    text: "Direct communication with the founders so project goals stay clear from start to finish.",
  },
  {
    title: "Secure Practices",
    icon: ShieldCheck,
    text: "NDA-friendly collaboration, privacy-aware workflows, and responsible handling of project data.",
  },
  {
    title: "Clear Delivery",
    icon: Gauge,
    text: "Practical timelines, visible milestones, and regular updates throughout the project.",
  },
  {
    title: "Scalable Solutions",
    icon: Rocket,
    text: "Clean foundations that can grow as your website, app, or business process expands.",
  },
  {
    title: "Remote Support",
    icon: Earth,
    text: "Flexible online collaboration for clients across locations and time zones.",
  },
  {
    title: "Cost-Effective Work",
    icon: Target,
    text: "Focused solutions designed around business value, not unnecessary complexity.",
  },
];

export const portfolioProjects = [
  {
    title: "Productivity Chrome Extension",
    category: "Chrome Extension",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=1400&q=85",
    metric: "Browser workflow support",
    description: "A Chrome extension concept for improving everyday browser workflows with quick actions, contextual tools, saved preferences, and lightweight automation.",
    challenge: "Users needed faster access to repeated browser actions without switching between multiple tools or dashboards.",
    solution: "A compact extension experience with a clean popup UI, background logic, persistent settings, and workflow shortcuts.",
    tools: ["Chrome APIs", "Popup UI", "Workflow shortcuts"],
  },
  {
    title: "School Management System",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=85",
    metric: "Organized academic operations",
    description: "A school management platform concept for handling student records, attendance, staff workflows, fee tracking, notices, and academic administration.",
    challenge: "School teams often manage students, attendance, fees, and communication across registers, spreadsheets, and separate messaging channels.",
    solution: "A centralized role-based system for administrators, teachers, and staff with organized records, daily updates, and reporting visibility.",
    tools: ["Student records", "Attendance flow", "Admin dashboard"],
  },
  {
    title: "Professional Services Website",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    metric: "Clear inquiry journey",
    description: "A responsive company website structure with service pages, inquiry forms, SEO foundations, and a direct contact path.",
    challenge: "The business needed a trustworthy online presence that explained services without confusing visitors.",
    solution: "A clean content hierarchy, mobile-first layouts, service detail pages, and validated lead forms.",
    tools: ["React UI", "SEO structure", "Responsive design"],
  },
  {
    title: "Lead Follow-up Automation",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=85",
    metric: "Faster lead response",
    description: "A workflow concept for capturing inquiries, assigning follow-up tasks, and sending timely WhatsApp or email reminders.",
    challenge: "Manual follow-ups were easy to miss when inquiries came from multiple channels.",
    solution: "A central lead flow with reminders, status tracking, and notification triggers for the sales team.",
    tools: ["CRM planning", "Email alerts", "Task automation"],
  },
  {
    title: "AI Support Assistant",
    category: "AI Solutions",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85",
    metric: "Faster query handling",
    description: "A support chatbot concept for answering common questions, capturing leads, and routing serious inquiries.",
    challenge: "Common customer questions took time away from high-value sales and support conversations.",
    solution: "An AI assistant flow for FAQs, lead qualification, service guidance, and handoff to WhatsApp or email.",
    tools: ["AI workflows", "Knowledge base", "Lead routing"],
  },
  {
    title: "Customer Operations Dashboard",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    metric: "Centralized visibility",
    description: "A dashboard concept for tracking customers, requests, files, reports, and project status in one place.",
    challenge: "Teams were switching between spreadsheets, messages, and files to understand customer status.",
    solution: "A role-based dashboard with request tracking, customer records, file references, and management reports.",
    tools: ["Admin panel", "Database design", "Reporting"],
  },
];

export const testimonials = [
  {
    quote: "Vinfowise helped us convert a rough idea into a clear software plan. The team asked practical questions, explained the trade-offs, and kept the delivery focused on what our staff actually needed.",
    name: "Amandeep Kaur",
    role: "Operations Head, Education Services",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "The automation suggestions were simple, realistic, and easy for our team to understand. Follow-ups became more organized and we stopped losing track of customer conversations.",
    name: "Rohit Mehta",
    role: "Sales Manager, Service Business",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "Their QA mindset was visible in every review. Small usability issues were caught early, forms were tested properly, and the final launch felt much more confident.",
    name: "Neha Sharma",
    role: "Founder, Digital Startup",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote: "We appreciated the honest technical planning. Vinfowise helped us avoid overbuilding, kept the scope practical, and still left room for future features.",
    name: "Harpreet Chawla",
    role: "Partner, Consulting Firm",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
];

export const caseStudies = [
  {
    title: "School Management Platform",
    metric: "40% faster daily record access",
    result: "Centralized student, attendance, fee, notice, and staff workflows for smoother daily administration.",
    details: "Designed around real school operations with separate flows for administrators, teachers, and office staff so routine academic work can be handled from one organized system.",
    category: "Software Development",
  },
  {
    title: "Ultimate Job Try Chrome Extension",
    metric: "Browser workflow made simpler",
    result: "A browser extension workflow that helps users move faster through job-search tasks and repeated browser actions.",
    details: "Built with Chrome extension APIs, popup UI, saved preferences, and lightweight automation patterns for a cleaner user experience inside Chrome.",
    category: "Chrome Extension",
  },
  {
    title: "US Appointment Booking Extension",
    metric: "Repeated booking steps reduced",
    result: "A focused browser automation tool for monitoring appointment flow and helping users complete repeated booking steps.",
    details: "Planned with careful QA checks, user-friendly controls, and responsible browser workflow support to improve consistency during appointment tasks.",
    category: "Automation",
  },
  {
    title: "Business Website and Inquiry Flow",
    metric: "Mobile-first enquiry journey",
    result: "Responsive website structure with service pages, validation, chatbot assistance, and direct enquiry capture.",
    details: "Improved the visitor journey from service discovery to project enquiry with cleaner navigation, better forms, and a practical Vini assistant flow.",
    category: "Web Development",
  },
];

export const industries = [
  { title: "Real Estate", icon: Building2 },
  { title: "Healthcare", icon: HeartPulse },
  { title: "FinTech", icon: LockKeyhole },
  { title: "SaaS", icon: Sparkles },
  { title: "E-commerce", icon: ShoppingCart },
  { title: "Logistics", icon: Activity },
  { title: "Education", icon: BadgeCheck },
  { title: "Enterprise", icon: Database },
];

export const devProcess = [
  "Discovery",
  "Planning",
  "UI/UX Design",
  "Development",
  "QA Testing",
  "Deployment",
  "Ongoing Support",
];

export const techStack = [
  "React",
  "Next.js",
  "Vite",
  "TypeScript",
  "Node.js",
  "Express.js",
  "Python",
  "FastAPI",
  "Tailwind CSS",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Supabase",
  "Firebase",
  "AWS",
  "Vercel",
  "Docker",
  "Kubernetes",
  "REST APIs",
  "GraphQL",
  "OpenAI API",
  "LangChain",
  "Selenium",
  "Playwright",
  "Cypress",
  "GitHub Actions",
  "Chrome Extensions",
  "PWA",
  "AI Automation",
];

export const engagementModels = [
  "Dedicated Developer Model",
  "Fixed Cost Projects",
  "Hourly Engagement",
  "Offshore Development Team",
];

export const teamMembers = [
  {
    name: "Deeksha Singh",
    leadershipRole: "CEO",
    specialty: "Manual and automation testing",
    bio: "My vision is simple: build something that matters, work with people who believe in it, and let our work speak for itself.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Akshay Chandla",
    leadershipRole: "COO",
    specialty: "Technology strategy and architecture",
    bio: "Great ideas create possibilities. Great execution turns them into reality.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Parwind Paswan",
    leadershipRole: "Co-founder",
    specialty: "Full stack development and AI solutions",
    bio: "Technology is more than writing code. It's about solving problems and creating possibilities.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
];

export const milestones = [
  { year: "2026", title: "Vinfowise IT Solutions brand prepared for professional IT service delivery" },
  { year: "Now", title: "Focused on websites, software, automation, AI support, and digital growth solutions" },
  { year: "Next", title: "Expanding verified portfolio, client testimonials, and long-term technology partnerships" },
];

export const blogPosts = [
  {
    slug: "how-ai-automation-is-reshaping-enterprise-operations",
    title: "How AI Automation Is Reshaping Enterprise Operations",
    tag: "AI & Automation",
    date: "May 2026",
    excerpt: "A practical look at where small teams and growing companies can use automation to save time.",
    content: "AI automation is no longer just for massive tech corporations. Small and mid-sized enterprises are adopting focused, high-impact automations across CRM syncing, lead response, routine reporting, and document analysis. By automating repetitive tasks, teams free up cognitive energy for strategy and high-touch customer relationships.",
  },
  {
    slug: "what-businesses-should-expect-from-a-modern-it-partner",
    title: "What Businesses Should Expect From a Modern IT Partner",
    tag: "Business Technology",
    date: "April 2026",
    excerpt: "Clear planning, responsible delivery, and communication habits that reduce project risk.",
    content: "Selecting an IT partner is an investment in your company's operational backbone. Modern partners prioritize transparent roadmaps, clean version-controlled code, proactive QA, and clear timelines over jargon and unnecessary complexity.",
  },
  {
    slug: "building-scalable-web-platforms-without-overengineering",
    title: "Building Scalable Web Platforms Without Overengineering",
    tag: "Engineering",
    date: "March 2026",
    excerpt: "A practical framework for balancing launch speed, clean code, and long-term maintainability.",
    content: "Overengineering is one of the most common causes of delayed digital launches. A pragmatic architectural approach emphasizes component reuse, strong typing, clean routing, and proven foundational libraries like React and Tailwind before adding premature microservices or complex state layers.",
  },
];

export const faqs = [
  ["Can you sign an NDA before project discussions?", "Yes. We support NDA-friendly discovery and secure collaboration for enterprise clients."],
  ["Do you work with clients outside your city?", "Yes. Vinfowise IT Solutions supports remote discovery, online meetings, and flexible project communication."],
  ["Can this website connect to a CMS later?", "Yes. The content is centralized so a CMS, admin panel, CRM, or API can be integrated later."],
  ["Which engagement model should we choose?", "We recommend dedicated teams for long-term products, fixed scope for defined builds, and hourly support for ongoing iteration."],
];

export const contactCards = [
  { label: "Email", value: company.email, icon: MessageSquareText, href: `mailto:${company.email}` },
  { label: "WhatsApp", value: company.phone, icon: PhoneCall, href: getWhatsAppUrl() },
  { label: "Office", value: company.address, icon: Building2 },
  { label: "Security", value: "NDA friendly, GDPR ready, data-protection focused", icon: CircleCheck },
];

export const viniAssistant = {
  botName: "Vini",
  botAvatar: "https://cdn-icons-png.flaticon.com/512/11260/11260829.png",
  botVideo: "https://cdn-icons-mp4.flaticon.com/512/11260/11260829.mp4",
  welcomeMessage: "Hi, I’m Vini, the intelligent business assistant for Vinfowise IT Solutions.\n\nI can help you understand services, choose the right solution, estimate project direction, and prepare a useful enquiry for websites, software, automation, AI, QA, cloud, mobile apps, and Chrome extensions.",
  suggestedPrompts: [
    "Which service should I choose?",
    "Show portfolio examples",
    "How long does a project take?",
    "Can you build Chrome extensions?",
  ],
};
