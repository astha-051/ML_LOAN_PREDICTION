import { useState } from 'react';
import type { LoanFormData, PredictionResult } from '../types/loan';
import { predictLoan } from '../services/predictionEngine';
import { RiskGauge } from '../components/RiskGauge';
import { 
  Calculator, 
  User, 
  CreditCard, 
  Info, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  BarChart2, 
  RotateCcw
} from 'lucide-react';

interface PredictLoanProps {
  onPredictionComplete: (prediction: PredictionResult) => void;
}

export const PredictLoan: React.FC<PredictLoanProps> = ({ onPredictionComplete }) => {
  const [formData, setFormData] = useState<LoanFormData>({
    annualIncome: 65000,
    employmentLength: '5-10 years',
    homeOwnership: 'RENT',
    verificationStatus: 'Verified',
    loanAmount: 15000,
    term: '36 months',
    interestRate: 12.5,
    installment: 501.8,
    purpose: 'Debt Consolidation',
    ficoScore: 710,
    dti: 19.5,
    revolvingBalance: 14500,
    revolvingUtil: 42.0,
    openAccounts: 10,
    totalAccounts: 18,
    publicRecords: 0,
    inquiriesLast6M: 1,
    delinquenciesLast2Y: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const pred = await predictLoan(formData);
      setResult(pred);
      onPredictionComplete(pred);
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Heading */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Risk Assessment Workspace</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Loan Risk Assessment
        </h1>
        <p className="text-sm text-slate-400">
          Enter borrower information to estimate repayment risk using calibrated machine learning.
        </p>
      </div>

      {/* Two Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (7 cols on lg) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Section 1: Borrower Profile */}
          <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3 text-white font-bold text-sm">
              <User className="w-4 h-4 text-blue-400" />
              <span>Borrower Profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Annual Income */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Annual Income (₹)
                </label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  required
                  min={1000}
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Employment Length */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Employment Length
                </label>
                <select
                  name="employmentLength"
                  value={formData.employmentLength}
                  onChange={handleInputChange}
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="< 1 year">&lt; 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              {/* Home Ownership */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Home Ownership
                </label>
                <select
                  name="homeOwnership"
                  value={formData.homeOwnership}
                  onChange={handleInputChange}
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="RENT">RENT</option>
                  <option value="OWN">OWN</option>
                  <option value="MORTGAGE">MORTGAGE</option>
                </select>
              </div>

              {/* Verification Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Verification Status
                </label>
                <select
                  name="verificationStatus"
                  value={formData.verificationStatus}
                  onChange={handleInputChange}
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="Verified">Verified</option>
                  <option value="Source Verified">Source Verified</option>
                  <option value="Not Verified">Not Verified</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Loan Information */}
          <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3 text-white font-bold text-sm">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Loan Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Loan Amount */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  required
                  min={500}
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Term */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Term</label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="36 months">36 months</option>
                  <option value="60 months">60 months</option>
                </select>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Installment */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Installment (₹/mo)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="installment"
                  value={formData.installment}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Purpose */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Purpose
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                >
                  <option value="Debt Consolidation">Debt Consolidation</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Home Improvement">Home Improvement</option>
                  <option value="Major Purchase">Major Purchase</option>
                  <option value="Medical">Medical</option>
                  <option value="Car">Car</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Credit Profile */}
          <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3 text-white font-bold text-sm">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span>Credit Profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* FICO Score */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  FICO Score
                </label>
                <input
                  type="number"
                  name="ficoScore"
                  value={formData.ficoScore}
                  onChange={handleInputChange}
                  min={300}
                  max={850}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">Standard 300 to 850 credit range</p>
              </div>

              {/* DTI */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Debt-to-Income (DTI %)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="dti"
                  value={formData.dti}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">Total monthly debt obligations vs income</p>
              </div>

              {/* Revolving Balance */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Revolving Balance (₹)
                </label>
                <input
                  type="number"
                  name="revolvingBalance"
                  value={formData.revolvingBalance}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Revolving Utilization */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Revolving Utilization (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="revolvingUtil"
                  value={formData.revolvingUtil}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Open Accounts */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Open Accounts
                </label>
                <input
                  type="number"
                  name="openAccounts"
                  value={formData.openAccounts}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Total Accounts */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Total Accounts
                </label>
                <input
                  type="number"
                  name="totalAccounts"
                  value={formData.totalAccounts}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Public Records */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Public Records
                </label>
                <input
                  type="number"
                  name="publicRecords"
                  value={formData.publicRecords}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Inquiries Last 6 Months */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Inquiries Last 6 Months
                </label>
                <input
                  type="number"
                  name="inquiriesLast6M"
                  value={formData.inquiriesLast6M}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* Delinquencies Last 2 Years */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Delinquencies Last 2 Years
                </label>
                <input
                  type="number"
                  name="delinquenciesLast2Y"
                  value={formData.delinquenciesLast2Y}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Form Action Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold text-sm shadow-xl transition-all glow-blue flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing borrower risk...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Loan</span>
                </>
              )}
            </button>

            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </form>

        {/* Right Column: Prediction Result Panel (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          {!result && !isLoading && (
            <div className="p-8 rounded-3xl bg-[#131B2E] border border-[#1E293B] shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto glow-blue">
                <BarChart2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Ready for Analysis</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Complete the borrower information form and click <strong>Analyze Loan</strong> to compute repayment default probability.
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="p-12 rounded-3xl bg-[#131B2E] border border-[#1E293B] shadow-xl text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                <Calculator className="w-8 h-8 text-blue-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Analyzing Borrower Risk</h3>
                <p className="text-xs text-slate-400">
                  Executing calibrated Logistic Regression model & risk factor evaluation...
                </p>
              </div>
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Risk Gauge Panel */}
              <RiskGauge
                probability={result.probability}
                predictionClass={result.predictionClass}
                riskLevel={result.riskLevel}
                threshold={result.decisionThreshold}
              />

              {/* Explanatory Factors Section */}
              <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white tracking-wide border-b border-[#1E293B] pb-3">
                  Risk Factors Breakdown
                </h3>

                {/* Positive Factors */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Favorable Indicators
                  </span>
                  <div className="space-y-1.5">
                    {result.positiveFactors.map((f, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-200 flex items-center gap-2"
                      >
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Potential Risk Indicators
                  </span>
                  <div className="space-y-1.5">
                    {result.riskFactors.map((f, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-slate-200 flex items-center gap-2"
                      >
                        <span className="text-rose-400 font-bold">⚠</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Confidence Progress Bar */}
                <div className="pt-3 border-t border-[#1E293B] space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Charged Off Probability</span>
                    <span className="font-bold text-white">{result.modelConfidence}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        result.probability >= 0.5 ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${result.modelConfidence}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Model Information Card */}
              <div className="p-5 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 font-bold text-white">
                  <span>Model Specifications</span>
                  <span className="text-blue-400">{result.modelStats.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    Class Balancing: <strong className="text-white">{result.modelStats.classBalancing}</strong>
                  </div>
                  <div>
                    Threshold: <strong className="text-white">{(result.decisionThreshold * 100).toFixed(0)}%</strong>
                  </div>
                  <div>
                    ROC-AUC: <strong className="text-emerald-400">{result.modelStats.rocAuc}</strong>
                  </div>
                  <div>
                    Recall (CO): <strong className="text-white">{result.modelStats.chargedOffRecall}%</strong>
                  </div>
                  <div className="col-span-2">
                    Charged Off F1: <strong className="text-white">{result.modelStats.chargedOffF1}%</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-[#1E293B] text-[11px] text-slate-400">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Evaluation metrics derived from test dataset. Risk scores are estimates for underwriting guidance.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
