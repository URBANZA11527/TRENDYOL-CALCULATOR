
import React, { useState, useEffect } from 'react';
import SingleCalculator from './components/SingleCalculator';
import BulkCalculator from './components/BulkCalculator';
import CommissionHelper from './components/CommissionHelper';

type Tab = 'single' | 'bulk';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('single');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-orange-500/30 transition-colors duration-700 ${theme === 'light' ? 'mesh-gradient-light' : ''}`}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[10%] right-[0%] w-[30%] h-[30%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse"></div>
          </>
        ) : (
          <>
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-orange-200/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[5%] right-[0%] w-[40%] h-[40%] bg-blue-200/20 blur-[100px] rounded-full animate-pulse"></div>
          </>
        )}
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="glass-card rounded-[2rem] px-6 py-4 flex items-center justify-between shadow-2xl overflow-hidden relative">
            {theme === 'light' && <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/60 -z-10"></div>}
            
            <div className="flex items-center gap-5">
              <div className="bg-orange-500 p-3 rounded-2xl shadow-xl shadow-orange-500/30 animate-float flex items-center justify-center transform hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-900 tracking-tighter dark:text-white light:text-slate-900 glow-text transition-colors">TRENDYOL <span className="text-orange-500">KSA</span></h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <p className="text-[10px] dark:text-slate-500 light:text-slate-500 uppercase font-800 tracking-[0.25em]">Financial Intelligence Hub</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl dark:bg-white/5 light:bg-slate-100 border dark:border-white/10 light:border-slate-200 dark:text-orange-400 light:text-orange-500 hover:scale-110 transition-all active:scale-95 group shadow-sm"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>

              <nav className="flex dark:bg-white/5 light:bg-slate-100 p-1.5 rounded-2xl border dark:border-white/10 light:border-slate-200 shadow-inner">
                <button
                  onClick={() => setActiveTab('single')}
                  className={`px-6 py-2.5 text-[11px] font-900 uppercase tracking-widest rounded-xl transition-all duration-500 ${
                    activeTab === 'single'
                      ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30 scale-[1.05]'
                      : 'dark:text-slate-400 light:text-slate-500 hover:text-orange-500'
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setActiveTab('bulk')}
                  className={`px-6 py-2.5 text-[11px] font-900 uppercase tracking-widest rounded-xl transition-all duration-500 ${
                    activeTab === 'bulk'
                      ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30 scale-[1.05]'
                      : 'dark:text-slate-400 light:text-slate-500 hover:text-orange-500'
                  }`}
                >
                  Bulk
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">
            {activeTab === 'single' ? <SingleCalculator /> : <BulkCalculator />}
          </div>

          <div className="lg:col-span-1 space-y-10">
            <CommissionHelper />
            
            <div className="glass-card rounded-[2.5rem] p-10 dark:text-white light:text-slate-800 relative overflow-hidden group transition-all duration-500 border border-transparent hover:border-orange-500/20">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-30 transition-all duration-700 rotate-12 group-hover:rotate-0 dark:text-white light:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <h3 className="text-orange-500 font-900 text-[11px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-orange-500/50"></span> Terminal Insights
              </h3>
              <ul className="space-y-6">
                <InsightItem icon="📈" text="Decimal inputs are high-precision: 0.15 = 15%." />
                <InsightItem icon="📦" text="Batch processing reduces analysis latency by 85%." />
                <InsightItem icon="🎯" text="Profit margins are visually audited for rapid risk detection." />
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-16 border-t dark:border-white/5 light:border-slate-200 mt-20 transition-colors bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-900 dark:text-slate-500 light:text-slate-600 uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} Trendyol Logistics Systems
            </p>
            <p className="text-[9px] font-700 dark:text-slate-600 light:text-slate-400 uppercase tracking-widest">KSA Region Authorized Interface</p>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-900 dark:text-slate-500 light:text-slate-500 uppercase tracking-tighter">Precision Core Validated</span>
              <div className="w-24 h-1.5 dark:bg-white/10 light:bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 w-[85%] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const InsightItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex gap-5 group cursor-default">
    <div className="text-2xl shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 transform-gpu">{icon}</div>
    <p className="text-[11px] dark:text-slate-400 light:text-slate-600 font-700 leading-relaxed group-hover:dark:text-slate-200 group-hover:light:text-slate-900 transition-colors uppercase tracking-tight">{text}</p>
  </li>
);

export default App;
