import React from 'react';
import { ConfusionMatrix } from '../components/ConfusionMatrix';
import { ModelComparison } from '../components/ModelComparison';
import { MetricCard } from '../components/MetricCard';
import { ROC_CURVE_DATA } from '../data/mockData';
import { BarChart3, Target, RefreshCw, Award, Activity, HelpCircle } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';

export const ModelAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Machine Learning Validation Suite</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Model Analytics & Evaluation
        </h1>
        <p className="text-sm text-slate-400">
          In-depth evaluation metrics, receiver operating characteristic (ROC) curves, and confusion matrix diagnostics.
        </p>
      </div>

      {/* Top 5 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Accuracy"
          value="66.4%"
          subtitle="Overall correct ratio"
          icon={Target}
          accentColor="blue"
        />

        <MetricCard
          title="Precision"
          value="33.6%"
          subtitle="Positive predictive value"
          icon={Activity}
          accentColor="amber"
        />

        <MetricCard
          title="Recall"
          value="64.2%"
          subtitle="Sensitivity to Charged Off"
          icon={RefreshCw}
          trend={{ value: 'Prioritized class', isPositive: true }}
          accentColor="emerald"
        />

        <MetricCard
          title="F1 Score"
          value="44.1%"
          subtitle="Harmonic mean score"
          icon={Award}
          accentColor="slate"
        />

        <MetricCard
          title="ROC-AUC"
          value="71.4%"
          subtitle="Class separability index"
          icon={BarChart3}
          trend={{ value: 'Primary metric', isPositive: true }}
          accentColor="emerald"
        />
      </div>

      {/* Grid: Confusion Matrix & ROC Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Confusion Matrix (7 cols) */}
        <div className="lg:col-span-7">
          <ConfusionMatrix />
        </div>

        {/* ROC Curve (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">ROC Curve</h3>
              <p className="text-xs text-slate-400">False Positive vs True Positive Rate</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              ROC-AUC = 0.714
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ROC_CURVE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  dataKey="fpr"
                  stroke="#64748B"
                  fontSize={10}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  label={{ value: 'FPR (1 - Specificity)', position: 'insideBottom', offset: -5, fill: '#64748B', fontSize: 10 }}
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={10}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  label={{ value: 'TPR (Recall)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748B', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Rate']}
                />
                {/* Random Guess Line */}
                <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke="#475569" strokeDasharray="4 4" />
                {/* Logistic Model Curve */}
                <Line
                  type="monotone"
                  dataKey="tpr"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#10B981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              The green line demonstrates superior discrimination over random guessing (dashed baseline), achieving 64.2% recall at a 50% decision boundary.
            </span>
          </div>
        </div>
      </div>

      {/* Model Comparison Table */}
      <ModelComparison />
    </div>
  );
};
