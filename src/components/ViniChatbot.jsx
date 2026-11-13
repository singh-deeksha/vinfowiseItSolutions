import { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const SENSITIVE_KEYWORDS = [
  'password',
  'otp',
  'api key',
  'secret key',
  'private key',
  'card number',
  'cvv',
  'bank account',
  'aadhaar',
  'pan number',
  'login credentials',
  'database url',
  'token',
];

const GENERAL_TECH_KEYWORDS = [
  'vinfowise',
  'website',
  'web',
  'software',
  'mobile',
  'app',
  'ui',
  'ux',
  'automation',
  'workflow',
  'ai',
  'chatbot',
  'qa',
  'testing',
  'cloud',
  'chrome',
  'extension',
  'consulting',
  'business',
  'startup',
  'service',
  'pricing',
  'cost',
  'quote',
  'timeline',
  'portfolio',
  'team',
  'contact',
  'project',
  'dashboard',
  'crm',
  'lead',
  'digital',
  'development',
];

function normalizeText(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
}

export default function ViniChatbot({ triggerClassName = '' }) {
  const { viniAssistant, company, services, portfolioProjects, teamMembers, devProcess, techStack, getWhatsAppUrl } = useSiteContent();

  const botName = viniAssistant?.botName || 'Vini';
  const botAvatar = viniAssistant?.botAvatar || 'https://cdn-icons-png.flaticon.com/512/11260/11260829.png';
  const botVideo = viniAssistant?.botVideo || 'https://cdn-icons-mp4.flaticon.com/512/11260/11260829.mp4';
  const suggestedPrompts = viniAssistant?.suggestedPrompts || [
    'Which service should I choose?',
    'Show portfolio examples',
    'How long does a project take?',
    'Can you build Chrome extensions?',
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('vini_chat_messages');
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return [{ role: 'bot', text: viniAssistant?.welcomeMessage || 'Hi, I’m Vini! How can I help you today?' }];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('vini_chat_messages', JSON.stringify(messages));
      } catch {
        // Ignored
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Audio tone notification
  const playNotificationSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.24);
    } catch {
      // Audio playback might be restricted without user interaction
    }
  };

  const getBotResponse = query => {
    const text = normalizeText(query);

    // Safety check
    if (SENSITIVE_KEYWORDS.some(kw => text.includes(normalizeText(kw)))) {
      return 'For safety, please do not share passwords, OTPs, API keys, tokens, payment details, database URLs, or private identity numbers here. I can still help if you describe the requirement without sensitive values, for example: "I need secure login," "I need email setup," or "I need database integration."';
    }

    // Greetings
    if (/^(hi|hello|hey|good morning|good evening|good afternoon)\b/.test(text) || /\bhow are you\b/.test(text)) {
      return 'Hi, I’m ready to help. Tell me what you want to build, improve, automate, test, or launch, and I’ll guide you toward the right Vinfowise service.';
    }

    // Specific knowledge matches
    if (/service|offer|what do you do|help/.test(text)) {
      return 'It depends on what you want to achieve:\n\n• Need a business website? → Web Development\n• Need dashboards or internal systems? → Software Development\n• Want to reduce repetitive work? → Automation\n• Need chatbots or AI workflows? → AI Solutions\n• Launching a mobile product? → Mobile App Development\n\nShare your requirement in one or two lines and I’ll suggest the best approach.';
    }

    if (/website|web|landing|seo|responsive/.test(text)) {
      return 'For a website, Vinfowise can help with responsive design, service pages, enquiry forms, SEO-ready structure, performance basics, and deployment.\n\nA good starting brief is: business type, required pages, design preference, and examples you like.';
    }

    if (/software|dashboard|admin|panel|portal|database/.test(text)) {
      return 'For custom software, Vinfowise can build dashboards, admin panels, portals, databases, reports, user roles, and API integrations.\n\nThe key question is: what workflow should the software simplify for your team or customers?';
    }

    if (/school|student|attendance|fee|academic/.test(text)) {
      return 'Yes! The portfolio includes a School Management System concept covering student records, attendance flow, staff workflows, fee tracking, notices, academic administration, and role-based dashboards for school teams.';
    }

    if (/chrome|extension|browser/.test(text)) {
      return 'Yes — Vinfowise builds Chrome extensions for browser workflows, automation, saved preferences, popup UI, and task shortcuts.\n\nThis is useful when your process happens repeatedly inside Chrome and needs to be faster or more reliable.';
    }

    if (/automation|workflow|crm|follow up|reminder|task/.test(text)) {
      return 'Yes — Vinfowise builds workflow automation systems that reduce repetitive manual work.\n\nThis includes:\n• CRM automation\n• Lead management & WhatsApp follow-ups\n• Email workflows\n• Data synchronization\n• Chrome extension workflows\n• Scheduled jobs';
    }

    if (/ai|chatbot|bot|assistant|knowledge base/.test(text)) {
      return 'Vinfowise can help with practical AI systems such as chatbots, lead qualification assistants, document helpers, FAQ flows, and internal workflow support.\n\nThe best starting point is to list the questions, tasks, or documents you want AI to handle.';
    }

    if (/qa|testing|quality|bug|automation testing|manual/.test(text)) {
      return 'Vinfowise has strong QA coverage through manual testing, automation testing, regression checks, usability review, release validation, and bug reporting. This is especially useful before launching websites, dashboards, apps, or browser extensions.';
    }

    if (/portfolio|case study|work|project|examples/.test(text)) {
      const titles = (portfolioProjects || []).map(p => p.title).join(', ');
      return `Portfolio examples include: ${titles}. Visit our Portfolio page for category filters and interactive details!`;
    }

    if (/team|founder|owner|deeksha|akshay|paswn|leadership/.test(text)) {
      const teamSummary = (teamMembers || [])
        .map(t => `${t.name}${t.leadershipRole ? ` (${t.leadershipRole})` : ''} - ${t.title}`)
        .join('; ');
      return `The Vinfowise team includes: ${teamSummary}. Deeksha leads QA quality thinking, Akshay leads technology strategy and architecture, and the engineering team supports full stack and AI solution delivery.`;
    }

    if (/price|pricing|cost|budget|charge|estimate|quote/.test(text)) {
      return 'Pricing depends on the type of project, features, timeline, and complexity:\n\n• Basic business websites → lower range\n• Custom dashboards or platforms → higher range\n• AI or automation integrations → based on scope\n\nThe best approach is to discuss your requirements so Vinfowise can suggest a practical solution for your budget.';
    }

    if (/timeline|how long|duration|deadline|delivery|time/.test(text)) {
      return 'Timeline depends on scope. A simple website is usually faster than a custom dashboard, automation system, or Chrome extension. Vinfowise typically starts with discovery, planning, UI/UX, development, QA, deployment, and support.';
    }

    if (/process|steps|workflow|how do you work/.test(text)) {
      return `The delivery process is: ${(devProcess || []).join(' → ')}. To start, share your business goal, required features, timeline, and any references through our contact form.`;
    }

    if (/tech|stack|technologies|react|python|node|aws/.test(text)) {
      return `Vinfowise works with modern technologies including: ${(techStack || []).slice(0, 15).join(', ')}. The final stack is tailored to your business goals, performance needs, and long-term maintainability.`;
    }

    if (/contact|email|message|phone|whatsapp|location|office|chandigarh|mohali/.test(text)) {
      return `You can reach out to us at ${company.email} or WhatsApp at ${company.phone}. We are based in Mohali & Chandigarh and support clients both locally and globally.`;
    }

    const matchesTech = GENERAL_TECH_KEYWORDS.some(kw => text.includes(normalizeText(kw)));
    if (matchesTech) {
      return 'That sounds like a business technology requirement! Is it closer to a website, custom software, automation flow, AI assistant, QA/testing need, Chrome extension, or consulting request?\n\nOnce you share the goal, I’ll suggest the most suitable Vinfowise service.';
    }

    return 'I’m mainly here to help with Vinfowise services, websites, software, automation, AI, QA, cloud, Chrome extensions, and business technology guidance.\n\nIf you have a project requirement, share your goal and I’ll suggest the right direction!';
  };

  const handleSend = textToSend => {
    const query = (textToSend || input).trim();
    if (!query) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(query);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setIsTyping(false);
      if (!isOpen) {
        setHasUnread(true);
      }
      playNotificationSound();
    }, 650);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(prev => !prev);
          setHasUnread(false);
        }}
        className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/30 ${triggerClassName}`}
        aria-label={isOpen ? `Close ${botName} chat` : `Open ${botName} chat`}
        aria-expanded={isOpen}
      >
        <span className="bot-icon-wrap">
          <video
            className="bot-icon-video"
            src={botVideo}
            poster={botAvatar}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
        </span>
        <span className="hidden sm:inline">{botName} AI</span>
        {hasUnread && <span className="ai-unread-dot" aria-label="Vini has a new answer" />}
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <section
          className="fixed bottom-20 right-3 z-[70] flex h-[min(620px,calc(100vh-96px))] w-[calc(100vw-24px)] max-w-[410px] flex-col overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-2xl shadow-slate-950/20 sm:bottom-24 sm:right-6 dark:border-white/10 dark:bg-slate-950"
          aria-label={`${botName} Assistant`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 px-4 py-3.5 text-white dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="bot-icon-wrap size-10">
                <img src={botAvatar} alt={botName} className="size-full object-cover" />
              </span>
              <div>
                <h3 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  {botName} AI
                  <Sparkles size={14} className="text-cyan-300" />
                </h3>
                <p className="text-xs text-cyan-200">Vinfowise Intelligent Assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm bg-slate-50/50 dark:bg-slate-900/30">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'bot' && (
                  <div className="size-7 shrink-0 rounded-full bg-blue-600/10 dark:bg-blue-400/20 flex items-center justify-center text-blue-600 dark:text-blue-300 mt-0.5">
                    <Bot size={15} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'border border-slate-200/80 bg-white text-slate-800 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-100'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="size-7 shrink-0 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 mt-0.5">
                  <Bot size={15} />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 italic dark:border-white/10 dark:bg-slate-900">
                  {botName} is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="border-t border-slate-100 bg-white px-3 py-2 flex gap-1.5 overflow-x-auto no-scrollbar dark:border-white/10 dark:bg-slate-950">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="shrink-0 rounded-full border border-blue-200 bg-blue-50/60 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-950"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about our IT services..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
