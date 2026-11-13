import { Activity, CheckCircle2, Zap, BarChart2 } from 'lucide-react';

export default function CommandCenterCard() {
  return (
    <div className="rounded-2xl border border-[#e3dfd1] bg-[#fffdf8] p-6 sm:p-7">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#ebe7dc] pb-4">
        <div>
          <h3 className="text-sm font-bold text-[#493a2e]">Vinfowise Command Center</h3>
          <p className="text-xs text-[#817766]">Projects, leads, automation, and delivery</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6e8c9] px-2.5 py-1 text-xs font-semibold text-[#89651f]">
          <span className="size-1.5 rounded-full bg-[#c6953b]" />
          Live Preview
        </span>
      </div>

      {/* Metrics Row */}
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,5rem),1fr))] divide-x divide-[#e3dfd1] border-y border-[#e3dfd1] py-3">
        <div className="px-3 first:pl-0">
          <div className="flex items-center gap-2 text-[#5b8d92]"><Activity size={16} /><span className="text-xl font-black text-[#493a2e]">24</span></div>
          <div className="mt-1 text-xs text-[#817766]">Leads</div>
        </div>
        <div className="px-3">
          <div className="flex items-center gap-2 text-[#5b8d92]"><CheckCircle2 size={16} /><span className="text-xl font-black text-[#493a2e]">91%</span></div>
          <div className="mt-1 text-xs text-[#817766]">Tasks</div>
        </div>
        <div className="px-3 last:pr-0">
          <div className="flex items-center gap-2 text-[#b1873b]"><Zap size={16} /><span className="text-xl font-black text-[#493a2e]">2.4x</span></div>
          <div className="mt-1 text-xs text-[#817766]">Speed</div>
        </div>
      </div>

      {/* Pipeline Status */}
      <div className="mt-5 rounded-2xl border border-[#e6e2d7] bg-[#faf9f4] p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-[#625543]">
          <span>Delivery Pipeline</span>
          <BarChart2 size={15} className="text-[#b1873b]" />
        </div>

        <div className="mt-3 space-y-3">
          <div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#625543]">Website project</span>
              <span className="text-[#54868d]">82%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#e8e4d8]">
              <div className="h-full rounded-full bg-[#8eb7bd]" style={{ width: '82%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#625543]">Automation flow</span>
              <span className="text-[#75886c]">100%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#e8e4d8]">
              <div className="h-full rounded-full bg-[#aebd9f]" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#625543]">AI chatbot</span>
              <span className="text-[#a47c2f]">36%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#e8e4d8]">
              <div className="h-full rounded-full bg-[#e1bb68]" style={{ width: '36%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tech Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {['React', 'Python', 'Automation', 'AI', 'Cloud'].map(tag => (
          <span
            key={tag}
            className="rounded-lg border border-[#e3dfd1] bg-[#fffdf8] px-2.5 py-1 text-xs font-medium text-[#706557]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
