import React from 'react';

interface StatusBadgeProps {
  status: 'Fully Paid' | 'Charged Off' | 'Potential Charged Off' | 'HIGH' | 'MEDIUM' | 'LOW';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isFullyPaid = status === 'Fully Paid' || status === 'LOW';
  const isMedium = status === 'MEDIUM';

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  if (isFullyPaid) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${sizeClasses}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {status === 'LOW' ? 'LOW RISK' : 'Fully Paid'}
      </span>
    );
  }

  if (isMedium) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 ${sizeClasses}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        MEDIUM RISK
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 ${sizeClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
      {status === 'HIGH' ? 'HIGH RISK' : status === 'Potential Charged Off' ? 'Potential Charged Off' : 'Charged Off'}
    </span>
  );
};
