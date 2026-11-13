import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import Button from './components/Button.jsx';
import CommandCenterCard from './components/CommandCenterCard.jsx';
import FloatingWidgets from './components/FloatingWidgets.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import SEO from './components/SEO.jsx';
import { useSiteContent } from './context/SiteContentContext.jsx';

const pageWrap = 'container-wide py-14 sm:py-20 lg:py-24';
const cardClass = 'rounded-3xl border border-[#e3dfd1] bg-[#fffdf8] p-6 shadow-xl shadow-[#76634a]/10 backdrop-blur-sm';
const mutedText = 'text-[#706557]';

function Eyebrow({ children }) {
  return <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8c794d]">{children}</p>;
}

function PageIntro({ eyebrow, title, description, centered = true }) {
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-4xl`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-[#493a2e] sm:text-5xl lg:text-7xl">{title}</h1>
      {description && <p className={`mt-6 max-w-3xl text-lg leading-8 ${mutedText} ${centered ? 'mx-auto' : ''}`}>{description}</p>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-[#493a2e] sm:text-4xl">{title}</h2>
      {description && <p className={`mt-4 leading-7 ${mutedText}`}>{description}</p>}
    </div>
  );
}

function StatsGrid({ metrics }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {metrics.map(metric => (
        <div key={metric.label} className={`${cardClass} p-6 sm:p-8`}>
          <p className="text-4xl font-black tracking-tight text-[#493a2e] sm:text-5xl">{metric.value}</p>
          <p className={`mt-3 text-base ${mutedText}`}>{metric.label}</p>
        </div>
      ))}
    </div>
  );
}

function HeroSection() {
  const { company, heroContent, metrics } = useSiteContent();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]">
      <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-[#a9b99a]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-[#e6b95d]/30 blur-3xl" />
      <div className={`${pageWrap} relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]`}>
        <div>
          <Eyebrow>{heroContent.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.06] tracking-tight text-[#493a2e] sm:text-6xl lg:text-7xl">
            {company.tagline}
          </h1>
          <p className={`mt-6 max-w-2xl text-lg leading-8 ${mutedText}`}>{heroContent.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact">{'Book Consultation'}</Button>
            <Button to="/services" variant="secondary">Explore Services</Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {heroContent.badges.map(badge => (
              <span key={badge} className="rounded-full border border-[#ddd5c3] bg-[#fffdf8]/75 px-4 py-2 text-sm font-semibold text-[#655744]">{badge}</span>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <CommandCenterCard />
          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.slice(0, 3).map(metric => (
              <div key={metric.label} className="rounded-2xl border border-[#e3dfd1] bg-[#fffdf8]/80 p-4">
                <p className="text-xl font-black text-[#493a2e]">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-[#706557]">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCards({ limit }) {
  const { services } = useSiteContent();
  return (
    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.slice(0, limit || services.length).map(service => {
        const Icon = service.icon;
        return (
          <Link key={service.slug} to={service.path} className={`${cardClass} group transition duration-200 hover:-translate-y-1 hover:border-[#c89a43] hover:bg-[#fffaf0]`}>
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#e8eee2] text-[#75886c]">
              <Icon size={25} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-[#493a2e]">{service.title}</h3>
            <p className={`mt-3 text-sm leading-7 ${mutedText}`}>{service.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#9a752c]">View Details <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>
        );
      })}
    </div>
  );
}

