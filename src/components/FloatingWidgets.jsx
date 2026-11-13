import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import ViniChatbot from './ViniChatbot.jsx';

export default function FloatingWidgets() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <Link
        to="/contact"
        className="focus-ring flex size-14 items-center justify-center rounded-full border border-[#cbdcda] bg-[#e5efee] text-[#54868d] transition-colors hover:border-[#c6953b]"
        aria-label="Contact Vinfowise"
        title="Contact Vinfowise"
      >
        <Send size={22} />
      </Link>
      <ViniChatbot triggerClassName="size-14 rounded-full !gap-0 !border !border-[#ded8c8] !bg-[#fffdf8] !p-0 [&_.bot-trigger-label]:hidden" />
    </div>
  );
}
