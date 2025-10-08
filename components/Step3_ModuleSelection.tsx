import React, { useState } from 'react';
import type { AnalysisModule } from '../types';
import { ALL_MODULES } from '../constants';

interface Step3ModuleSelectionProps {
  onConfirm: (modules: AnalysisModule[]) => void;
}

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);


const Step3ModuleSelection: React.FC<Step3ModuleSelectionProps> = ({ onConfirm }) => {
  const [selectedModules, setSelectedModules] = useState<Set<string>>(
    new Set(ALL_MODULES.filter(m => m.required).map(m => m.id))
  );

  const handleToggleModule = (id: string) => {
    const module = ALL_MODULES.find(m => m.id === id);
    if (module?.required) return;

    setSelectedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleConfirm = () => {
    const finalSelection = ALL_MODULES.filter(m => selectedModules.has(m.id));
    onConfirm(finalSelection);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-text-primary">選擇分析模組</h1>
      <p className="mt-2 text-center text-text-secondary">選擇您想要分析的維度。必選模組已預先選取。</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_MODULES.map(module => {
          const isSelected = selectedModules.has(module.id);
          const isRequired = module.required ?? false;
          return (
            <div
              key={module.id}
              onClick={() => handleToggleModule(module.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 shadow-sm ${
                isSelected
                  ? 'bg-brand-primary-light border-brand-primary'
                  : 'bg-card border-border-color'
              } ${isRequired ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:border-brand-primary hover:shadow-md'}`}
            >
              <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-text-primary">{module.title}</h2>
                  {isSelected && <CheckCircleIcon className="w-7 h-7 text-brand-primary" />}
              </div>
              <p className="mt-2 text-text-secondary">{module.description}</p>
              {isRequired && (
                <span className="mt-3 inline-block text-xs font-semibold bg-gray-200 text-text-secondary py-1 px-2 rounded-full">
                  必選
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleConfirm}
          className="bg-brand-primary hover:bg-blue-500 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          產生分析報告
        </button>
      </div>
    </div>
  );
};

export default Step3ModuleSelection;