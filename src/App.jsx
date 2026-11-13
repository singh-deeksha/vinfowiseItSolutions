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
import ViniAdminPage from './components/ViniAdminPage.jsx';
import { useSiteContent } from './context/SiteContentContext.jsx';

const pageWrap = 'container-wide py-14 sm:py-20 lg:py-24';
const cardClass = 'rounded-2xl border border-[#e3dfd1] border-l-2 border-l-[#8eb7bd] bg-[#fffdf8] p-6';
const mutedText = 'text-[#706557]';

function Eyebrow({ children }) {
  return <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8c794d]">{children}</p>;
}

function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="max-w-4xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[1.08] tracking-tight text-[#493a2e]">{title}</h1>
      {description && <p className={`mt-6 max-w-3xl text-lg leading-8 ${mutedText}`}>{description}</p>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.25rem)] font-black tracking-tight text-[#493a2e]">{title}</h2>
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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e8eee2] via-[#eef1e8] to-[#e6efec]">
      <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-[#a9b99a]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-[#8eb7bd]/20 blur-3xl" />
      <div className={`${pageWrap} relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]`}>
        <div>
          <Eyebrow>{heroContent.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[1.06] tracking-tight text-[#493a2e]">
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
          <div className="grid gap-4 border-t border-[#d9d4c6] pt-4 sm:grid-cols-3">
            {metrics.slice(0, 3).map((metric, index) => (
              <div key={metric.label} className={index > 0 ? 'sm:border-l sm:border-[#d9d4c6] sm:pl-4' : ''}>
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
    <div className="mt-9 grid gap-4 responsive-two-column-grid">
      {services.slice(0, limit || services.length).map(service => {
        const Icon = service.icon;
        return (
          <Link key={service.slug} to={service.path} className={`${cardClass} service-card group transition-colors duration-200 hover:border-[#c89a43]`}>
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#e5efee] text-[#54868d]">
              <Icon size={25} />
            </span>
            <div className="service-card-details mt-5">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-[#493a2e]">{service.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${mutedText}`}>{service.summary}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#9a752c]">View Details <ArrowRight size={16} /></span>
            </div>
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
    <section className="border-y border-[#d9e3df] bg-[#edf1eb]">
      <div className={pageWrap}>
        <SectionHeading eyebrow="Operating principles" title={title} description={description} />
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {items.map(item => {
            const Icon = item.icon;
            return (
              <article key={item.title} className={cardClass}>
                <Icon size={25} className="text-[#5b8d92]" />
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
    <div className="mt-9 grid gap-4 responsive-two-column-grid">
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
    <div className="mt-9 grid gap-5 md:grid-cols-2">
      {teamMembers.map(member => (
        <article key={member.name} className={`${cardClass} overflow-hidden p-0`}>
          <div className="h-1 bg-gradient-to-r from-[#94a987] via-[#8eb7bd] to-[#f0cf83]" />
          <div className="p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8c794d]">{member.specialty}</p>
            <div className="mt-5 flex items-center gap-4">
              <img src={member.image} alt={member.name} className="size-16 rounded-2xl object-cover ring-2 ring-[#b8d0ce]" loading="lazy" />
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
    <section className="border-y border-[#d9e3df] bg-gradient-to-r from-[#e8eee2] via-[#edf1eb] to-[#e6efec]">
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
        <section className="border-y border-[#d9e3df] bg-[#edf1eb]">
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
            <PageIntro eyebrow="About us" title="A practical digital transformation team for growing businesses." description={about.description} />
            <StatsGrid metrics={metrics} />
          </div>
        </section>
        <section className={pageWrap}>
          <div className="divide-y divide-[#e3dfd1]">
            {[['Mission', about.mission], ['Vision', about.vision], ['Values', about.values]].map(([title, text]) => (
              <article key={title} className="grid gap-2 py-6 first:pt-0 md:grid-cols-[12rem_1fr] md:gap-8">
                <h2 className="text-xl font-bold text-[#493a2e]">{title}</h2>
                <p className={`leading-7 ${mutedText}`}>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="border-y border-[#d9e3df] bg-[#edf1eb]">
          <div className={pageWrap}>
            <SectionHeading eyebrow="Team members" title={about.teamIntro} description="Meet the specialists behind Vinfowise IT Solutions across QA, technology leadership, full stack engineering, and AI-powered product development." />
            <TeamCards />
          </div>
        </section>
        <section className={pageWrap}>
          <SectionHeading eyebrow="Achievements" title="Built through steady delivery and expanding trust." />
          <div className="mt-8 divide-y divide-[#e3dfd1] border-y border-[#e3dfd1]">
            {milestones.map(milestone => (
              <article key={milestone.year} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <p className="text-lg font-bold text-[#a47c2f]">{milestone.year}</p>
                <p className={`leading-7 ${mutedText}`}>{milestone.title}</p>
              </article>
            ))}
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
          <div className="mt-7 grid gap-x-8 sm:grid-cols-2">
            {devProcess.map((step, index) => (
              <div key={step} className="flex items-center gap-4 border-t border-[#e3dfd1] py-4">
                <span className="text-sm font-bold tracking-widest text-[#a47c2f]">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-semibold text-[#493a2e]">{step}</span>
              </div>
            ))}
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
        <div className="grid gap-x-10 md:grid-cols-2">
          {[['What we cover', detail.cover], ['Expected outcomes', detail.outcomes], ['Project deliverables', detail.deliverables], ['Technology and tools', detail.stack]].map(([heading, items]) => (
            <section key={heading} className="border-t border-[#e3dfd1] py-6">
              <h2 className="text-xl font-bold text-[#493a2e]">{heading}</h2>
              <ul className="mt-4 space-y-3">{items.map(item => <li key={item} className="flex gap-2 text-[#706557]"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#8c794d]" />{item}</li>)}</ul>
            </section>
          ))}
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
        <div className="mt-8 grid gap-x-8 md:grid-cols-2">
          {projects.map(project => (
            <article key={project.title} className="border-t border-[#e3dfd1] py-6">
              <img src={project.image} alt="" className="h-56 w-full rounded-xl object-cover" loading="lazy" />
              <div className="pt-5"><p className="text-xs font-bold uppercase tracking-wider text-[#75886c]">{project.category}</p><h2 className="mt-2 text-xl font-bold text-[#493a2e]">{project.title}</h2><p className={`mt-3 text-sm leading-6 ${mutedText}`}>{project.description}</p><p className="mt-4 text-sm font-semibold text-[#9a752c]">{project.metric}</p></div>
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
        <div className="grid gap-x-8 md:grid-cols-2">
          {blogPosts.map(post => <article key={post.slug} className="border-t border-[#e3dfd1] py-6"><p className="text-sm font-bold text-[#8c794d]">{post.tag} · {post.date}</p><h2 className="mt-3 text-xl font-bold text-[#493a2e]">{post.title}</h2><p className={`mt-3 leading-7 ${mutedText}`}>{post.excerpt}</p><details className="mt-4"><summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-[#75886c]">Read insight <ChevronDown size={16} /></summary><p className={`mt-3 text-sm leading-7 ${mutedText}`}>{post.content}</p></details></article>)}
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
    const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nService: ${formData.get('service')}\nConsent to use these details to respond: Yes\n\n${formData.get('message')}`);
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <>
      <SEO title="Contact" description="Tell us what you are building and discuss your next technology project." />
      <section className="bg-gradient-to-br from-[#e8eee2] via-[#f5f0e2] to-[#f7e4c2]"><div className={pageWrap}><PageIntro eyebrow="Contact" title="Let’s plan your next digital milestone." description="Tell us about your goals, timeline, and the challenges you want to solve." /></div></section>
      <main className={`${pageWrap} grid min-w-0 gap-8 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div className="min-w-0 space-y-4">{contactCards.map(card => { const Icon = card.icon; return <article key={card.label} className={`${cardClass} flex min-w-0 gap-4`}><Icon size={22} className="mt-1 shrink-0 text-[#8c794d]" /><div className="min-w-0"><h2 className="font-bold text-[#493a2e]">{card.label}</h2>{card.href ? <a href={card.href} target={card.external ? '_blank' : undefined} rel={card.external ? 'noreferrer' : undefined} className="overflow-wrap-anywhere mt-1 block text-sm text-[#706557] hover:text-[#75886c]">{card.value}</a> : <p className="mt-1 text-sm text-[#706557]">{card.value}</p>}</div></article>; })}</div>
        <form onSubmit={submit} className={`${cardClass} grid min-w-0 gap-5 sm:grid-cols-2`}>
          <label className="text-sm font-semibold text-[#625543]">Full name<input name="name" required autoComplete="name" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]" /></label>
          <label className="text-sm font-semibold text-[#625543]">Work email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]" /></label>
          <label className="text-sm font-semibold text-[#625543] sm:col-span-2">Service of interest<select name="service" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]">{serviceInterestOptions.map(option => <option key={option}>{option}</option>)}</select></label>
          <label className="text-sm font-semibold text-[#625543] sm:col-span-2">Project details<textarea name="message" required rows="5" className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-[#493a2e] outline-none focus:border-[#c49339]" /></label>
          <label className="flex items-start gap-3 text-sm leading-6 text-[#706557] sm:col-span-2">
            <input name="consent" type="checkbox" required className="mt-1 size-4 shrink-0 accent-[#54868d]" />
            <span>I agree that Vinfowise IT Solutions may use these details to respond to my inquiry. See the <Link to="/privacy-policy" className="font-semibold text-[#46797e] underline underline-offset-2">Privacy Policy</Link>.</span>
          </label>
          <div className="sm:col-span-2"><Button type="submit">Send project inquiry</Button>{sent && <p className="mt-3 text-sm text-[#89651f]">Your email app should open with the inquiry details.</p>}</div>
        </form>
      </main>
    </>
  );
}

function LegalPage({ title }) {
  const { company } = useSiteContent();
  const isCookiePolicy = title === 'Cookie Policy';
  const cookieCopy = 'This site uses one essential, first-party, HttpOnly session cookie only when you open the VINI chatbot. It contains a signed random identifier that lets VINI recognize your returning chat session and retrieve details or history only if you previously consented to save them. The cookie expires after 30 days and is not used for advertising or analytics. This site does not use non-essential analytics or advertising cookies, so no cookie-preference banner is currently needed. You can clear the cookie in your browser settings; doing so will end access to the saved chat session on that browser. For privacy requests, contact us.';
  const privacySections = [
    {
      title: '1. Introduction',
      paragraphs: [
        'Welcome to Vinfowise IT Solutions (“Vinfowise,” “we,” “our,” or “us”).',
        'We respect your privacy and are committed to protecting the personal information you share with us.',
        'This Privacy Policy explains how we collect, use, store, protect, and process information when you visit our website, communicate with our team, use our AI assistant (VINI), or engage with our services.',
        'By using our website, you acknowledge this Privacy Policy. Where required by applicable law, we will request your consent before collecting or processing personal information.',
      ],
    },
    {
      title: '2. Information We Collect',
      paragraphs: ['We may collect the following categories of information:'],
      lists: [
        {
          title: 'Personal Information',
          items: [
            'Full name',
            'Email address',
            'Phone number, if provided',
            'Company or organization name',
            'Information submitted through contact forms',
            'Project requirements and business inquiries',
          ],
        },
        {
          title: 'Technical Information',
          items: [
            'IP address',
            'Browser type and device information',
            'Website usage and interaction data',
            'Cookies and similar technologies, where enabled',
            'Diagnostic and security logs',
          ],
        },
        {
          title: 'AI Chatbot Information',
          items: [
            'Messages and questions submitted during conversations',
            'Name and email address, if voluntarily provided',
            'Business inquiries and project requirements',
            'Conversation history and session information',
            'Feedback provided about chatbot responses',
          ],
        },
      ],
      closing: 'We encourage visitors not to share passwords, financial credentials, government identification numbers, or other highly sensitive information through the chatbot.',
    },
    {
      title: '3. How We Use Your Information',
      paragraphs: ['We may use collected information to:'],
      items: [
        'Respond to questions and inquiries',
        'Provide requested services and consultations',
        'Communicate about projects and business requirements',
        'Operate and improve our website',
        'Deliver and improve VINI AI functionality',
        'Maintain relevant conversation context',
        'Manage customer relationships and business leads',
        'Protect against fraud, misuse, and unauthorized access',
        'Comply with applicable legal obligations',
      ],
      closing: 'We do not automatically subscribe visitors to promotional communications simply because they interact with VINI or submit a business inquiry. Marketing communications will be sent only where permitted by applicable law and relevant consent or other lawful requirements have been satisfied.',
    },
    {
      title: '4. VINI AI Assistant and Data Processing',
      paragraphs: [
        'VINI is an AI-powered virtual assistant designed to help visitors with general questions, technology-related topics, business inquiries, and Vinfowise services.',
        'VINI is an artificial intelligence system, not a human representative.',
        'When using VINI:',
      ],
      items: [
        'Providing personal contact information is optional unless necessary for a specifically requested service.',
        'Visitors may continue general conversations without submitting their name or email address.',
        'Information provided may be processed to generate responses and maintain conversation context.',
        'With appropriate permission, contact details may be stored to support inquiries and follow-up communication.',
        'Conversations may be processed by third-party AI service providers that support VINI’s functionality.',
        'AI-generated responses may occasionally contain inaccuracies and should be independently verified for important decisions.',
      ],
      closing: 'We aim to collect only information reasonably necessary for the purposes described in this policy.',
    },
    {
      title: '5. Cookies and Website Analytics',
      paragraphs: [
        'Our website may use cookies or similar technologies to support website functionality, remember preferences, maintain sessions, analyze performance, and improve user experience. Where legally required, we will obtain consent before using non-essential cookies.',
        'The site currently uses one essential, first-party, HttpOnly cookie for VINI sessions. It helps recognize a returning chat visitor, expires after up to 30 days, and is not used for advertising or analytics. We do not currently use advertising or analytics cookies. Visitors may manage or clear cookies through their browser settings.',
      ],
    },
    {
      title: '6. Information Sharing and Third-Party Services',
      paragraphs: [
        'We do not sell personal information to advertisers or data brokers.',
        'We may share limited information with trusted service providers when necessary for website hosting, database management, AI processing, analytics, communications, or other authorized business operations. Such sharing is subject to applicable legal requirements and appropriate safeguards.',
        'We may also disclose information when required by law or to protect the security, rights, or integrity of our services.',
      ],
    },
    {
      title: '7. Data Security',
      paragraphs: ['We take reasonable technical and organizational measures to protect personal information against unauthorized access, disclosure, alteration, and loss. These measures may include:'],
      items: [
        'Secure communication protocols',
        'Access restrictions and authentication',
        'Database security controls',
        'Monitoring and security updates',
        'Limited access to customer information',
        'Appropriate backup and recovery procedures',
      ],
      closing: 'However, no internet-based service or electronic storage system can guarantee absolute security.',
    },
    {
      title: '8. Data Retention',
      paragraphs: [
        'We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, subject to applicable legal, contractual, security, and operational requirements.',
        'Chatbot conversations, contact details, and business inquiries may have different retention periods depending on their purpose.',
        'When information is no longer required, we will delete, anonymize, or otherwise securely dispose of it in accordance with applicable requirements.',
      ],
    },
    {
      title: '9. Your Privacy Rights',
      paragraphs: ['Depending on applicable law, you may have the right to:'],
      items: [
        'Request access to information we hold about you',
        'Request correction of inaccurate personal information',
        'Request deletion of eligible personal information',
        'Withdraw consent where processing is based on consent',
        'Opt out of applicable marketing communications',
        'Raise concerns about how your information is processed',
      ],
      closing: 'We will review and respond to privacy requests in accordance with applicable legal requirements. Certain information may need to be retained where required or permitted by law.',
    },
    {
      title: '10. International Data Processing',
      paragraphs: [
        'Some technology providers supporting our website or AI services may process information outside your country.',
        'Where applicable, we will take reasonable steps to ensure that international processing and transfers comply with relevant data protection requirements.',
      ],
    },
    {
      title: '11. Children’s Privacy',
      paragraphs: [
        'Our website and services are primarily intended for general business and professional audiences.',
        'We do not knowingly seek to collect children’s personal information without appropriate authorization.',
        'If we become aware that children’s information has been collected in circumstances requiring deletion or additional consent, we will take appropriate action in accordance with applicable law.',
      ],
    },
    {
      title: '12. Third-Party Websites',
      paragraphs: [
        'Our website may contain links to external websites or services.',
        'We are not responsible for the privacy practices, security measures, or content of independently operated third-party websites. We encourage visitors to review the privacy policies of those services.',
      ],
    },
    {
      title: '13. Changes to This Privacy Policy',
      paragraphs: [
        'We may update this Privacy Policy periodically to reflect changes in our services, technology, business practices, or applicable legal requirements.',
        'Any updated version will be published on our website with a revised effective date. Where required, we will provide additional notice or obtain renewed consent for material changes.',
      ],
    },
  ];
  const content = isCookiePolicy ? (
    <p className={`mt-8 max-w-3xl leading-8 ${mutedText}`}>{cookieCopy}</p>
  ) : title === 'Privacy Policy' ? (
    <article className={`mt-8 max-w-3xl space-y-8 leading-8 ${mutedText}`}>
      <p><strong>Effective Date:</strong> November 14, 2026</p>
      {privacySections.map(section => (
        <section key={section.title}>
          <h2 className="mb-3 text-xl font-bold text-[#493a2e]">{section.title}</h2>
          {section.paragraphs?.map(paragraph => <p key={paragraph} className="mb-3">{paragraph}</p>)}
          {section.lists?.map(list => (
            <div key={list.title} className="mb-4">
              <h3 className="font-semibold text-[#493a2e]">{list.title}</h3>
              <ul className="list-disc space-y-1 pl-6">
                {list.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
          {section.items && <ul className="list-disc space-y-1 pl-6">{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
          {section.closing && <p className="mt-3">{section.closing}</p>}
        </section>
      ))}
      <section>
        <h2 className="mb-3 text-xl font-bold text-[#493a2e]">14. Contact Us</h2>
        <p>For questions, concerns, or requests regarding this Privacy Policy or the processing of personal information, please contact:</p>
        <address className="mt-3 not-italic">
          <strong>Vinfowise IT Solutions</strong><br />
          Website: <Link to="/contact" className="font-semibold text-[#46797e] underline underline-offset-2">Contact us</Link><br />
          Email: <a href="mailto:vinfowiseitsolutions@gmail.com" className="font-semibold text-[#46797e] underline underline-offset-2">vinfowiseitsolutions@gmail.com</a><br />
          Location: Mohali
        </address>
        <p className="mt-3">We will make reasonable efforts to address privacy inquiries promptly and in accordance with applicable law.</p>
      </section>
      <p>© 2026 Vinfowise IT Solutions. All rights reserved.</p>
    </article>
  ) : (
    <p className={`mt-8 max-w-3xl leading-8 ${mutedText}`}>We respect your privacy and aim to handle business and project information responsibly. Please contact us before sharing sensitive information if you have questions about how it will be used or protected.</p>
  );
  return <><SEO title={title} /><main className={pageWrap}><PageIntro eyebrow="Legal" title={title} description={`${title} information for ${company.name}. For questions, contact ${company.email}.`} />{content}<div className="mt-8"><Button href={`mailto:${company.email}`}>Contact us</Button></div></main></>;
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
        <Route path="/cookie-policy" element={<LegalPage title="Cookie Policy" />} />
        <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
        <Route path="/admin" element={<ViniAdminPage />} />
        <Route path="/:slug" element={<ServiceDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}

export default App;
