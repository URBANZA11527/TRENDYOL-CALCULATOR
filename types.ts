
export interface CalculationInputs {
  salePrice: number; // B
  quantity: number; // C
  commissionRate: number; // D
  shippingCostPaidBySeller: number; // F
  cogs: number; // H
  expenses: number; // I
  campaignParticipation: boolean; // P
  campaignDiscountRate: number; // Q
  trendyolCoverageRate: number; // R
}

export interface CalculationOutputs {
  // Normal Results
  grossRevenue: number; // J
  commissionFee: number; // K
  netRevenueAfterCommission: number; // L
  netRevenueAfterCosts: number; // M
  profit: number; // N
  profitMargin: number; // O

  // Campaign Results
  discountAmount: number; // S
  sellerFundedDiscount: number; // T
  trendyolFundedDiscount: number; // U
  adjustedGrossRevenue: number; // V
  adjustedCommissionFee: number; // W
  adjustedNetRevenueAfterCommission: number; // X
  adjustedNetRevenueAfterCosts: number; // Y
  adjustedProfit: number; // Z
  adjustedProfitMargin: number; // AA
}

export interface BulkDataRow extends CalculationInputs, CalculationOutputs {
  id: string;
  productLabel?: string; // Kept for UI reference in bulk but optional
}
