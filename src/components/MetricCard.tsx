import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  accentColor?: 'blue' | 'emerald' | 'rose' | 'amber' | 'slate';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'blue',
}) => {
  const getBadgeStyle = () => {
    switch (accentColor) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'rose':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'blue':
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#131B2E] border border-[#1E293B] p-5 shadow-lg hover:border-slate-700/80 transition-all group">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 tracking-wide">{title}</span>
        <div className={`p-2.5 rounded-xl border ${getBadgeStyle()} transition-transform group-hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Main value */}
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </div>

      {/* Bottom row: Subtitle & trend */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="text-[11px] text-slate-400 font-medium">{subtitle}</span>
        {trend && (
          <div
            className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
              trend.isNeutral
                ? 'text-slate-400'
                : trend.isPositive
                ? 'text-emerald-400'
                : 'text-rose-400'
            }`}
          >
            {trend.isPositive && <TrendingUp className="w-3 h-3" />}
            {!trend.isPositive && !trend.isNeutral && <TrendingDown className="w-3 h-3" />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};
