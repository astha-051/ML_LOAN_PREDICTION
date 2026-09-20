export interface LoanFormData {
  // Borrower Profile
  annualIncome: number;
  employmentLength: string;
  homeOwnership: 'RENT' | 'OWN' | 'MORTGAGE';
  verificationStatus: 'Verified' | 'Source Verified' | 'Not Verified';

  // Loan Info
  loanAmount: number;
  term: '36 months' | '60 months';
  interestRate: number;
  installment: number;
  purpose: string;

  // Credit Profile
  ficoScore: number;
  dti: number;
  revolvingBalance: number;
  revolvingUtil: number;
  openAccounts: number;
  totalAccounts: number;
  publicRecords: number;
  inquiriesLast6M: number;
  delinquenciesLast2Y: number;
}

export interface PredictionResult {
  id: string;
  borrowerName?: string;
  timestamp: string;
  probability: number; // 0.0 to 1.0 (Probability of Charged Off)
  predictionClass: 'Fully Paid' | 'Potential Charged Off';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  decisionThreshold: number; // 0.50
  formData: LoanFormData;
  positiveFactors: string[];
  riskFactors: string[];
  modelConfidence: number; // percentage display, e.g., 80.49
  modelStats: {
    name: string;
    classBalancing: string;
    rocAuc: number;
    chargedOffRecall: number;
    chargedOffF1: number;
  };
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
}

export interface HistoryFilterOptions {
  search: string;
  status: 'ALL' | 'Fully Paid' | 'Charged Off' | 'High Risk' | 'Medium Risk' | 'Low Risk';
}
