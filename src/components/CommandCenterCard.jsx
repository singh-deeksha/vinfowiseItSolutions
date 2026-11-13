import { Activity, CheckCircle2, Zap, BarChart2 } from 'lucide-react';

export default function CommandCenterCard() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Vinfowise Command Center</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Projects, leads, automation, and delivery</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
          <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
          Live Preview
        </span>
      </div>

      {/* Metrics Row */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-white/5 dark:bg-white/5">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <Activity size={16} />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">24</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Leads</div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-white/5 dark:bg-white/5">
          <div className="flex items-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={16} />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">91%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Tasks</div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-white/5 dark:bg-white/5">
          <div className="flex items-center text-indigo-600 dark:text-indigo-400">
            <Zap size={16} />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900 dark:text-white">2.4x</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Speed</div>
        </div>
      </div>

      {/* Pipeline Status */}
      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-white/5 dark:bg-white/5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Delivery Pipeline</span>
          <BarChart2 size={15} className="text-blue-500" />
        </div>

        <div className="mt-3 space-y-3">
          <div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-800 dark:text-slate-200">Website project</span>
              <span className="text-blue-600 dark:text-blue-400">82%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700">
              <div className="h-full rounded-full bg-blue-600" style={{ width: '82%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-800 dark:text-slate-200">Automation flow</span>
              <span className="text-emerald-600 dark:text-emerald-400">100%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-800 dark:text-slate-200">AI chatbot</span>
              <span className="text-indigo-600 dark:text-indigo-400">36%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700">
              <div className="h-full rounded-full bg-indigo-500" style={{ width: '36%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tech Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {['React', 'Python', 'Automation', 'AI', 'Cloud'].map(tag => (
          <span
            key={tag}
            className="rounded-lg border border-slate-200/70 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
