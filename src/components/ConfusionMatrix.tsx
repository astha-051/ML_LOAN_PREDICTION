import React from 'react';
import { CONFUSION_MATRIX_DATA } from '../data/mockData';
import { Info } from 'lucide-react';

export const ConfusionMatrix: React.FC = () => {
  const { actual0Predicted0, actual0Predicted1, actual1Predicted0, actual1Predicted1 } =
    CONFUSION_MATRIX_DATA;

  const total = actual0Predicted0 + actual0Predicted1 + actual1Predicted0 + actual1Predicted1;

  return (
    <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Confusion Matrix</h3>
          <p className="text-xs text-slate-400">
            Actual vs Predicted class distribution on 162,293 validation records
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Info className="w-4 h-4 text-blue-400" />
          <span>Decision Threshold: 0.50</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[420px] p-4 rounded-xl bg-[#0B0F19]/60 border border-slate-800">
          {/* Matrix Headers */}
          <div className="grid grid-cols-3 gap-3 mb-2 text-center text-xs font-bold text-slate-400">
            <div></div>
            <div className="py-1 rounded bg-slate-800/80 text-blue-400">Predicted Fully Paid (0)</div>
            <div className="py-1 rounded bg-slate-800/80 text-rose-400">Predicted Charged Off (1)</div>
          </div>

          {/* Matrix Row 1: Actual 0 (Fully Paid) */}
          <div className="grid grid-cols-3 gap-3 mb-3 items-center text-center text-xs">
            <div className="font-bold text-emerald-400 bg-slate-800/80 py-2 rounded">
              Actual Fully Paid (0)
            </div>

            {/* True Negative */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center glow-emerald">
              <span className="text-xs font-semibold text-emerald-400 block uppercase">True Negative (TN)</span>
              <span className="text-xl font-extrabold text-white block mt-1">
                {actual0Predicted0.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {((actual0Predicted0 / total) * 100).toFixed(1)}% of total
              </span>
            </div>

            {/* False Positive */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center">
              <span className="text-xs font-semibold text-amber-400 block uppercase">False Positive (FP)</span>
              <span className="text-xl font-extrabold text-white block mt-1">
                {actual0Predicted1.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {((actual0Predicted1 / total) * 100).toFixed(1)}% of total
              </span>
            </div>
          </div>

          {/* Matrix Row 2: Actual 1 (Charged Off) */}
          <div className="grid grid-cols-3 gap-3 items-center text-center text-xs">
            <div className="font-bold text-rose-400 bg-slate-800/80 py-2 rounded">
              Actual Charged Off (1)
            </div>

            {/* False Negative */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs font-semibold text-slate-400 block uppercase">False Negative (FN)</span>
              <span className="text-xl font-extrabold text-white block mt-1">
                {actual1Predicted0.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {((actual1Predicted0 / total) * 100).toFixed(1)}% of total
              </span>
            </div>

            {/* True Positive */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-center glow-rose">
              <span className="text-xs font-semibold text-rose-400 block uppercase">True Positive (TP)</span>
              <span className="text-xl font-extrabold text-white block mt-1">
                {actual1Predicted1.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                {((actual1Predicted1 / total) * 100).toFixed(1)}% of total
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
