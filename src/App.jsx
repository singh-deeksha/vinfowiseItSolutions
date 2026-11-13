import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import Button from './components/Button.jsx';
import CommandCenterCard from './components/CommandCenterCard.jsx';
import FloatingWidgets from './components/FloatingWidgets.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import SEO from './components/SEO.jsx';
import { useSiteContent } from './context/SiteContentContext.jsx';

const sectionClass = 'container-wide section-pad';
const cardClass = 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900';

function PageTitle({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">{eyebrow}</p>}
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">{title}</h1>
      {description && <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">{description}</p>}
    </div>
  );
}

function HomePage() {
  const { company, metrics, services, portfolioProjects, teamMembers, whyChooseUs } = useSiteContent();

  return (
    <>
      <SEO title="Home" description={company.tagline} />
      <section className="overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-24 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/40">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-400/20 dark:bg-white/5 dark:text-blue-200">
              <span className="size-2 rounded-full bg-emerald-500" />
              Digital solutions for growing businesses
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl dark:text-white">
              Build smarter. <span className="text-blue-600 dark:text-blue-400">Grow faster.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {company.tagline} From custom software and websites to automation and AI, we turn practical ideas into dependable digital products.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">Start a project</Button>
              <Button to="/services" variant="secondary">Explore services</Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <MapPin size={17} className="text-blue-600 dark:text-blue-400" />
              Serving Mohali, Chandigarh, and remote clients
            </div>
          </div>
          <CommandCenterCard />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900/50">
        <div className="container-wide grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {metrics.map(metric => (
            <div key={metric.label}>
              <p className="text-2xl font-black text-slate-950 dark:text-white">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <PageTitle eyebrow="What we do" title="Technology that moves your business forward" description="A practical, end-to-end partner for planning, building, and improving your digital products." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map(service => {
            const Icon = service.icon;
            return (
              <Link key={service.slug} to={service.path} className={`${cardClass} group transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-400/40`}>
                <Icon size={28} className="text-blue-600 dark:text-blue-400" />
                <h2 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{service.title}</h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{service.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">Learn more <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center"><Button to="/services" variant="secondary">View all services</Button></div>
      </section>

      <section className="bg-slate-50 dark:bg-white/[0.03]">
        <div className={sectionClass}>
          <PageTitle eyebrow="Why Vinfowise" title="A clear path from idea to launch" description="Direct communication, thoughtful engineering, and reliable delivery keep your project focused on what matters." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map(item => {
              const Icon = item.icon;
              return <article className={cardClass} key={item.title}><Icon className="text-blue-600 dark:text-blue-400" size={25} /><h2 className="mt-4 font-bold text-slate-950 dark:text-white">{item.title}</h2><p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{item.text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <PageTitle eyebrow="Selected work" title="Solutions built around real needs" description="Explore examples of software, automation, and web experiences designed to make work simpler." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.slice(0, 3).map(project => (
            <article key={project.title} className={`${cardClass} overflow-hidden p-0`}>
              <img src={project.image} alt="" className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">{project.category}</p><h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{project.title}</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{project.description}</p></div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center"><Button to="/portfolio" variant="secondary">Explore portfolio</Button></div>
      </section>

      <section className="bg-slate-50 dark:bg-white/[0.03]">
        <div className={sectionClass}>
          <PageTitle eyebrow="Our people" title="A team invested in your success" description="Meet the people bringing thoughtful planning, engineering, and quality assurance to every project." />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
            {teamMembers.map(member => (
              <article key={member.name} className={`${cardClass} text-center`}>
                <img src={member.image} alt={member.name} className="mx-auto size-24 rounded-full object-cover" loading="lazy" />
                <h2 className="mt-4 font-bold text-slate-950 dark:text-white">{member.name}</h2>
                <p className="mt-1 text-sm font-medium text-blue-700 dark:text-blue-300">{member.title || member.leadershipRole}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{member.specialty}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

function ServicesPage() {
  const { services, serviceDetails } = useSiteContent();
  return (
    <>
      <SEO title="Services" description="Explore software, web, mobile, AI, automation, QA, cloud, and consulting services from Vinfowise IT Solutions." />
      <main className={sectionClass}>
        <PageTitle eyebrow="Our services" title="The right technology for your next step" description="Flexible services to help you launch a new product, improve operations, or modernize existing systems." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map(service => {
            const Icon = service.icon;
            const detail = serviceDetails[service.slug];
            return <article key={service.slug} className={cardClass}><Icon className="text-blue-600 dark:text-blue-400" size={28} /><h2 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">{service.title}</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{detail?.description || service.summary}</p><ul className="mt-4 space-y-2">{service.features.map(feature => <li key={feature} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><CheckCircle2 size={16} className="text-emerald-600" />{feature}</li>)}</ul><Link className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300" to={service.path}>Service details <ArrowRight size={16} /></Link></article>;
          })}
        </div>
      </main>
      <CallToAction />
    </>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const { serviceDetails, services } = useSiteContent();
  const detail = serviceDetails[slug];
  const service = services.find(item => item.slug === slug);
  if (!detail || !service) return <NotFoundPage />;
  return (
    <>
      <SEO title={detail.title} description={detail.description} />
      <main className={sectionClass}>
        <PageTitle eyebrow={service.title} title={detail.hero} description={detail.description} />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {[['What we cover', detail.cover], ['Expected outcomes', detail.outcomes], ['Project deliverables', detail.deliverables], ['Technology and tools', detail.stack]].map(([heading, items]) => <section key={heading} className={cardClass}><h2 className="text-xl font-bold text-slate-950 dark:text-white">{heading}</h2><ul className="mt-4 space-y-3">{items.map(item => <li key={item} className="flex gap-2 text-slate-600 dark:text-slate-300"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />{item}</li>)}</ul></section>)}
        </div>
      </main>
      <CallToAction />
    </>
  );
}

function AboutPage() {
  const { company, teamMembers, milestones, devProcess } = useSiteContent();
  return (
    <>
      <SEO title="About" description={`Learn about ${company.name} and the team behind its software and digital solutions.`} />
      <main>
        <section className={sectionClass}><PageTitle eyebrow="About us" title="Technology built around people and progress" description={company.tagline} /><div className="mx-auto mt-8 max-w-3xl text-center leading-8 text-slate-600 dark:text-slate-300"><p>We partner with growing businesses to plan and deliver dependable digital solutions. Our approach combines clear communication, practical engineering, and careful quality checks from discovery through deployment.</p><p className="mt-4">{company.responseTime}. Our team works with clients in {company.serviceArea} and remotely.</p></div></section>
        <section className="bg-slate-50 dark:bg-white/[0.03]"><div className={sectionClass}><PageTitle eyebrow="Our team" title="Meet the people behind the work" /><div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">{teamMembers.map(member => <article key={member.name} className={`${cardClass} text-center`}><img src={member.image} alt={member.name} className="mx-auto size-24 rounded-full object-cover" loading="lazy" /><h2 className="mt-4 font-bold text-slate-950 dark:text-white">{member.name}</h2><p className="mt-1 text-sm text-blue-700 dark:text-blue-300">{member.title || member.leadershipRole}</p><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{member.bio}</p></article>)}</div></div></section>
        <section className={sectionClass}><PageTitle eyebrow="How we work" title="A thoughtful process, from discovery to support" /><div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">{devProcess.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900"><span className="flex size-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span><span className="font-semibold text-slate-800 dark:text-slate-100">{step}</span></div>)}</div></section>
        <section className="bg-slate-50 dark:bg-white/[0.03]"><div className={sectionClass}><PageTitle eyebrow="Milestones" title="Built for long-term partnerships" /><div className="mx-auto mt-8 max-w-3xl space-y-4">{milestones.map(milestone => <div key={milestone.year} className={`${cardClass} flex gap-5`}><span className="font-black text-blue-700 dark:text-blue-300">{milestone.year}</span><p className="text-slate-600 dark:text-slate-300">{milestone.title}</p></div>)}</div></div></section>
      </main>
      <CallToAction />
    </>
  );
}

function PortfolioPage() {
  const { portfolioProjects } = useSiteContent();
  return <><SEO title="Portfolio" description="Explore software, web development, AI, and automation project examples from Vinfowise IT Solutions." /><main className={sectionClass}><PageTitle eyebrow="Portfolio" title="Work shaped around real challenges" description="Examples of digital projects and product concepts focused on useful outcomes." /><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{portfolioProjects.map(project => <article key={project.title} className={`${cardClass} overflow-hidden p-0`}><img src={project.image} alt="" className="h-48 w-full object-cover" loading="lazy" /><div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">{project.category}</p><h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{project.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p><p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">{project.metric}</p><p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300"><strong>Approach:</strong> {project.solution}</p></div></article>)}</div></main><CallToAction /></>;
}

function InsightsPage() {
  const { blogPosts, faqs } = useSiteContent();
  return <><SEO title="Insights" description="Practical insights on software development, AI automation, and business technology." /><main className={sectionClass}><PageTitle eyebrow="Insights" title="Ideas for better digital decisions" description="Practical perspectives on technology, product delivery, and business operations." /><div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">{blogPosts.map(post => <article key={post.slug} className={cardClass}><p className="text-sm font-semibold text-blue-700 dark:text-blue-300">{post.tag} · {post.date}</p><h2 className="mt-3 text-xl font-bold text-slate-950 dark:text-white">{post.title}</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p><p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{post.content}</p></article>)}</div><div className="mx-auto mt-16 max-w-3xl"><PageTitle eyebrow="FAQs" title="Common questions" /><div className="mt-6 space-y-3">{faqs.map(([question, answer]) => <details key={question} className={cardClass}><summary className="cursor-pointer font-semibold text-slate-950 dark:text-white">{question}</summary><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{answer}</p></details>)}</div></div></main><CallToAction /></>;
}

function CareersPage() {
  const { company } = useSiteContent();
  return <><SEO title="Careers" description={`Explore career opportunities with ${company.name}.`} /><main className={sectionClass}><PageTitle eyebrow="Careers" title="Do meaningful work with us" description="We are always glad to hear from thoughtful builders who care about quality, collaboration, and solving real problems." /><div className={`${cardClass} mx-auto mt-10 max-w-2xl text-center`}><h2 className="text-xl font-bold text-slate-950 dark:text-white">Introduce yourself</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Share a little about your experience, the kind of work you enjoy, and how you could contribute to the team.</p><div className="mt-6"><Button href={`mailto:${company.email}?subject=${encodeURIComponent('Career opportunity')}`}>Email your introduction</Button></div></div></main></>;
}

function ContactPage() {
  const { company, contactCards } = useSiteContent();
  return <><SEO title="Contact" description={`Contact ${company.name} to discuss your website, software, automation, or AI project.`} /><main className={sectionClass}><PageTitle eyebrow="Contact" title="Let’s talk about what you’re building" description="Tell us what you need. We’ll help you identify a practical next step." /><div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">{contactCards.map(card => { const Icon = card.icon; return <article key={card.label} className={cardClass}><Icon size={24} className="text-blue-600 dark:text-blue-400" /><h2 className="mt-4 font-bold text-slate-950 dark:text-white">{card.label}</h2>{card.href ? <a href={card.href} className="mt-2 block break-words text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-300">{card.value}</a> : <p className="mt-2 text-slate-600 dark:text-slate-300">{card.value}</p>}</article>; })}</div><p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-slate-500 dark:text-slate-400"><Phone size={16} />{company.responseTime}</p><div className="mt-7 text-center"><Button href={`mailto:${company.email}?subject=${encodeURIComponent('Project inquiry')}`}><Mail size={17} /> Email us</Button></div></main></>;
}

function LegalPage({ title }) {
  return <><SEO title={title} /><main className={sectionClass}><PageTitle title={title} description="This page is being prepared. For questions about privacy or terms, please contact our team." /><div className="mt-8 text-center"><Button to="/contact">Contact us</Button></div></main></>;
}

function CallToAction() {
  return <section className="bg-blue-700 py-14 text-white dark:bg-blue-900"><div className="container-wide flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-black sm:text-3xl">Have a project in mind?</h2><p className="mt-2 text-blue-100">Let’s make a clear plan and take the next step together.</p></div><Button to="/contact" variant="dark">Start a conversation</Button></div></section>;
}

function NotFoundPage() {
  return <main className={sectionClass}><PageTitle title="Page not found" description="The page may have moved, or the link may be incorrect." /><div className="mt-8 text-center"><Button to="/">Back to home</Button></div></main>;
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar key={location.key} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" />} />
        <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
        <Route path="/:slug" element={<ServiceDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}

export default App;
