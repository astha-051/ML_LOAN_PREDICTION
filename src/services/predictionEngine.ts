import type { LoanFormData, PredictionResult } from '../types/loan';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export async function predictLoan(formData: LoanFormData): Promise<PredictionResult> {
  const payload = {
    loan_amnt: Number(formData.loanAmount),
    term: formData.term,
    int_rate: Number(formData.interestRate),
    installment: Number(formData.installment),
    grade: 'B', // default B
    sub_grade: 'B3', // default B3
    emp_length: formData.employmentLength,
    home_ownership: formData.homeOwnership,
    annual_inc: Number(formData.annualIncome),
    verification_status: formData.verificationStatus,
    purpose: formData.purpose,
    dti: Number(formData.dti),
    delinq_2yrs: Number(formData.delinquenciesLast2Y || 0),
    fico_range_low: Number(formData.ficoScore),
    fico_range_high: Number(formData.ficoScore) + 4,
    inq_last_6mths: Number(formData.inquiriesLast6M || 0),
    open_acc: Number(formData.openAccounts),
    pub_rec: Number(formData.publicRecords || 0),
    revol_bal: Number(formData.revolvingBalance),
    revol_util: Number(formData.revolvingUtil),
    total_acc: Number(formData.totalAccounts)
  };

  let apiResponse: any = null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      apiResponse = await res.json();
    } else {
      console.warn('Backend prediction request failed with status:', res.status);
    }
  } catch (err) {
    console.warn('FastAPI backend unreachable, falling back to client estimate:', err);
  }

  // Derive probability and prediction class from API response if available
  let probability: number;
  let predictionClass: 'Fully Paid' | 'Potential Charged Off';
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';

  if (apiResponse && typeof apiResponse.probability === 'number') {
    probability = apiResponse.probability;
    const isChargedOff = apiResponse.prediction === 1 || probability >= 0.50;
    predictionClass = isChargedOff ? 'Potential Charged Off' : 'Fully Paid';
    riskLevel = isChargedOff ? 'HIGH' : probability > 0.35 ? 'MEDIUM' : 'LOW';
  } else {
  throw new Error(
    'Unable to connect to the LoanGuard AI prediction backend.'
  );
}

  // Build positive and risk factors
  const positiveFactors: string[] = [];
  const riskFactors: string[] = [];

  if (formData.ficoScore >= 740) {
    positiveFactors.push(`High FICO Score (${formData.ficoScore}) demonstrates strong creditworthiness.`);
  } else if (formData.ficoScore < 680) {
    riskFactors.push(`Lower FICO Score (${formData.ficoScore}) increases historical risk.`);
  } else {
    positiveFactors.push(`Good credit score (${formData.ficoScore}) within normal underwriting range.`);
  }

  if (formData.dti <= 20) {
    positiveFactors.push(`Favorable Debt-to-Income ratio (${formData.dti}%) leaves healthy cash flow.`);
  } else {
    riskFactors.push(`Elevated DTI (${formData.dti}%) places additional burden on monthly obligations.`);
  }

  if (formData.revolvingUtil > 65) {
    riskFactors.push(`High Revolving Utilization (${formData.revolvingUtil}%) signals liquidity pressure.`);
  } else {
    positiveFactors.push(`Low credit utilization (${formData.revolvingUtil}%) indicates prudent credit use.`);
  }

  if (formData.delinquenciesLast2Y > 0) {
    riskFactors.push(`Recent delinquencies (${formData.delinquenciesLast2Y}) in past 2 years.`);
  }

  if (positiveFactors.length === 0) {
    positiveFactors.push('Consistent employment history and verified loan purpose.');
  }
  if (riskFactors.length === 0) {
    riskFactors.push('No critical negative credit flags detected.');
  }

  const id = `LG-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id,
    timestamp: new Date().toISOString(),
    borrowerName: 'Applicant #' + id.split('-')[1],
    formData,
    probability,
    predictionClass,
    riskLevel,
    decisionThreshold: 0.50,
    positiveFactors,
    riskFactors,
    modelConfidence: Math.round(probability * 10000) / 100,
    modelStats: {
      name: 'Logistic Regression',
      classBalancing: 'Balanced',
      rocAuc: 0.714,
      chargedOffRecall: 64.2,
      chargedOffF1: 44.1
    }
  };
}
