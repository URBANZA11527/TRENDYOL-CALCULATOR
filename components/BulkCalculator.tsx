
import React, { useState, useRef, useMemo } from 'react';
import { BulkDataRow, CalculationInputs } from '../types';
import { calculateResults, formatCurrency, formatPercent } from '../calculations';

const BulkCalculator: React.FC = () => {
  const [data, setData] = useState<BulkDataRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const summary = useMemo(() => {
    const total = data.reduce((acc, row) => ({
      quantity: acc.quantity + row.quantity,
      grossRevenue: acc.grossRevenue + row.grossRevenue,
      commissionFee: acc.commissionFee + row.commissionFee,
      profit: acc.profit + row.profit,
      discountAmount: acc.discountAmount + row.discountAmount,
      sellerFundedDiscount: acc.sellerFundedDiscount + row.sellerFundedDiscount,
      trendyolFundedDiscount: acc.trendyolFundedDiscount + row.trendyolFundedDiscount,
      adjGrossRevenue: acc.adjGrossRevenue + row.adjustedGrossRevenue,
      adjCommissionFee: acc.adjCommissionFee + row.adjustedCommissionFee,
      adjProfit: acc.adjProfit + row.adjustedProfit,
      marginSum: acc.marginSum + row.profitMargin,
      adjMarginSum: acc.adjMarginSum + row.adjustedProfitMargin,
    }), {
      quantity: 0, grossRevenue: 0, commissionFee: 0, profit: 0,
      discountAmount: 0, sellerFundedDiscount: 0, trendyolFundedDiscount: 0,
      adjGrossRevenue: 0, adjCommissionFee: 0, adjProfit: 0,
      marginSum: 0, adjMarginSum: 0
    });

    const count = data.length || 1;
    return {
      ...total,
      avgProfitMargin: total.marginSum / count,
      avgAdjProfitMargin: total.adjMarginSum / count
    };
  }, [data]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').slice(1);
      const parsedData: BulkDataRow[] = rows.filter(row => row.trim()).map((row, index) => {
        const columns = row.split(',').map(c => c.trim());
        const inputs: CalculationInputs = {
          salePrice: parseFloat(columns[1]) || 0,
          quantity: parseFloat(columns[2]) || 0,
          commissionRate: parseFloat(columns[3]) || 0,
          shippingCostPaidBySeller: parseFloat(columns[4]) || 0,
          cogs: parseFloat(columns[5]) || 0,
          expenses: parseFloat(columns[6]) || 0,
          campaignParticipation: columns[7]?.toLowerCase() === 'yes',
          campaignDiscountRate: parseFloat(columns[8]) || 0.25,
          trendyolCoverageRate: parseFloat(columns[9]) || 0.30,
        };
        const res = calculateResults(inputs);
        return { id: crypto.randomUUID(), ...inputs, ...res, productLabel: columns[0] || `ID_${index + 1}` };
      });
      setData(parsedData);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdateRow = (id: string, field: keyof CalculationInputs, value: any) => {
    setData(prev => prev.map(row => {
      if (row.id === id) {
        const updatedInputs = { ...row, [field]: value } as CalculationInputs;
        const res = calculateResults(updatedInputs);
        return { ...row, ...updatedInputs, ...res };
      }
      return row;
    }));
  };

  const downloadCSV = () => {
    const headers = ['Ref', 'Price', 'Qty', 'Comm', 'Ship', 'COGS', 'Exp', 'Camp', 'Disc', 'Cov', 'Gross', 'Profit', 'Margin'];
    const rows = data.map(r => [
      r.productLabel || 'UNIT', r.salePrice, r.quantity, r.commissionRate, r.shippingCostPaidBySeller, r.cogs, r.expenses, r.campaignParticipation ? 'Yes' : 'No', r.campaignDiscountRate, r.trendyolCoverageRate,
      r.grossRevenue, r.profit, r.profitMargin
    ].join(','));
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Batch_Intelligence_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  const createEmptyRow = (): BulkDataRow => {
    const inputs: CalculationInputs = {
      salePrice: 0,
      quantity: 0,
      commissionRate: 0,
      shippingCostPaidBySeller: 0,
      cogs: 0,
      expenses: 0,
      campaignParticipation: false,
      campaignDiscountRate: 0.25,
      trendyolCoverageRate: 0.30,
    };
    return { id: crypto.randomUUID(), ...inputs, ...calculateResults(inputs), productLabel: `NODE_${data.length + 1}` };
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Batch Control Station - Elevated Design */}
      <div className="glass-card rounded-[3rem] p-10 dark:border-white/5 light:border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10 glass-card-hover group/control">
        <div>
          <h2 className="text-3xl font-900 dark:text-white light:text-slate-900 tracking-tighter flex items-center gap-4">
             Terminal Vector
          </h2>
          <p className="text-[11px] dark:text-slate-500 light:text-slate-400 font-900 uppercase tracking-[0.4em] mt-2">Parallel Processing Array</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <input type="file" accept=".csv" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="group px-8 py-5 dark:bg-white/5 light:bg-white dark:text-white light:text-slate-700 text-[11px] font-900 uppercase tracking-[0.25em] rounded-2xl border dark:border-white/10 light:border-slate-200 hover:scale-105 transition-all active:scale-95 flex items-center gap-4 shadow-sm shadow-slate-900/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-[-2px] transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            Import Data
          </button>
          <button onClick={() => setData([...data, createEmptyRow()])} className="px-8 py-5 dark:bg-white light:bg-slate-900 dark:text-black light:text-white text-[11px] font-900 uppercase tracking-[0.25em] rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-orange-500/20">
            Deploy Row
          </button>
          <button disabled={data.length === 0} onClick={downloadCSV} className="px-8 py-5 bg-orange-500 hover:bg-orange-600 disabled:opacity-20 text-white text-[11px] font-900 uppercase tracking-[0.25em] rounded-2xl transition-all shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 flex items-center gap-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-[2px] transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
             Export Analysis
          </button>
        </div>
      </div>

      {/* Grid Interface - Pro Table */}
      <div className="glass-card rounded-[3rem] dark:border-white/5 light:border-slate-100 shadow-2xl overflow-hidden border border-transparent hover:border-orange-500/10 transition-colors">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-[11px] whitespace-nowrap font-900 uppercase">
            <thead className="dark:bg-white/5 light:bg-slate-50 border-b dark:border-white/5 light:border-slate-200">
              <tr>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em]">Ref Node</th>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em]">Unit Price</th>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em]">Qty</th>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em]">Comm%</th>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em]">Logic</th>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em]">Net N</th>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em]">Net Z</th>
                <th className="px-10 py-7 font-900 dark:text-slate-500 light:text-slate-400 tracking-[0.3em] text-center">Ctrl</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/5 light:divide-slate-100">
              {data.map((row) => (
                <tr key={row.id} className="dark:hover:bg-white/[0.03] light:hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <span className="font-900 dark:text-slate-400 light:text-slate-600 font-mono tracking-tighter opacity-80 group-hover:text-orange-500 transition-colors">{row.productLabel || 'NODE'}</span>
                  </td>
                  <td className="px-10 py-6">
                    <input type="number" value={row.salePrice === 0 ? '' : row.salePrice} placeholder="0.00" onChange={(e) => handleUpdateRow(row.id, 'salePrice', parseFloat(e.target.value) || 0)} className="w-28 bg-transparent border-transparent focus:border-orange-500/40 border-b dark:border-white/5 light:border-slate-200 px-2 py-2 font-mono font-900 dark:text-white light:text-slate-900 outline-none placeholder:opacity-20 transition-all text-[14px]" />
                  </td>
                  <td className="px-10 py-6">
                    <input type="number" value={row.quantity === 0 ? '' : row.quantity} placeholder="0" onChange={(e) => handleUpdateRow(row.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-16 bg-transparent border-transparent focus:border-orange-500/40 border-b dark:border-white/5 light:border-slate-200 px-2 py-2 font-mono font-900 dark:text-white light:text-slate-900 outline-none placeholder:opacity-20 transition-all text-[14px]" />
                  </td>
                  <td className="px-10 py-6">
                    <input type="number" step="0.01" value={row.commissionRate === 0 ? '' : row.commissionRate} placeholder="0.00" onChange={(e) => handleUpdateRow(row.id, 'commissionRate', parseFloat(e.target.value) || 0)} className="w-20 bg-transparent border-transparent focus:border-orange-500/40 border-b dark:border-white/5 light:border-slate-200 px-2 py-2 font-mono font-900 dark:text-white light:text-slate-900 outline-none placeholder:opacity-20 transition-all text-[14px]" />
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex justify-center">
                      <input type="checkbox" checked={row.campaignParticipation} onChange={(e) => handleUpdateRow(row.id, 'campaignParticipation', e.target.checked)} className="w-5 h-5 rounded-lg dark:border-white/20 light:border-slate-300 dark:bg-white/5 light:bg-white text-orange-500 focus:ring-orange-500 cursor-pointer transition-all active:scale-75 shadow-sm" />
                    </div>
                  </td>
                  <td className={`px-10 py-6 font-mono font-900 text-[15px] tracking-tighter ${row.profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {row.profit.toFixed(2)}
                  </td>
                  <td className={`px-10 py-6 font-mono font-900 text-[15px] tracking-tighter ${row.adjustedProfit >= 0 ? 'text-orange-500' : 'text-rose-500'}`}>
                    {row.adjustedProfit.toFixed(2)}
                  </td>
                  <td className="px-10 py-6 text-center">
                    <button onClick={() => setData(prev => prev.filter(r => r.id !== row.id))} className="p-3 dark:text-slate-700 light:text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 active:scale-90 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-10 py-48 text-center">
                    <div className="flex flex-col items-center gap-8 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="animate-float dark:text-white light:text-slate-900"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/></svg>
                      <p className="font-900 uppercase tracking-[0.6em] text-[12px] dark:text-white light:text-slate-900">Array Matrix Standby</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aggregate Intelligence Dashboard - Deep Mesh Look */}
      <div className="glass-card rounded-[4rem] p-8 md:p-16 dark:border-white/5 light:border-slate-100 relative overflow-hidden group/dash shadow-[0_50px_100px_-20px_rgba(15,23,42,0.12)]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] dark:bg-orange-500/5 light:bg-orange-500/[0.08] blur-[120px] rounded-full group-hover/dash:dark:bg-orange-500/10 group-hover/dash:light:bg-orange-500/15 transition-all duration-1000"></div>
        <div className="relative z-10 flex flex-col gap-12 md:gap-16">
          <div className="flex justify-between items-end border-b dark:border-white/5 light:border-slate-100 pb-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-900 dark:text-white light:text-slate-900 tracking-tighter mb-3">Vector Aggregator</h3>
              <p className="text-slate-500 text-[11px] font-900 uppercase tracking-[0.4em] ml-1">Real-time Consensus</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[10px] font-900 uppercase tracking-[0.3em] mb-2 md:mb-4 opacity-40">Unit Volume</p>
              <p className="dark:text-white light:text-slate-900 text-4xl md:text-6xl font-mono font-900 tracking-tighter glow-text leading-none">{summary.quantity}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
            <SummaryBlock label="Gross Projection" value={formatCurrency(summary.grossRevenue)} />
            <SummaryBlock label="Platform Leakage" value={formatCurrency(summary.commissionFee)} color="text-rose-500" />
            <SummaryBlock label="Net Yield" value={formatCurrency(summary.profit)} color="text-emerald-500" />
            <SummaryBlock label="Yield Margin" value={formatPercent(summary.avgProfitMargin)} color="text-emerald-500" />
            
            <SummaryBlock label="Camp. Gross" value={formatCurrency(summary.adjGrossRevenue)} />
            <SummaryBlock label="Subsidy Credit" value={formatCurrency(summary.discountAmount)} color="dark:text-cyan-400 light:text-blue-500" />
            <SummaryBlock label="Adj. Net Yield" value={formatCurrency(summary.adjProfit)} color="text-orange-500" />
            <SummaryBlock label="Adj. Efficiency" value={formatPercent(summary.avgAdjProfitMargin)} color="text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryBlock: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = "dark:text-white light:text-slate-900" }) => (
  <div className="flex flex-col group/block transition-all duration-700 hover:scale-105 transform-gpu origin-left overflow-hidden">
    <span className="text-slate-500 dark:text-slate-500 text-[9px] uppercase font-900 tracking-wider mb-3 md:mb-4 border-l-3 dark:border-slate-800 light:border-slate-200 pl-4 md:pl-6 group-hover/block:border-orange-500 transition-colors truncate">{label}</span>
    <span className={`text-lg md:text-2xl font-mono font-900 tracking-tighter pl-4 md:pl-6 ${color} transition-all duration-500 whitespace-nowrap overflow-hidden text-ellipsis`}>{value}</span>
  </div>
);

export default BulkCalculator;
