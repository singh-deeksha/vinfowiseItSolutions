import { Link } from 'react-router-dom';
import { MessageSquareQuote, MessageCircle } from 'lucide-react';
import ViniChatbot from './ViniChatbot';
import { useSiteContent } from '../context/SiteContentContext';

export default function FloatingWidgets() {
  const { getWhatsAppUrl } = useSiteContent();

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5 sm:bottom-5 sm:right-5">
      {/* WhatsApp Floating Quick Action */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring flex size-11 sm:size-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 transition hover:-translate-y-0.5 hover:scale-105 hover:bg-emerald-700"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
      </a>

      {/* Direct Contact Button */}
      <Link
        to="/contact"
        className="focus-ring hidden size-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl shadow-slate-950/20 ring-1 ring-white/20 transition hover:-translate-y-1 hover:scale-105 sm:inline-flex dark:bg-white dark:text-slate-950"
        aria-label="Request quote"
        title="Request quote"
      >
        <MessageSquareQuote size={20} strokeWidth={2.2} />
      </Link>

      {/* Vini AI Chatbot */}
      <ViniChatbot triggerClassName="size-11 sm:size-12 rounded-full !px-0 !py-0 flex items-center justify-center" />
    </div>
  );
}
