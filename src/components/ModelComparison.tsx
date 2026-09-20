import React from 'react';
import { MODEL_COMPARISON_DATA } from '../data/mockData';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const ModelComparison: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Model Benchmark Comparison</h3>
          <p className="text-xs text-slate-400">
            Performance comparison across candidate machine learning architectures
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#1E293B] text-slate-400 font-semibold bg-[#0B0F19]/40">
              <th className="p-3.5 rounded-l-xl">Model Architecture</th>
              <th className="p-3.5">Accuracy</th>
              <th className="p-3.5">Precision</th>
              <th className="p-3.5">Recall</th>
              <th className="p-3.5">F1 Score</th>
              <th className="p-3.5">ROC-AUC</th>
              <th className="p-3.5 rounded-r-xl text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {MODEL_COMPARISON_DATA.map((model) => (
              <tr
                key={model.name}
                className={`transition-colors ${
                  model.isSelected
                    ? 'bg-blue-600/10 border-l-2 border-l-blue-500 font-medium'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    {model.isSelected && (
                      <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-slate-100 block">{model.name}</span>
                      <span className="text-[10px] text-slate-400">{model.type}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3.5 text-slate-200">{model.accuracy}%</td>
                <td className="p-3.5 text-slate-200">{model.precision}%</td>
                <td className="p-3.5 text-blue-400 font-semibold">{model.recall}%</td>
                <td className="p-3.5 text-slate-200">{model.f1}%</td>
                <td className="p-3.5 text-emerald-400 font-bold">{model.rocAuc}</td>
                <td className="p-3.5 text-right">
                  {model.isSelected ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      <CheckCircle className="w-3 h-3" /> Active Model
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] text-slate-400 bg-slate-800 border border-slate-700">
                      Evaluated
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
