
import React from 'react';

const CommissionHelper: React.FC = () => {
  const commonRates = [
    { category: 'Accessories', rate: '17.00%' },
    { category: 'Electronics', rate: '10.00%' },
    { category: 'Apparel', rate: '16.50%' },
    { category: 'Home', rate: '15.00%' },
    { category: 'Beauty', rate: '14.00%' },
    { category: 'Baby', rate: '13.00%' },
  ];

  return (
    <div className="glass-card rounded-[3rem] dark:border-white/5 light:border-slate-100 overflow-hidden transition-all duration-700 glass-card-hover border-transparent hover:border-orange-500/20 group/library shadow-2xl">
      <div className="p-8 border-b dark:border-white/5 light:border-slate-50 dark:bg-white/[0.02] light:bg-slate-50 flex items-center gap-5 transition-colors group-hover/library:light:bg-white">
        <div className="p-3.5 dark:bg-white/5 light:bg-white rounded-2xl border dark:border-white/10 light:border-slate-200 text-orange-500 animate-float shadow-xl shadow-slate-900/5 group-hover/library:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div>
          <h3 className="text-[11px] font-900 dark:text-slate-300 light:text-slate-700 uppercase tracking-[0.4em]">Rate Archive</h3>
          <p className="text-[9px] font-800 text-slate-400 uppercase tracking-widest mt-1">Verified Node Standards</p>
        </div>
      </div>
      <div className="p-10">
        <ul className="space-y-6">
          {commonRates.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center group cursor-default">
              <span className="text-[12px] dark:text-slate-500 light:text-slate-500 font-900 transition-all group-hover:dark:text-slate-300 group-hover:light:text-slate-900 tracking-tighter uppercase">{item.category}</span>
              <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full dark:bg-orange-500/20 light:bg-slate-200 group-hover:bg-orange-500 transition-all shadow-sm"></div>
                  <span className="font-mono text-[12px] font-900 text-orange-500 group-hover:scale-125 transition-transform origin-right">{item.rate}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 pt-10 border-t dark:border-white/5 light:border-slate-100">
          <div className="dark:bg-orange-500/5 light:bg-orange-50 rounded-[2rem] p-6 border dark:border-orange-500/10 light:border-orange-500/10 shadow-inner group-hover/library:scale-[1.05] transition-transform duration-500">
            <p className="text-[10px] dark:text-slate-500 light:text-slate-500 font-900 italic leading-relaxed text-center uppercase tracking-tight">
              Operational vectors are dynamic. Synchronize with Central Registry frequently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionHelper;
