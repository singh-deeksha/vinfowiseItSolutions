import { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, Sparkles } from 'lucide-react';
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

function makeMessage(role, text) {
  return { message_id: crypto.randomUUID(), role, text };
}

function extractName(text) {
  const explicitName = text.match(/(?:my name is|i am|i'm|this is|call me)\s+([\p{L}][\p{L}'-]*(?:\s+[\p{L}][\p{L}'-]*){0,2})/iu)?.[1]
    ?.replace(/\s+(?:and|but|from|i|my)\b.*$/i, '')
    .trim();
  if (explicitName && !/\b(trying|looking|building|working|interested|need|here|from|a|an|the|to)\b/i.test(explicitName)) {
    return explicitName.replace(/[.!?]+$/, '').trim();
  }
  const normalizedText = normalizeText(text);
  if (text.length > 80 || /[@?]/.test(text)
    || /\b(hi|hello|hey|yes|no|okay|ok|skip|website|software|service|price|quote|help|what|how|can|do|need|looking|project)\b/i.test(text)
    || GENERAL_TECH_KEYWORDS.some(keyword => ` ${normalizedText} `.includes(` ${normalizeText(keyword)} `))) return null;
  return /^\p{L}[\p{L}' -]{0,79}$/iu.test(text.trim()) ? text.trim() : null;
}

function extractEmail(text) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || null;
}

function isValidEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isSkip(text) {
  return /\b(skip|no thanks|rather not|prefer not|not now|continue without)\b/i.test(text);
}

export default function ViniChatbot({ triggerClassName = '' }) {
  const { viniAssistant, company, portfolioProjects, teamMembers, devProcess, techStack } = useSiteContent();

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
  const [messages, setMessages] = useState(() => [
    makeMessage('bot', viniAssistant?.welcomeMessage || 'Hi, I’m Vini! How can I help you today?'),
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const [onboardingStep, setOnboardingStep] = useState('name');
  const [pendingCustomer, setPendingCustomer] = useState({ name: '', email: '' });
  const [profileSaved, setProfileSaved] = useState(false);
  const [storageError, setStorageError] = useState('');
  const sessionStartedRef = useRef(false);
  const namePromptReminderRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen || sessionStartedRef.current) return undefined;
    sessionStartedRef.current = true;
    try {
      sessionStorage.removeItem('vini_chat_messages');
    } catch (error) {
      console.warn('Could not clear legacy VINI chat history from browser storage.', error);
    }
    let active = true;
    fetch('/api/vini/session', { credentials: 'same-origin', cache: 'no-store' })
      .then(async response => {
        if (!response.ok) throw new Error('Secure chat storage is unavailable.');
        return response.json();
      })
      .then(data => {
        if (!active) return;
        if (data.profile) {
          setPendingCustomer({ name: data.profile.name || '', email: data.profile.email || '' });
          setProfileSaved(true);
          setOnboardingStep('done');
          const restored = data.messages.map(message => ({
            message_id: message.message_id,
            role: message.role,
            text: message.content,
          }));
          const welcomeBack = makeMessage('bot', `Welcome back${data.profile.name ? `, ${data.profile.name}` : ''}! What can I help you with today?`);
          setMessages(restored.length ? [...restored, welcomeBack] : [welcomeBack]);
        } else {
          setMessages(current => [
            ...current,
            makeMessage('bot', 'By the way, what should I call you? Sharing details is optional, and you can ask anything without them.'),
          ]);
        }
      })
      .catch(() => {
        if (active) {
          setMessages(current => [
            ...current,
            makeMessage('bot', 'By the way, what should I call you? Sharing details is optional, and you can ask anything without them.'),
          ]);
        }
      });
    return () => { active = false; };
  }, [isOpen]);

  const persistMessage = async message => {
    if (!profileSaved) return;
    try {
      const response = await fetch('/api/vini/messages', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_id: message.message_id,
          role: message.role,
          content: message.text,
        }),
      });
      if (!response.ok) throw new Error('Chat history could not be saved.');
    } catch (error) {
      setStorageError(error.message);
    }
  };

  const saveConsent = async conversation => {
    const confirmation = makeMessage('bot', 'Thank you. I’ve securely saved the details and conversation you agreed to share. What would you like help with?');
    const messagesToSave = [...conversation, confirmation].slice(-200).map(message => ({
      message_id: message.message_id,
      role: message.role,
      content: message.text,
    }));
    try {
      const response = await fetch('/api/vini/profile', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...pendingCustomer,
          consent: true,
          messages: messagesToSave,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Secure saving is not available right now.');
      setProfileSaved(true);
      setStorageError('');
      setOnboardingStep('done');
      setMessages([...conversation, confirmation]);
    } catch {
      setStorageError('Secure saving is unavailable right now. Nothing was saved. You can try again or continue without saving.');
    }
  };

  const declineConsent = conversation => {
    setPendingCustomer({ name: '', email: '' });
    setOnboardingStep('done');
    setStorageError('');
    setMessages([...conversation, makeMessage('bot', 'No problem. I won’t save your details or chat history. We can keep chatting without them.')]);
  };

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
      return 'Yes, Vinfowise builds Chrome extensions for browser workflows, automation, saved preferences, popup UI, and task shortcuts.\n\nThis helps make repeated Chrome tasks faster and more reliable.';
    }

    if (/automation|workflow|crm|follow up|reminder|task/.test(text)) {
      return 'Yes, Vinfowise builds workflow automation systems that reduce repetitive manual work.\n\nServices include:\n• CRM automation\n• Lead management & WhatsApp follow-ups\n• Email workflows\n• Data synchronization\n• Chrome extension workflows\n• Scheduled jobs';
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

    const userMessage = makeMessage('user', query);
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setIsTyping(true);
    if (profileSaved) persistMessage(userMessage);

    if (onboardingStep === 'consent' && /^(yes|yes please|save|agree|okay|ok)$/i.test(query)) {
      setIsTyping(false);
      saveConsent(conversation);
      return;
    }
    if (onboardingStep === 'consent' && /^(no|no thanks|don't save|do not save|continue without saving)$/i.test(query)) {
      setIsTyping(false);
      declineConsent(conversation);
      return;
    }

    setTimeout(() => {
      let reply;
      if (onboardingStep === 'name' && isSkip(query)) {
        setOnboardingStep('done');
        reply = 'Of course. You can ask me anything without sharing personal details.';
      } else if (onboardingStep === 'name') {
        const name = extractName(query);
        const foundEmail = extractEmail(query);
        const volunteeredEmail = foundEmail && (
          query.trim() === foundEmail || /\b(my email|email is|reach me at)\b/i.test(query)
        ) ? foundEmail : null;
        if (name) {
          const nextCustomer = {
            ...pendingCustomer,
            name,
            ...(volunteeredEmail && isValidEmail(volunteeredEmail) ? { email: volunteeredEmail.toLowerCase() } : {}),
          };
          setPendingCustomer(nextCustomer);
          const businessReply = /[?]|\b(website|web|software|mobile|app|automation|workflow|ai|chatbot|qa|testing|cloud|chrome|extension|consulting|service|pricing|cost|quote|timeline|portfolio|project|dashboard|crm|development)\b/i.test(query)
            ? `${getBotResponse(query)}\n\n`
            : '';
          if (nextCustomer.email) {
            setOnboardingStep('consent');
            reply = `${businessReply}Thanks, ${name}. Would you like me to save your details and this conversation securely so our team can follow up? This is optional; you can also keep chatting without saving anything.`;
          } else {
            setOnboardingStep('email');
            reply = `${businessReply}Nice to meet you, ${name}. If you’d like, what’s the best email to reach you? You can skip it or ask me anything instead.`;
          }
        } else if (volunteeredEmail && isValidEmail(volunteeredEmail)) {
          setPendingCustomer(current => ({ ...current, email: volunteeredEmail.toLowerCase() }));
          reply = 'Thanks, I have that. What name should I use for you? You can skip sharing it if you prefer.';
        } else {
          reply = getBotResponse(query);
          if (!namePromptReminderRef.current) {
            reply += '\n\nBy the way, what should I call you? Sharing your name is optional.';
            namePromptReminderRef.current = true;
          }
        }
      } else if (onboardingStep === 'email' && isSkip(query)) {
        setOnboardingStep('consent');
        reply = `No problem${pendingCustomer.name ? `, ${pendingCustomer.name}` : ''}. Would you like me to save the details you shared and this conversation securely so our team can follow up? This is optional.`;
      } else if (onboardingStep === 'email') {
        const email = extractEmail(query);
        if (email && isValidEmail(email)) {
          setPendingCustomer(current => ({ ...current, email: email.toLowerCase() }));
          setOnboardingStep('consent');
          const businessReply = /[?]|\b(website|web|software|mobile|app|automation|workflow|ai|chatbot|qa|testing|cloud|chrome|extension|consulting|service|pricing|cost|quote|timeline|portfolio|project|dashboard|crm|development)\b/i.test(query.replace(email, ''))
            ? `${getBotResponse(query)}\n\n`
            : '';
          reply = `${businessReply}Thanks${pendingCustomer.name ? `, ${pendingCustomer.name}` : ''}. Would you like me to save your details and this conversation securely so our team can follow up? This is optional; you can keep chatting without saving anything.`;
        } else if (query.includes('@') || (!/\s/.test(query) && /[._+-]/.test(query))) {
          reply = 'That email doesn’t look quite right. Could you check it once? Sharing an email is optional, so you can also type “skip.”';
        } else {
          reply = `${getBotResponse(query)}\n\nYou can share an email if you’d like us to follow up, or type “skip.”`;
        }
      } else {
        reply = getBotResponse(query);
      }

      const botMessage = makeMessage('bot', reply);
      setMessages(current => [...current, botMessage]);
      if (profileSaved) persistMessage(botMessage);
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
        className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#dfe8d7] via-[#f2e7c9] to-[#e6bd68] px-4 py-3 text-sm font-bold text-[#493a2e] transition-colors ${triggerClassName}`}
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
        <span className="bot-trigger-label hidden sm:inline">{botName} AI</span>
        {hasUnread && <span className="ai-unread-dot" aria-label="Vini has a new answer" />}
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <section
          className="fixed bottom-20 right-3 z-[70] flex h-[min(620px,calc(100vh-96px))] w-[calc(100vw-24px)] max-w-[410px] flex-col overflow-hidden rounded-2xl border border-[#e3dfd1] bg-[#fffdf8] sm:bottom-24 sm:right-6"
          aria-label={`${botName} Assistant`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#d9e3df] bg-gradient-to-r from-[#e8eee2] via-[#edf1eb] to-[#e6efec] px-4 py-3.5 text-[#493a2e]">
            <div className="flex items-center gap-3">
              <span className="bot-icon-wrap size-10">
                <img src={botAvatar} alt={botName} className="size-full object-cover" />
              </span>
              <div>
                <h3 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  {botName} AI
                  <Sparkles size={14} className="text-[#c49339]" />
                </h3>
                <p className="text-xs text-[#796b52]">Vinfowise Intelligent Assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-[#706557] hover:bg-white/70 hover:text-[#493a2e]"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-messages min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 space-y-3.5 text-sm bg-[#f8f7f1]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'bot' && (
                  <div className="size-7 shrink-0 rounded-full bg-[#e5efee] flex items-center justify-center text-[#54868d] mt-0.5">
                    <Bot size={15} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#d5a649] text-[#fffdf8] shadow-sm'
                      : 'border border-[#e3dfd1] bg-[#fffdf8] text-[#625543] shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="size-7 shrink-0 rounded-full bg-[#e8eee2] flex items-center justify-center text-[#718365] mt-0.5">
                  <Bot size={15} />
                </div>
                <div className="rounded-2xl border border-[#e3dfd1] bg-[#fffdf8] px-4 py-2 text-xs text-[#817766] italic">
                  {botName} is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="border-t border-[#e3dfd1] bg-[#fffdf8] px-3 py-2 flex gap-1.5 overflow-x-auto no-scrollbar">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="shrink-0 rounded-full border border-[#ded8c8] bg-[#f0f1e9] px-3 py-1 text-xs font-medium text-[#65785b] transition hover:bg-[#e6ebdf]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {onboardingStep === 'consent' && (
            <div className="flex flex-wrap gap-2 border-t border-[#e3dfd1] bg-[#fffdf8] px-3 py-2">
              <button type="button" onClick={() => saveConsent(messages)} className="rounded-full bg-[#d5a649] px-3 py-1.5 text-xs font-semibold text-white">
                Yes, save securely
              </button>
              <button type="button" onClick={() => declineConsent(messages)} className="rounded-full border border-[#ded8c8] px-3 py-1.5 text-xs font-semibold text-[#625543]">
                No, continue without saving
              </button>
              <a href="/privacy-policy" className="self-center text-xs font-semibold text-[#46797e] underline underline-offset-2">Privacy details</a>
            </div>
          )}

          {storageError && <p role="status" className="border-t border-[#e3dfd1] bg-[#fff8e9] px-3 py-2 text-xs leading-5 text-[#76551b]">{storageError}</p>}

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-[#e3dfd1] bg-[#fffdf8] p-3"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              inputMode={onboardingStep === 'email' ? 'email' : undefined}
              placeholder={onboardingStep === 'name' ? 'Your name (optional), or ask a question...' : onboardingStep === 'email' ? 'Your email (optional), or ask a question...' : 'Ask anything about our IT services...'}
              className="min-w-0 flex-1 rounded-xl border border-[#ded8c8] bg-[#f8f7f1] px-3.5 py-2 text-sm text-[#493a2e] focus:border-[#c49339] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#c6953b] text-[#fffdf8] transition hover:bg-[#b98731] disabled:opacity-40"
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
