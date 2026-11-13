import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import ViniChatbot from './ViniChatbot.jsx';

export default function FloatingWidgets() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <Link
        to="/contact"
        className="focus-ring flex size-14 items-center justify-center rounded-full border border-white/15 bg-slate-950 text-white shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-cyan-300"
        aria-label="Contact Vinfowise"
        title="Contact Vinfowise"
      >
        <Send size={22} />
      </Link>
      <ViniChatbot triggerClassName="size-14 rounded-full !gap-0 !border !border-slate-200 !bg-white !p-0 !shadow-xl [&_.bot-trigger-label]:hidden" />
    </div>
  );
}
