import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { PredictionDetailDrawer } from './components/PredictionDetailDrawer';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { Dashboard } from './pages/Dashboard';
import { PredictLoan } from './pages/PredictLoan';
import { PredictionHistory } from './pages/PredictionHistory';
import { ModelAnalytics } from './pages/ModelAnalytics';
import { Settings } from './pages/Settings';
import { INITIAL_PREDICTIONS } from './data/mockData';
import type { PredictionResult } from './types/loan';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<PredictionResult[]>(INITIAL_PREDICTIONS);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionResult | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Show Toast helper
  const addToast = (title: string, message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle new prediction completed
  const handlePredictionComplete = (newPred: PredictionResult) => {
    setPredictions((prev) => [newPred, ...prev]);
    const isHighRisk = newPred.probability >= 0.5;
    addToast(
      'Loan Assessment Completed',
      `${newPred.id} evaluated as ${newPred.predictionClass} (${(newPred.probability * 100).toFixed(2)}%)`,
      isHighRisk ? 'warning' : 'success'
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Workspace Wrapper */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Sticky Top Navbar */}
        <Navbar
          activeTab={activeTab}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onNavigateToPredict={() => setActiveTab('predict')}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              predictions={predictions}
              onNavigateToPredict={() => setActiveTab('predict')}
              onSelectPrediction={(pred) => setSelectedPrediction(pred)}
            />
          )}

          {activeTab === 'predict' && (
            <PredictLoan onPredictionComplete={handlePredictionComplete} />
          )}

          {activeTab === 'history' && (
            <PredictionHistory
              predictions={predictions}
              onSelectPrediction={(pred) => setSelectedPrediction(pred)}
            />
          )}

          {activeTab === 'analytics' && <ModelAnalytics />}

          {activeTab === 'settings' && (
            <Settings onShowToast={(title, msg) => addToast(title, msg, 'info')} />
          )}
        </main>
      </div>

      {/* Prediction Detail Slide-Over Drawer */}
      <PredictionDetailDrawer
        prediction={selectedPrediction}
        isOpen={!!selectedPrediction}
        onClose={() => setSelectedPrediction(null)}
      />

      {/* Toast Alert Engine */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