function Principles({
  items,
  title = 'A practical delivery partner for serious business outcomes.',
  description = 'How we keep enterprise delivery reliable.',
}) {
  return (
    <section className="border-y border-[#e3dfd1] bg-[#eef0e8]">
      <div className={pageWrap}>
        <SectionHeading eyebrow="Operating principles" title={title} description={description} />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(item => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={cardClass}>
                <Icon size={25} className="text-[#c49339]" />
                <h3 className="mt-4 text-lg font-bold text-[#493a2e]">{item.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${mutedText}`}>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCards({ limit }) {
  const { caseStudies } = useSiteContent();
  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2">
      {caseStudies.slice(0, limit || caseStudies.length).map(study => (
        <article key={study.title} className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#75886c]">{study.category}</span>
            <span className="rounded-full bg-[#f6e5bb] px-3 py-1 text-xs font-semibold text-[#89651f]">{study.metric}</span>
          </div>
          <h3 className="mt-4 text-xl font-bold text-[#493a2e]">{study.title}</h3>
          <p className={`mt-3 leading-7 ${mutedText}`}>{study.result}</p>
          <p className="mt-4 text-sm leading-7 text-[#786d5e]">{study.details}</p>
        </article>
      ))}
    </div>
  );
}

function TeamCards() {
  const { teamMembers } = useSiteContent();
  return (
    <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {teamMembers.map(member => (
        <article key={member.name} className={`${cardClass} overflow-hidden p-0`}>
          <div className="h-1 bg-gradient-to-r from-[#94a987] via-[#c69a43] to-[#f0cf83]" />
          <div className="p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8c794d]">{member.specialty}</p>
            <div className="mt-5 flex items-center gap-4">
              <img src={member.image} alt={member.name} className="size-16 rounded-2xl object-cover ring-2 ring-[#c6d0bc]" loading="lazy" />
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-[#493a2e]">{member.name}</h3>
                {member.leadershipRole && <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#89651f]">{member.leadershipRole}</p>}
                <p className="mt-1 text-sm text-[#706557]">{member.title}</p>
              </div>
            </div>
            <p className={`mt-5 text-sm leading-7 ${mutedText}`}>{member.bio}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Testimonials() {
  const { testimonials } = useSiteContent();
  return (
    <div className="mt-9 grid gap-4 md:grid-cols-2">
      {testimonials.map(testimonial => (
        <figure key={testimonial.name} className={cardClass}>
          <div className="text-lg tracking-[0.15em] text-[#c99435]" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote className={`mt-4 leading-7 ${mutedText}`}>“{testimonial.quote}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <img src={testimonial.image} alt="" className="size-11 rounded-full object-cover" loading="lazy" />
            <span><span className="block font-bold text-[#493a2e]">{testimonial.name}</span><span className="mt-1 block text-xs text-[#786d5e]">{testimonial.role}</span></span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function CallToAction() {
  return (
    <section className="border-y border-[#e3dcc9] bg-gradient-to-r from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]">
      <div className={`${pageWrap} flex flex-col items-start justify-between gap-7 md:flex-row md:items-center`}>
        <div className="max-w-3xl">
          <Eyebrow>Ready to scale?</Eyebrow>
          <h2 className="mt-3 text-3xl font-black text-[#493a2e] sm:text-4xl">Build the next version of your business with a senior technology partner.</h2>
          <p className={`mt-4 leading-7 ${mutedText}`}>Share your goals, timeline, and current challenges. We will map the practical path to launch, optimize, or automate.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button to="/contact">Start a Project</Button>
          <Button to="/services" variant="secondary">Explore Services</Button>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const { company, whyChooseUs, industries } = useSiteContent();
  return (
    <>
      <SEO title="Home" description={company.tagline} />
      <main>
        <HeroSection />
        <section className={pageWrap}>
          <SectionHeading eyebrow="What we do" title="Professional IT services built for clarity, speed, and growth." description="Modern engineering and hands-on delivery for the systems your business depends on." />
          <ServiceCards limit={6} />
          <div className="mt-8"><Button to="/services" variant="secondary">View All Services</Button></div>
        </section>
        <Principles items={whyChooseUs} />
        <section className={pageWrap}>
          <SectionHeading eyebrow="Selected work" title="Solution examples that show how we can help." description="Practical software, automation, and website projects built around real business needs." />
          <CaseStudyCards limit={4} />
          <div className="mt-8"><Button to="/portfolio" variant="secondary">Explore Portfolio</Button></div>
        </section>
        <section className="border-y border-[#e3dfd1] bg-[#eef0e8]">
          <div className={pageWrap}>
            <SectionHeading eyebrow="Client feedback" title="Built on trust, clear delivery, and useful outcomes." />
            <Testimonials />
          </div>
        </section>
        <section className={pageWrap}>
          <SectionHeading eyebrow="Industries" title="Technology that fits the way your industry works." />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {industries.map(industry => {
              const Icon = industry.icon;
              return <div key={industry.title} className={`${cardClass} flex items-center gap-3 p-4`}><Icon size={20} className="shrink-0 text-[#75886c]" /><span className="font-semibold text-[#493a2e]">{industry.title}</span></div>;
            })}
          </div>
        </section>
      </main>
      <CallToAction />
    </>
  );
}

function AboutPage() {
  const { about, metrics, milestones, whyChooseUs } = useSiteContent();
  return (
    <>
      <SEO title="About" description={about.description} />
      <main>
        <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]">
          <div className={pageWrap}>
            <PageIntro eyebrow="About us" title="A practical digital transformation team for growing businesses." description={about.description} centered={false} />
            <StatsGrid metrics={metrics} />
          </div>
        </section>
        <section className={pageWrap}>
          <div className="grid gap-4 md:grid-cols-3">
            {[['Mission', about.mission], ['Vision', about.vision], ['Values', about.values]].map(([title, text]) => (
              <article key={title} className={cardClass}><h2 className="text-xl font-bold text-[#493a2e]">{title}</h2><p className={`mt-3 leading-7 ${mutedText}`}>{text}</p></article>
            ))}
          </div>
        </section>
        <section className="border-y border-[#e3dfd1] bg-[#eef0e8]">
          <div className={pageWrap}>
            <SectionHeading eyebrow="Team members" title={about.teamIntro} description="Meet the specialists behind Vinfowise IT Solutions across QA, technology leadership, full stack engineering, and AI-powered product development." />
            <TeamCards />
          </div>
        </section>
        <section className={pageWrap}>
          <SectionHeading eyebrow="Achievements" title="Built through steady delivery and expanding trust." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {milestones.map(milestone => <article key={milestone.year} className={cardClass}><p className="text-2xl font-black text-[#a47c2f]">{milestone.year}</p><p className={`mt-3 leading-7 ${mutedText}`}>{milestone.title}</p></article>)}
          </div>
        </section>
        <Principles items={whyChooseUs} title="How we keep enterprise delivery reliable." description="Think deeply, communicate clearly, protect trust, and deliver with care." />
      </main>
      <CallToAction />
    </>
  );
}

function ServicesPage() {
  const { devProcess } = useSiteContent();
  return (
    <>
      <SEO title="Services" description="IT services for websites, software, automation, and business growth." />
      <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]">
        <div className={pageWrap}><PageIntro eyebrow="Our services" title="IT services for websites, software, automation, and business growth." description="What every engagement is designed to improve: your customer experience, delivery speed, and confidence in the technology behind your business." /></div>
      </section>
      <main className={pageWrap}>
        <SectionHeading eyebrow="Services" title="Find the right expertise for your next challenge." />
        <ServiceCards />
        <section className="mt-16">
          <SectionHeading eyebrow="Our process" title="A clear path from discovery to delivery." />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {devProcess.map((step, index) => <div key={step} className={`${cardClass} flex items-center gap-3`}><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8eee2] font-black text-[#718365]">{String(index + 1).padStart(2, '0')}</span><span className="font-semibold text-[#493a2e]">{step}</span></div>)}
          </div>
        </section>
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
      <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]">
        <div className={pageWrap}><PageIntro eyebrow={service.title} title={detail.hero} description={detail.description} /></div>
      </section>
      <main className={pageWrap}>
        <div className="grid gap-5 md:grid-cols-2">
          {[['What we cover', detail.cover], ['Expected outcomes', detail.outcomes], ['Project deliverables', detail.deliverables], ['Technology and tools', detail.stack]].map(([heading, items]) => <section key={heading} className={cardClass}><h2 className="text-xl font-bold text-[#493a2e]">{heading}</h2><ul className="mt-4 space-y-3">{items.map(item => <li key={item} className="flex gap-2 text-[#706557]"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#8c794d]" />{item}</li>)}</ul></section>)}
        </div>
      </main>
      <CallToAction />
    </>
  );
}

function PortfolioPage() {
  const { portfolioProjects } = useSiteContent();
  const categories = ['All', ...new Set(portfolioProjects.map(project => project.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const projects = activeCategory === 'All' ? portfolioProjects : portfolioProjects.filter(project => project.category === activeCategory);
  return (
    <>
      <SEO title="Portfolio" description="Practical case studies for websites, software, automation, and AI." />
      <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]"><div className={pageWrap}><PageIntro eyebrow="Portfolio" title="Practical case studies for websites, software, automation, and AI." description="Explore how thoughtful technology can improve everyday workflows and customer experiences." /></div></section>
      <main className={pageWrap}>
        <SectionHeading eyebrow="Case studies and project gallery" title="Selected work" />
        <div className="mt-7 flex flex-wrap gap-2">{categories.map(category => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'border-[#c89a43] bg-[#f6e5bb] text-[#76551b]' : 'border-[#ded8c8] text-[#706557] hover:border-[#b7a982]'}`}>{category}</button>)}</div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <article key={project.title} className={`${cardClass} overflow-hidden p-0`}>
              <img src={project.image} alt="" className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#75886c]">{project.category}</p><h2 className="mt-2 text-xl font-bold text-[#493a2e]">{project.title}</h2><p className={`mt-3 text-sm leading-6 ${mutedText}`}>{project.description}</p><p className="mt-4 text-sm font-semibold text-[#9a752c]">{project.metric}</p></div>
            </article>
          ))}
        </div>
      </main>
      <CallToAction />
    </>
  );
}

