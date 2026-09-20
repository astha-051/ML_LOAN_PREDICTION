import { useState, useMemo } from 'react';
import type { PredictionResult } from '../types/loan';
import { StatusBadge } from '../components/StatusBadge';
import { Search, History, Eye, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface HistoryProps {
  predictions: PredictionResult[];
  onSelectPrediction: (prediction: PredictionResult) => void;
}

export const PredictionHistory: React.FC<HistoryProps> = ({
  predictions,
  onSelectPrediction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<
    'ALL' | 'Fully Paid' | 'Charged Off' | 'HIGH' | 'MEDIUM' | 'LOW'
  >('ALL');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filtered Predictions
  const filteredPredictions = useMemo(() => {
    return predictions.filter((pred) => {
      // Search match
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        pred.id.toLowerCase().includes(query) ||
        (pred.borrowerName && pred.borrowerName.toLowerCase().includes(query)) ||
        pred.formData.purpose.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Filter tab match
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'Fully Paid') return pred.predictionClass === 'Fully Paid';
      if (activeFilter === 'Charged Off') return pred.predictionClass === 'Potential Charged Off';
      if (activeFilter === 'HIGH') return pred.riskLevel === 'HIGH';
      if (activeFilter === 'MEDIUM') return pred.riskLevel === 'MEDIUM';
      if (activeFilter === 'LOW') return pred.riskLevel === 'LOW';

      return true;
    });
  }, [predictions, searchTerm, activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPredictions.length / pageSize) || 1;
  const paginatedPredictions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPredictions.slice(start, start + pageSize);
  }, [filteredPredictions, currentPage]);

  const filterTabs = [
    { id: 'ALL', label: 'All Records' },
    { id: 'Fully Paid', label: 'Fully Paid' },
    { id: 'Charged Off', label: 'Charged Off' },
    { id: 'HIGH', label: 'High Risk' },
    { id: 'MEDIUM', label: 'Medium Risk' },
    { id: 'LOW', label: 'Low Risk' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <History className="w-3.5 h-3.5" />
          <span>Historical Audit Log</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Prediction History
        </h1>
        <p className="text-sm text-slate-400">
          Review previously analyzed loan applications, filter by risk classification, and examine detailed features.
        </p>
      </div>

      {/* Control Panel: Search & Filter Tabs */}
      <div className="p-4 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Prediction ID, borrower, purpose..."
              className="w-full bg-[#0B0F19] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none transition-all placeholder-slate-500"
            />
          </div>

          {/* Records Counter */}
          <div className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-white">{filteredPredictions.length}</strong> evaluated records
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md glow-blue'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Data Table */}
      <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] text-slate-400 font-semibold bg-[#0B0F19]/40">
                <th className="p-3.5 rounded-l-xl">Prediction ID</th>
                <th className="p-3.5">Loan Amount</th>
                <th className="p-3.5">Annual Income</th>
                <th className="p-3.5">FICO</th>
                <th className="p-3.5">Risk Probability</th>
                <th className="p-3.5">Prediction</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {paginatedPredictions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    No matching loan predictions found.
                  </td>
                </tr>
              ) : (
                paginatedPredictions.map((pred) => (
                  <tr
                    key={pred.id}
                    onClick={() => onSelectPrediction(pred)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-mono font-bold text-blue-400">{pred.id}</td>
                    <td className="p-3.5 text-slate-200 font-medium">
                      ₹{pred.formData.loanAmount.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-slate-300">
                      ₹{pred.formData.annualIncome.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-200">{pred.formData.ficoScore}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-white">{(pred.probability * 100).toFixed(2)}%</span>
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={pred.predictionClass} size="sm" />
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {new Date(pred.timestamp).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPrediction(pred);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors"
                        title="View Full Breakdown"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1E293B] text-xs text-slate-400">
          <div>
            Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
