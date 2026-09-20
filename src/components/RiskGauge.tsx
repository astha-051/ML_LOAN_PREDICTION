import React from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface RiskGaugeProps {
  probability: number; // 0 to 1
  predictionClass: 'Fully Paid' | 'Potential Charged Off';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  threshold?: number; // default 0.5
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  probability,
  predictionClass,
  riskLevel,
  threshold = 0.5,
}) => {
  const percentage = Math.round(probability * 10000) / 100;
  const isHighRisk = probability >= threshold;

  // SVG Semicircle parameters
  const radius = 80;
  const circumference = Math.PI * radius; // Half-circle arc length
  const strokeDashoffset = circumference - (probability * circumference);

  // Color mapping based on probability
  const getStrokeColor = () => {
    if (probability >= 0.6) return '#EF4444'; // Red
    if (probability >= 0.4) return '#F59E0B'; // Amber
    return '#10B981'; // Green
  };

  const getRiskBadge = () => {
    if (riskLevel === 'HIGH') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 glow-rose">
          <AlertTriangle className="w-3.5 h-3.5" />
          HIGH RISK
        </span>
      );
    }
    if (riskLevel === 'MEDIUM') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
          <AlertTriangle className="w-3.5 h-3.5" />
          MEDIUM RISK
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-emerald">
        <CheckCircle2 className="w-3.5 h-3.5" />
        LOW RISK
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#131B2E] border border-[#1E293B] rounded-2xl shadow-xl">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
        Risk Assessment Score
      </div>

      {/* SVG Semicircular Gauge */}
      <div className="relative w-56 h-32 flex items-end justify-center">
        <svg className="w-56 h-56 -rotate-180" viewBox="0 0 200 200">
          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1E293B"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Animated Gauge Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />

          {/* 50% Threshold Marker Indicator */}
          {/* Top center of the arc corresponds to threshold 50% */}
          <circle cx="100" cy="20" r="4" fill="#60A5FA" />
        </svg>

        {/* Center Display Value */}
        <div className="absolute bottom-2 flex flex-col items-center text-center">
          <span className="text-4xl font-extrabold text-white tracking-tight">
            {percentage.toFixed(1)}%
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Probability of Charged Off
          </span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className="mt-4">{getRiskBadge()}</div>

      {/* Decision Output Card */}
      <div className="w-full mt-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
          Model Decision
        </div>
        <div
          className={`text-lg font-bold tracking-tight ${
            isHighRisk ? 'text-rose-400' : 'text-emerald-400'
          }`}
        >
          {predictionClass.toUpperCase()}
        </div>
        <p className="text-xs text-slate-400">
          {isHighRisk
            ? 'Higher predicted default risk — Further review recommended'
            : 'Lower predicted default risk — Favorable repayment profile'}
        </p>
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Decision Threshold: {(threshold * 100).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};
