import React, { useState, useMemo } from 'react';
import type { Competitor } from '../types';
import { MOCK_COMPETITORS } from '../constants';

interface Step2CompetitorSelectionProps {
  userUrl: string;
  onConfirm: (competitors: Competitor[]) => void;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

const Step2CompetitorSelection: React.FC<Step2CompetitorSelectionProps> = ({ userUrl, onConfirm }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>(MOCK_COMPETITORS);
  const [selectedCompetitors, setSelectedCompetitors] = useState<Set<string>>(
    new Set(MOCK_COMPETITORS.map(c => c.id))
  );
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');
  
  const userDomain = useMemo(() => {
      try {
          return new URL(userUrl.startsWith('http') ? userUrl : `https://${userUrl}`).hostname;
      } catch {
          return userUrl;
      }
  }, [userUrl]);


  const handleToggleCompetitor = (id: string) => {
    setSelectedCompetitors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCompetitorUrl.trim()) {
      const id = `manual-${Date.now()}`;
      const newCompetitor: Competitor = {
        id,
        name: new URL(newCompetitorUrl.startsWith('http') ? newCompetitorUrl : `https://${newCompetitorUrl}`).hostname,
        url: newCompetitorUrl,
        logo: `https://picsum.photos/seed/${id}/40/40`,
      };
      setCompetitors(prev => [...prev, newCompetitor]);
      setSelectedCompetitors(prev => new Set(prev).add(id));
      setNewCompetitorUrl('');
    }
  };

  const handleConfirm = () => {
    const finalSelection = competitors.filter(c => selectedCompetitors.has(c.id));
    onConfirm(finalSelection);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-text-primary">競品確認</h1>
      <p className="mt-2 text-center text-text-secondary">我們的 AI 識別出這些潛在的競爭對手。請檢視並調整列表。</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 p-6 bg-card rounded-xl border border-border-color shadow-sm">
          <h2 className="text-xl font-semibold text-brand-primary">您的公司</h2>
          <div className="mt-4 flex items-center gap-3">
             <img src={`https://picsum.photos/seed/${userDomain}/40/40`} alt="Your company logo" className="w-10 h-10 rounded-md" />
            <span className="font-medium truncate text-text-primary">{userDomain}</span>
          </div>
        </div>

        <div className="md:col-span-2 p-6 bg-card rounded-xl border border-border-color shadow-sm">
          <h2 className="text-xl font-semibold text-brand-primary">AI 識別的競品</h2>
          <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
            {competitors.map(comp => (
              <label key={comp.id} className="flex items-center p-3 bg-background rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={selectedCompetitors.has(comp.id)}
                  onChange={() => handleToggleCompetitor(comp.id)}
                  className="h-5 w-5 rounded bg-gray-200 text-brand-primary focus:ring-brand-primary border-border-color"
                />
                <img src={comp.logo} alt={`${comp.name} logo`} className="w-8 h-8 rounded-md ml-4 mr-3" />
                <span className="flex-grow font-medium text-text-primary">{comp.name}</span>
                <span className="text-sm text-text-secondary">{comp.url}</span>
              </label>
            ))}
          </div>

          <form onSubmit={handleAddCompetitor} className="mt-6">
            <label className="block text-sm font-medium text-text-secondary mb-1" htmlFor="add-competitor">
              手動新增競品
            </label>
            <div className="flex gap-2">
              <input
                id="add-competitor"
                type="url"
                value={newCompetitorUrl}
                onChange={(e) => setNewCompetitorUrl(e.target.value)}
                placeholder="https://www.anothercompetitor.com"
                className="flex-grow bg-white border border-border-color rounded-md px-3 py-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
              />
              <button type="submit" className="flex-shrink-0 p-2 bg-brand-primary hover:bg-blue-500 rounded-md text-white transition-colors duration-200">
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={handleConfirm}
          disabled={selectedCompetitors.size === 0}
          className="bg-brand-primary hover:bg-blue-500 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          下一步：選擇分析模組 ({selectedCompetitors.size} 個已選)
        </button>
      </div>
    </div>
  );
};

export default Step2CompetitorSelection;