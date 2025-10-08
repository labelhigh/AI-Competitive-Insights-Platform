import React, { useState, useCallback } from 'react';
import Step1Landing from './components/Step1_Landing';
import Step2CompetitorSelection from './components/Step2_CompetitorSelection';
import Step3ModuleSelection from './components/Step3_ModuleSelection';
import Step4Dashboard from './components/Step4_Dashboard';
import Loader from './components/Loader';
import type { Competitor, AnalysisModule } from './types';
import { ALL_MODULES } from './constants';

type AppStep = 'landing' | 'competitors' | 'modules' | 'loading' | 'dashboard';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [userUrl, setUserUrl] = useState<string>('');
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedModules, setSelectedModules] = useState<AnalysisModule[]>(ALL_MODULES.filter(m => m.required));

  const handleStartAnalysis = useCallback((url: string) => {
    setUserUrl(url);
    setStep('competitors');
  }, []);

  const handleCompetitorsSelected = useCallback((selected: Competitor[]) => {
    setCompetitors(selected);
    setStep('modules');
  }, []);

  const handleModulesSelected = useCallback((selected: AnalysisModule[]) => {
    setSelectedModules(selected);
    setStep('loading');
    // Simulate analysis time
    setTimeout(() => {
      setStep('dashboard');
    }, 3500);
  }, []);
  
  const handleReset = useCallback(() => {
      setUserUrl('');
      setCompetitors([]);
      setSelectedModules(ALL_MODULES.filter(m => m.required));
      setStep('landing');
  }, []);

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Step1Landing onStart={handleStartAnalysis} />;
      case 'competitors':
        return <Step2CompetitorSelection userUrl={userUrl} onConfirm={handleCompetitorsSelected} />;
      case 'modules':
        return <Step3ModuleSelection onConfirm={handleModulesSelected} />;
      case 'loading':
        return <Loader message="正在分析競品... 請稍候片刻。" />;
      case 'dashboard':
        return <Step4Dashboard userUrl={userUrl} competitors={competitors} modules={selectedModules} onReset={handleReset} />;
      default:
        return <Step1Landing onStart={handleStartAnalysis} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="container mx-auto px-4 py-8">
        {renderStep()}
      </main>
    </div>
  );
};

export default App;