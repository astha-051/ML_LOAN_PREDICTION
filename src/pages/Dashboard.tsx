import React from 'react';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import type { PredictionResult } from '../types/loan';
import { PREDICTION_OVERVIEW_DATA, RISK_DISTRIBUTION_DATA } from '../data/mockData';
import { 
  ShieldAlert, 
  CheckCircle, 
  BarChart3, 
  FileSpreadsheet, 
  ArrowRight, 
  Eye, 
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  CartesianGrid
} from 'recharts';

interface DashboardProps {
  predictions: PredictionResult[];
  onNavigateToPredict: () => void;
  onSelectPrediction: (prediction: PredictionResult) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  predictions,
  onNavigateToPredict,
  onSelectPrediction,
}) => {
  const recentPredictions = predictions.slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-[#131B2E] to-[#131B2E] border border-blue-500/20 p-6 lg:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Machine Learning Model Active v1.4</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Loan Risk Assessment
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Evaluate borrower default risk with high-precision logistic models, comprehensive credit metrics, and instant risk factor breakdowns.
            </p>
          </div>

          <button
            onClick={onNavigateToPredict}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl hover:shadow-blue-500/20 transition-all glow-blue group shrink-0"
          >
            <span>Analyze New Loan</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Predictions"
          value={12482}
          subtitle="Evaluated loan files"
          icon={FileSpreadsheet}
          trend={{ value: '+12.4% vs last mo', isPositive: true }}
          accentColor="blue"
        />

        <MetricCard
          title="High Risk Loans"
          value={3216}
          subtitle="Charged Off predictions"
          icon={ShieldAlert}
          trend={{ value: '25.7% risk ratio', isNeutral: true }}
          accentColor="rose"
        />

        <MetricCard
          title="Low Risk Loans"
          value={9266}
          subtitle="Fully Paid predictions"
          icon={CheckCircle}
          trend={{ value: '74.3% approval rate', isPositive: true }}
          accentColor="emerald"
        />

        <MetricCard
          title="Model ROC-AUC"
          value="0.714"
          subtitle="Discrimination power"
          icon={BarChart3}
          trend={{ value: 'Validated v1.4', isPositive: true }}
          accentColor="amber"
        />
      </div>

      {/* Charts Row: Left Prediction Overview, Right Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Overview Line/Area Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Prediction Overview</h3>
              <p className="text-xs text-slate-400">Monthly evaluation volume and risk breakdown</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Total
              </span>
              <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High Risk
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PREDICTION_OVERVIEW_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="highRiskColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#totalColor)" />
                <Area type="monotone" dataKey="highRisk" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#highRiskColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Donut Chart */}
        <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Risk Distribution</h3>
            <p className="text-xs text-slate-400">Class breakdown across predictions</p>
          </div>

          <div className="relative h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {RISK_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#131B2E" strokeWidth={3} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xs text-slate-400 font-medium">Total</span>
              <span className="text-lg font-extrabold text-white">12,482</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1E293B]">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Fully Paid (Low Risk)
              </span>
              <span className="font-bold text-white">74.2%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-rose-500" /> Charged Off (High Risk)
              </span>
              <span className="font-bold text-white">25.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Predictions Table */}
      <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Recent Predictions</h3>
            <p className="text-xs text-slate-400">Latest loan applications evaluated by LoanGuard AI</p>
          </div>
          <button
            onClick={onNavigateToPredict}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <span>Evaluate New</span> <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] text-slate-400 font-semibold bg-[#0B0F19]/40">
                <th className="p-3.5 rounded-l-xl">ID</th>
                <th className="p-3.5">Borrower</th>
                <th className="p-3.5">Loan Amount</th>
                <th className="p-3.5">Risk Probability</th>
                <th className="p-3.5">Prediction</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {recentPredictions.map((pred) => (
                <tr
                  key={pred.id}
                  onClick={() => onSelectPrediction(pred)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="p-3.5 font-mono font-bold text-blue-400">{pred.id}</td>
                  <td className="p-3.5 font-medium text-slate-200">{pred.borrowerName || 'Borrower'}</td>
                  <td className="p-3.5 text-slate-200">₹{pred.formData.loanAmount.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-white">{(pred.probability * 100).toFixed(2)}%</span>
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={pred.predictionClass} size="sm" />
                  </td>
                  <td className="p-3.5 text-slate-400">{new Date(pred.timestamp).toLocaleDateString()}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPrediction(pred);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
