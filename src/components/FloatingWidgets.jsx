import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import ViniChatbot from './ViniChatbot.jsx';

export default function FloatingWidgets() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <Link
        to="/contact"
        className="focus-ring flex size-14 items-center justify-center rounded-full border border-[#d8d6c9] bg-[#e8eee2] text-[#718365] shadow-xl shadow-[#76634a]/15 transition hover:-translate-y-1 hover:border-[#c6953b]"
        aria-label="Contact Vinfowise"
        title="Contact Vinfowise"
      >
        <Send size={22} />
      </Link>
      <ViniChatbot triggerClassName="size-14 rounded-full !gap-0 !border !border-[#ded8c8] !bg-[#fffdf8] !p-0 !shadow-xl [&_.bot-trigger-label]:hidden" />
    </div>
  );
}
