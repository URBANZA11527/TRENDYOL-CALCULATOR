
import React, { useState, useEffect } from 'react';
import { CalculationInputs, CalculationOutputs } from '../types';
import { calculateResults, formatCurrency, formatPercent } from '../calculations';

const SingleCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    salePrice: 0,
    quantity: 0,
    commissionRate: 0,
    shippingCostPaidBySeller: 0,
    cogs: 0,
    expenses: 0,
    campaignParticipation: false,
    campaignDiscountRate: 0.25,
    trendyolCoverageRate: 0.30,
  });

  const [results, setResults] = useState<CalculationOutputs | null>(null);

  useEffect(() => {
    setResults(calculateResults(inputs));
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let newValue: string | number | boolean = value;

    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'number') {
      const parsedValue = value === '' ? 0 : parseFloat(value);
      newValue = Math.max(0, parsedValue || 0);
      
      if (['commissionRate', 'campaignDiscountRate', 'trendyolCoverageRate'].includes(name)) {
        newValue = Math.min(1, newValue as number);
      }
    }

    setInputs(prev => ({ ...prev, [name]: newValue }));
  };

  if (!results) return null;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Primary Data Input Grid */}
      <div className="glass-card p-1 overflow-hidden group">
        <div className="px-12 py-10 border-b dark:border-white/5 light:border-slate-300/30 flex justify-between items-center relative">
          <div>
            <h2 className="text-2xl font-900 dark:text-white light:text-slate-800 tracking-tighter flex items-center gap-4">
              <span className="w-2.5 h-10 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></span>
              Core Simulation
            </h2>
            <p className="text-[11px] font-900 uppercase tracking-[0.3em] mt-2 ml-6 dark:text-orange-500/80 light:text-slate-500">Operational Parameters</p>
          </div>
          <div className="px-6 py-2.5 rounded-2xl border dark:bg-white/5 light:bg-white/50 dark:border-white/10 light:border-white flex items-center gap-3 shadow-sm transition-transform hover:scale-105">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[11px] font-900 dark:text-slate-300 light:text-slate-700 tracking-tighter uppercase">KSA / SAR</span>
          </div>
        </div>
        
        <div className="p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            <InputGroup label="Unit Sale Price" name="salePrice" value={inputs.salePrice} onChange={handleInputChange} prefix="SAR" />
            <InputGroup label="Quantity" name="quantity" value={inputs.quantity} onChange={handleInputChange} />
            <InputGroup label="Commission %" name="commissionRate" value={inputs.commissionRate} onChange={handleInputChange} step="0.01" hint="e.g. 0.15 for 15%" />
            <InputGroup label="Seller Shipping" name="shippingCostPaidBySeller" value={inputs.shippingCostPaidBySeller} onChange={handleInputChange} prefix="SAR" />
            <InputGroup label="Product COGS" name="cogs" value={inputs.cogs} onChange={handleInputChange} prefix="SAR" />
            <InputGroup label="Operating Expenses" name="expenses" value={inputs.expenses} onChange={handleInputChange} prefix="SAR" />
          </div>
        </div>

        {/* Campaign Logic Switcher */}
        <div className={`p-12 border-t transition-all duration-700 ${inputs.campaignParticipation ? 'dark:bg-orange-500/[0.03] light:bg-orange-500/[0.02] border-orange-500/20' : 'bg-transparent dark:border-white/5 light:border-slate-300/30'}`}>
          <div className="flex items-center justify-between">
            <label className="relative inline-flex items-center cursor-pointer group">
              <input
                type="checkbox"
                name="campaignParticipation"
                checked={inputs.campaignParticipation}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-16 h-8 dark:bg-slate-800 light:bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 shadow-lg"></div>
              <span className="ml-6 text-xs font-900 dark:text-slate-400 light:text-slate-600 uppercase tracking-[0.2em] group-hover:text-orange-500 transition-colors">Campaign Logic</span>
            </label>
            {inputs.campaignParticipation && (
                <div className="flex items-center gap-3 text-[11px] font-900 text-orange-600 dark:bg-orange-500/10 light:bg-white px-5 py-2 rounded-2xl border border-orange-500/20 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    ACTIVE SYSTEM INFLUENCE
                </div>
            )}
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 ease-[cubic-bezier(0.19, 1, 0.22, 1)] overflow-hidden ${inputs.campaignParticipation ? 'max-h-[500px] opacity-100 mt-12 mb-4' : 'max-h-0 opacity-0 mt-0 mb-0'}`}>
            <InputGroup label="Campaign Discount" name="campaignDiscountRate" value={inputs.campaignDiscountRate} onChange={handleInputChange} step="0.01" hint="Default: 0.25" />
            <InputGroup label="Trendyol Support" name="trendyolCoverageRate" value={inputs.trendyolCoverageRate} onChange={handleInputChange} step="0.01" hint="Default: 0.30" />
          </div>
        </div>
      </div>

      {/* Output Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Standard View */}
        <div className="glass-card rounded-[3rem] overflow-hidden flex flex-col transition-all duration-700 glass-card-hover group/std">
          <div className="px-10 py-5 dark:bg-white/[0.03] light:bg-white/50 border-b dark:border-white/5 light:border-white flex justify-between items-center group-hover/std:bg-slate-900 transition-colors duration-500 group-hover/std:dark:bg-orange-500">
            <span className="font-900 uppercase text-[11px] tracking-[0.4em] dark:text-slate-500 light:text-slate-400 group-hover/std:text-white transition-colors">Standard Analysis</span>
            <span className="text-[10px] font-bold dark:text-slate-600 light:text-slate-400 font-mono group-hover/std:text-white/50 transition-colors">V_STD_01</span>
          </div>
          <div className="p-12 flex-1 space-y-6">
            <DataLine label="Gross Revenue" value={formatCurrency(results.grossRevenue)} />
            <DataLine label="Commission Fee" value={formatCurrency(results.commissionFee)} color="text-rose-500" prefix="-" />
            <DataLine label="Net Revenue" value={formatCurrency(results.netRevenueAfterCommission)} />
            <DataLine label="Operating Net" value={formatCurrency(results.netRevenueAfterCosts)} />
            
            <div className="mt-10 pt-10 border-t dark:border-white/5 light:border-slate-300 grid grid-cols-2 gap-4">
              <ResultMetric label="Real Profit" value={formatCurrency(results.profit)} isPositive={results.profit >= 0} />
              <ResultMetric label="Mean Margin" value={formatPercent(results.profitMargin)} isPositive={results.profitMargin >= 0} />
            </div>
          </div>
        </div>

        {/* Campaign View */}
        <div className={`glass-card rounded-[3rem] overflow-hidden flex flex-col transition-all duration-700 glass-card-hover group/camp ${inputs.campaignParticipation ? 'border-orange-500/40' : 'opacity-20 pointer-events-none grayscale translate-y-8'}`}>
          <div className="px-10 py-5 dark:bg-orange-500/10 light:bg-orange-500 dark:border-b dark:border-orange-500/20 flex justify-between items-center">
            <span className="font-900 uppercase text-[11px] tracking-[0.4em] dark:text-orange-500 light:text-white">Adjusted Metrics</span>
            <span className="text-[10px] font-bold dark:text-orange-500/50 light:text-white/50 font-mono">V_ADJ_02</span>
          </div>
          <div className="p-12 flex-1 space-y-6">
            <DataLine label="Seller Contrib." value={formatCurrency(results.sellerFundedDiscount)} color="text-rose-500" prefix="-" />
            <DataLine label="System Subsidy" value={formatCurrency(results.trendyolFundedDiscount)} color="dark:text-cyan-400 light:text-blue-600" prefix="+" />
            <DataLine label="Adj Gross Rev" value={formatCurrency(results.adjustedGrossRevenue)} weight="font-900" />
            <DataLine label="Adj Commission" value={formatCurrency(results.adjustedCommissionFee)} color="text-rose-500" prefix="-" />
            
            <div className="mt-10 pt-10 border-t dark:border-orange-500/10 light:border-orange-500/10 grid grid-cols-2 gap-4">
              <ResultMetric label="Adj. Profit" value={formatCurrency(results.adjustedProfit)} isPositive={results.adjustedProfit >= 0} isAccent />
              <ResultMetric label="Adj. Margin" value={formatPercent(results.adjustedProfitMargin)} isPositive={results.adjustedProfitMargin >= 0} isAccent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup: React.FC<{ label: string; name: string; value: any; onChange: any; prefix?: string; step?: string; hint?: string }> = ({ label, name, value, onChange, prefix, step, hint }) => (
  <div className="group space-y-4">
    <div className="flex justify-between items-center">
        <label className="text-[11px] font-900 dark:text-orange-500/80 light:text-slate-600 uppercase tracking-[0.25em] group-focus-within:text-orange-600 transition-colors">{label}</label>
        {hint && <span className="text-[10px] font-700 text-slate-400 italic tracking-tighter opacity-70">{hint}</span>}
    </div>
    <div className="relative transform transition-all group-focus-within:scale-[1.03]">
      {prefix && <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[11px] font-900 dark:text-orange-400 light:text-slate-500 z-10">{prefix}</span>}
      <input
        type="number"
        name={name}
        step={step}
        value={value === 0 ? '' : value}
        onChange={onChange}
        placeholder="0.00"
        className={`w-full ${prefix ? 'pl-20' : 'px-8'} py-5 glass-input rounded-[1.5rem] focus:ring-4 focus:ring-orange-500/20 outline-none transition-all font-mono font-900 dark:text-white light:text-slate-900 placeholder:opacity-20 text-[16px]`}
      />
    </div>
  </div>
);

const DataLine: React.FC<{ label: string; value: string; color?: string; prefix?: string; weight?: string }> = ({ label, value, color = "dark:text-slate-300 light:text-slate-800", prefix, weight = "font-800" }) => (
  <div className="flex justify-between items-center py-2 border-b dark:border-white/[0.02] light:border-slate-300/30 last:border-0 pb-4">
    <span className="text-[12px] font-900 dark:text-slate-500 light:text-slate-500 uppercase tracking-widest">{label}</span>
    <span className={`text-[15px] ${weight} font-mono ${color} tracking-tight`}>
      {prefix && <span className="mr-1.5 opacity-40 font-900">{prefix}</span>}{value}
    </span>
  </div>
);

const ResultMetric: React.FC<{ label: string; value: string; isPositive: boolean; isAccent?: boolean }> = ({ label, value, isPositive, isAccent }) => (
  <div className={`py-8 px-4 md:px-6 rounded-[2.5rem] transition-all duration-500 flex flex-col justify-center min-h-[140px] ${isAccent ? 'dark:bg-orange-500/5 light:bg-orange-500/5 border dark:border-orange-500/10 light:border-orange-500/20' : 'dark:bg-white/[0.02] light:bg-slate-200/30 border dark:border-white/10 light:border-white'}`}>
    <p className={`text-[10px] font-900 uppercase tracking-widest mb-3 ${isAccent ? 'text-orange-500' : 'dark:text-slate-500 light:text-slate-500'}`}>{label}</p>
    <p className={`text-lg md:text-xl lg:text-2xl font-900 font-mono tracking-tighter whitespace-nowrap overflow-visible ${isPositive ? (isAccent ? 'text-orange-600' : 'text-emerald-500') : 'text-rose-500'}`}>
      {value}
    </p>
  </div>
);

export default SingleCalculator;
