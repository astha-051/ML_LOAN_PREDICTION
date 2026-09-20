import { useState } from 'react';
import { Settings as SettingsIcon, Sliders, Bell, Save, ShieldAlert, HelpCircle } from 'lucide-react';

interface SettingsProps {
  onShowToast: (title: string, message: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onShowToast }) => {
  const [decisionThreshold, setDecisionThreshold] = useState<number>(0.5);
  const [modelChoice, setModelChoice] = useState<string>('Logistic Regression');
  const [classWeight, setClassWeight] = useState<string>('Balanced');
  const [notifications, setNotifications] = useState<boolean>(true);
  const [autoSave, setAutoSave] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleSaveSettings = () => {
    onShowToast('Settings Saved', 'Model configuration and application preferences updated.');
  };

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Platform Preferences</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
          Settings & Configuration
        </h1>
        <p className="text-sm text-slate-400">
          Configure machine learning model thresholds, application preferences, and system notifications.
        </p>
      </div>

      {/* Model Configuration */}
      <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-5">
        <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3 text-white font-bold text-sm">
          <Sliders className="w-4 h-4 text-blue-400" />
          <span>Model Configuration</span>
        </div>

        <div className="space-y-4">
          {/* Decision Threshold Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-200">
                Decision Threshold: <span className="text-blue-400 font-bold">{decisionThreshold.toFixed(2)}</span>
              </label>
              <span className="text-slate-400 text-[11px]">Default: 0.50</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.90"
              step="0.05"
              value={decisionThreshold}
              onChange={(e) => setDecisionThreshold(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-[11px] text-slate-400">
              Lowering threshold increases recall (catches more high risk loans), while raising it increases precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Model Architecture Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Active Production Model
              </label>
              <select
                value={modelChoice}
                onChange={(e) => setModelChoice(e.target.value)}
                className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none"
              >
                <option value="Logistic Regression">Logistic Regression (Balanced)</option>
                <option value="Random Forest">Random Forest Classifier</option>
                <option value="XGBoost">XGBoost Gradient Boosted Trees</option>
              </select>
            </div>

            {/* Class Weight */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Class Weighting Strategy
              </label>
              <select
                value={classWeight}
                onChange={(e) => setClassWeight(e.target.value)}
                className="w-full bg-[#0B0F19] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1E293B] focus:border-blue-500 focus:outline-none"
              >
                <option value="Balanced">Balanced (inverse frequency)</option>
                <option value="Uniform">Uniform (1:1 standard)</option>
                <option value="Custom">Custom Weighted (1:3 CO penalty)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Application Settings */}
      <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-5">
        <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3 text-white font-bold text-sm">
          <Bell className="w-4 h-4 text-blue-400" />
          <span>Application Settings</span>
        </div>

        <div className="space-y-4 text-xs">
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F19]/60 border border-slate-800">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block">High Risk Notifications</span>
              <span className="text-slate-400 block text-[11px]">
                Receive instant toast alerts when evaluated loan exceeds 75% risk.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F19]/60 border border-slate-800">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block">Dark Navy Theme</span>
              <span className="text-slate-400 block text-[11px]">
                Enforce deep financial navy dark mode layout.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Auto-save predictions */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B0F19]/60 border border-slate-800">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block">Auto-save Predictions</span>
              <span className="text-slate-400 block text-[11px]">
                Automatically append newly evaluated loans to historical log.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAutoSave(!autoSave)}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                autoSave ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  autoSave ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* About Model & Financial Disclaimer */}
      <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E293B] shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#1E293B] pb-3 text-white font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-blue-400" />
          <span>About Model & Compliance Disclaimer</span>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <p className="leading-relaxed">
            <strong>LoanGuard AI</strong> uses machine learning to estimate loan repayment risk by analyzing borrower demographic, income, employment, and credit bureau features.
          </p>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <strong className="block text-amber-200">Financial Risk Disclaimer</strong>
              <p className="leading-normal">
                This prediction is an ML-based risk estimate and should not be treated as a guaranteed financial decision or automated credit denial/approval. Final underwriting decisions must comply with applicable credit regulations (e.g. ECOA, FCRA).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Settings CTA */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl transition-all glow-blue flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
};
