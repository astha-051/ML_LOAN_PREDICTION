import type { PredictionResult } from '../types/loan';
import { X, CheckCircle2, AlertTriangle, Calendar, User, CreditCard, BarChart2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface DrawerProps {
  prediction: PredictionResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PredictionDetailDrawer: React.FC<DrawerProps> = ({
  prediction,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !prediction) return null;

  const { formData, probability, predictionClass, riskLevel, positiveFactors, riskFactors, modelStats } = prediction;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#0F172A] border-l border-[#1E293B] shadow-2xl flex flex-col justify-between text-slate-200 overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-[#1E293B] bg-[#131B2E] flex items-center justify-between sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-blue-400">{prediction.id}</span>
                <StatusBadge status={predictionClass} size="sm" />
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                {prediction.borrowerName || 'Borrower Assessment Details'}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(prediction.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6">
            {/* Risk Probability Overview Card */}
            <div className="p-5 rounded-2xl bg-[#131B2E] border border-[#1E293B] flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Charged Off Probability
                </span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {(probability * 100).toFixed(2)}%
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Threshold: 50.0% • Risk Level: <strong className="text-slate-200">{riskLevel}</strong>
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={riskLevel} size="md" />
              </div>
            </div>

            {/* Explanatory Factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Positive Factors
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {positiveFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Risk Factors
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {riskFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">⚠</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Borrower Profile Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" /> Borrower & Loan Profile
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#131B2E] border border-[#1E293B] text-xs">
                <div>
                  <span className="text-slate-500 block">Annual Income</span>
                  <span className="font-semibold text-slate-200">₹{formData.annualIncome.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Employment</span>
                  <span className="font-semibold text-slate-200">{formData.employmentLength}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Home Ownership</span>
                  <span className="font-semibold text-slate-200">{formData.homeOwnership}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Verification</span>
                  <span className="font-semibold text-slate-200">{formData.verificationStatus}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Loan Amount</span>
                  <span className="font-semibold text-slate-200">₹{formData.loanAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Term</span>
                  <span className="font-semibold text-slate-200">{formData.term}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Interest Rate</span>
                  <span className="font-semibold text-slate-200">{formData.interestRate}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Installment</span>
                  <span className="font-semibold text-slate-200">₹{formData.installment}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Purpose</span>
                  <span className="font-semibold text-slate-200">{formData.purpose}</span>
                </div>
              </div>
            </div>

            {/* Credit Metrics Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-400" /> Credit Bureau Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#131B2E] border border-[#1E293B] text-xs">
                <div>
                  <span className="text-slate-500 block">FICO Score</span>
                  <span className="font-bold text-blue-400">{formData.ficoScore}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">DTI Ratio</span>
                  <span className="font-semibold text-slate-200">{formData.dti}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Revolving Util</span>
                  <span className="font-semibold text-slate-200">{formData.revolvingUtil}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Open Accounts</span>
                  <span className="font-semibold text-slate-200">{formData.openAccounts}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Accounts</span>
                  <span className="font-semibold text-slate-200">{formData.totalAccounts}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Public Records</span>
                  <span className="font-semibold text-slate-200">{formData.publicRecords}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Inquiries (6M)</span>
                  <span className="font-semibold text-slate-200">{formData.inquiriesLast6M}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Delinquencies (2Y)</span>
                  <span className="font-semibold text-slate-200">{formData.delinquenciesLast2Y}</span>
                </div>
              </div>
            </div>

            {/* Model Info Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 font-semibold border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-blue-400" /> Evaluation Specs
                </span>
                <span>{modelStats.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1">
                <div>Class Weight: <span className="text-slate-200 font-medium">{modelStats.classBalancing}</span></div>
                <div>ROC-AUC: <span className="text-slate-200 font-medium">{modelStats.rocAuc}</span></div>
                <div>Recall (CO): <span className="text-slate-200 font-medium">{modelStats.chargedOffRecall}%</span></div>
                <div>F1 Score: <span className="text-slate-200 font-medium">{modelStats.chargedOffF1}%</span></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-[#1E293B] bg-[#131B2E] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