function InsightsPage() {
  const { blogPosts, faqs } = useSiteContent();
  return (
    <>
      <SEO title="Insights" description="Technology insights, automation ideas, and practical delivery guidance." />
      <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]"><div className={pageWrap}><PageIntro eyebrow="Insights" title="Technology insights for better business decisions." description="Automation ideas, engineering practices, and practical delivery guidance for growing teams." /></div></section>
      <main className={pageWrap}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map(post => <article key={post.slug} className={cardClass}><p className="text-sm font-bold text-[#8c794d]">{post.tag} · {post.date}</p><h2 className="mt-3 text-xl font-bold text-[#493a2e]">{post.title}</h2><p className={`mt-3 leading-7 ${mutedText}`}>{post.excerpt}</p><details className="mt-4"><summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[#75886c]">Read insight <ChevronDown size={16} /></summary><p className={`mt-3 text-sm leading-7 ${mutedText}`}>{post.content}</p></details></article>)}
        </div>
        <section className="mt-16">
          <SectionHeading eyebrow="FAQs" title="Answers to common questions." />
          <div className="mt-7 space-y-3">{faqs.map(([question, answer]) => <details key={question} className={cardClass}><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-[#493a2e]">{question}<ChevronDown size={18} className="shrink-0 text-[#c49339]" /></summary><p className={`mt-4 leading-7 ${mutedText}`}>{answer}</p></details>)}</div>
        </section>
      </main>
      <CallToAction />
    </>
  );
}

function CareersPage() {
  const jobs = ['Senior React Engineer', 'Cloud Solutions Architect', 'AI Automation Consultant', 'Product Designer'];
  return (
    <>
      <SEO title="Careers" description="Join a delivery culture built around clarity, craft, ownership, and long-term client trust." />
      <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]"><div className={pageWrap}><PageIntro eyebrow="Careers" title="Build serious technology with thoughtful people." description="Join a delivery culture built around clarity, craft, ownership, and long-term client trust." /></div></section>
      <main className={pageWrap}>
        <SectionHeading eyebrow="Open roles" title="Future-ready teams need future-ready talent." />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {jobs.map(job => <article key={job} className={cardClass}><h2 className="text-xl font-bold text-[#493a2e]">{job}</h2><p className={`mt-3 leading-7 ${mutedText}`}>Remote-friendly role for experienced professionals who can communicate clearly and ship dependable work.</p><Button to="/contact" className="mt-5">Apply Now</Button></article>)}
        </div>
        <section className="mt-16"><SectionHeading eyebrow="Success stories" title="Work with a team building practical digital systems." description="These examples show the kind of thoughtful software, automation, website, and extension work future Vinfowise team members help deliver." /><CaseStudyCards /></section>
      </main>
    </>
  );
}

function ContactPage() {
  const { company, contactCards, serviceInterestOptions } = useSiteContent();
  const [sent, setSent] = useState(false);
  const submit = event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project inquiry: ${formData.get('service')}`);
    const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nService: ${formData.get('service')}\n\n${formData.get('message')}`);
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <>
      <SEO title="Contact" description="Tell us what you are building and discuss your next technology project." />
      <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]"><div className={pageWrap}><PageIntro eyebrow="Contact" title="Let’s plan your next digital milestone." description="Tell us about your goals, timeline, and the challenges you want to solve." /></div></section>
      <main className={`${pageWrap} grid gap-8 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div className="space-y-4">{contactCards.map(card => { const Icon = card.icon; return <article key={card.label} className={`${cardClass} flex gap-4`}><Icon size={22} className="mt-1 shrink-0 text-[#8c794d]" /><div><h2 className="font-bold text-[#493a2e]">{card.label}</h2>{card.href ? <a href={card.href} className="mt-1 block break-words text-sm text-[#706557] hover:text-[#75886c]">{card.value}</a> : <p className="mt-1 text-sm text-[#706557]">{card.value}</p>}</div></article>; })}</div>
        <form onSubmit={submit} className={`${cardClass} grid gap-5 sm:grid-cols-2`}>
          <label className="text-sm font-semibold text-[#625543]">Full name<input name="name" required autoComplete="name" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]" /></label>
          <label className="text-sm font-semibold text-[#625543]">Work email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]" /></label>
          <label className="text-sm font-semibold text-[#625543] sm:col-span-2">Service of interest<select name="service" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]">{serviceInterestOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label className="text-sm font-semibold text-[#625543] sm:col-span-2">Project details<textarea name="message" required rows="5" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]" /></label>
          <div className="sm:col-span-2"><Button type="submit">Send project inquiry</Button>{sent && <p className="mt-3 text-sm text-[#89651f]">Your email app should open with the inquiry details.</p>}</div>
        </form>
      </main>
    </>
  );
}

function LegalPage({ title }) {
  const { company } = useSiteContent();
  return <><SEO title={title} /><main className={pageWrap}><PageIntro eyebrow="Legal" title={title} description={`${title} information for ${company.name}. For questions, contact ${company.email}.`} centered={false} /><p className={`mt-8 max-w-3xl leading-8 ${mutedText}`}>We respect your privacy and aim to handle business and project information responsibly. Please contact us before sharing sensitive information if you have questions about how it will be used or protected.</p><div className="mt-8"><Button href={`mailto:${company.email}`}>Contact us</Button></div></main></>;
}

function NotFoundPage() {
  return <main className={pageWrap}><PageIntro title="Page not found" description="The page may have moved or the link may be incorrect." /><div className="mt-8 text-center"><Button to="/">Back to home</Button></div></main>;
}

function App() {
  return (
    <div className="min-h-screen bg-[#f5f3eb] text-[#493a2e]">
      <Navbar />
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
