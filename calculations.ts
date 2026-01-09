
import { CalculationInputs, CalculationOutputs } from './types';

export const calculateResults = (inputs: CalculationInputs): CalculationOutputs => {
  const {
    salePrice: B,
    quantity: C,
    commissionRate: D,
    shippingCostPaidBySeller: F,
    cogs: H,
    expenses: I,
    campaignParticipation: P,
    campaignDiscountRate: Q,
    trendyolCoverageRate: R
  } = inputs;

  // --- Normal Results ---
  const grossRevenue = B * C; 
  const commissionFee = B * C * D; 
  const netRevenueAfterCommission = grossRevenue - commissionFee; 
  const netRevenueAfterCosts = netRevenueAfterCommission - (F + I); 
  const profit = netRevenueAfterCosts - H; 
  const profitMargin = grossRevenue > 0 ? profit / grossRevenue : 0; 

  // --- Campaign Calculations ---
  const discountAmount = P ? B * C * Q : 0; 
  const sellerFundedDiscount = discountAmount * (1 - R); 
  const trendyolFundedDiscount = discountAmount * R; 
  const adjustedGrossRevenue = B * C - sellerFundedDiscount; 
  const adjustedCommissionFee = (B * C - discountAmount) * D; 
  const adjustedNetRevenueAfterCommission = adjustedGrossRevenue - adjustedCommissionFee; 
  const adjustedNetRevenueAfterCosts = adjustedNetRevenueAfterCommission - (F + I); 
  const adjustedProfit = adjustedNetRevenueAfterCosts - H; 
  const adjustedProfitMargin = adjustedGrossRevenue > 0 ? adjustedProfit / adjustedGrossRevenue : 0; 

  return {
    grossRevenue,
    commissionFee,
    netRevenueAfterCommission,
    netRevenueAfterCosts,
    profit,
    profitMargin,
    discountAmount,
    sellerFundedDiscount,
    trendyolFundedDiscount,
    adjustedGrossRevenue,
    adjustedCommissionFee,
    adjustedNetRevenueAfterCommission,
    adjustedNetRevenueAfterCosts,
    adjustedProfit,
    adjustedProfitMargin
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercent = (value: number) => {
  return (value * 100).toFixed(2) + '%';
};
