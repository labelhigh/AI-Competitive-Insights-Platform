import React, { useState, useMemo } from 'react';
import type { Competitor, AnalysisModule, AnalysisReport } from '../types';
import { MOCK_ANALYSIS_REPORT } from '../constants';
import DashboardOverview from './dashboard/DashboardOverview';
import DashboardSeo from './dashboard/DashboardSeo';
import DashboardTraffic from './dashboard/DashboardTraffic';
import DashboardFeatures from './dashboard/DashboardFeatures';
import DashboardSocial from './dashboard/DashboardSocial';
import DashboardReputation from './dashboard/DashboardReputation';
import DashboardTechStack from './dashboard/DashboardTechStack';
import DashboardAdvertising from './dashboard/DashboardAdvertising';
import DashboardHiring from './dashboard/DashboardHiring';
import DashboardContent from './dashboard/DashboardContent';
import DashboardActionItems from './dashboard/DashboardActionItems';

interface Step4DashboardProps {
  userUrl: string;
  competitors: Competitor[];
  modules: AnalysisModule[];
  onReset: () => void;
}

const TABS = [
  { id: 'overview', label: '總覽與洞察' },
  { id: 'action-items', label: '行動清單' },
  { id: 'seo', label: 'SEO 分析' },
  { id: 'traffic', label: '流量分析' },
  { id: 'features', label: '功能與定價' },
  { id: 'social', label: '社群與內容' },
  { id: 'reputation', label: '品牌聲譽' },
  { id: 'techStack', label: '技術堆疊' },
  { id: 'advertising', label: '廣告策略' },
  { id: 'hiring', label: '招募動態' },
  { id: 'content', label: '內容策略' },
];

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
  </svg>
);

const Step4Dashboard: React.FC<Step4DashboardProps> = ({ userUrl, competitors, modules, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const report: AnalysisReport = MOCK_ANALYSIS_REPORT;
  
  const userCompany = useMemo(() => ({
      id: 'my-company',
      name: '您的公司',
      url: userUrl,
      logo: `https://picsum.photos/seed/${new URL(userUrl.startsWith('http') ? userUrl : `https://${userUrl}`).hostname}/40/40`
  }), [userUrl]);

  const allCompanies = useMemo(() => [userCompany, ...competitors], [userCompany, competitors]);

  const enabledTabs = useMemo(() => {
    const moduleIds = new Set(modules.map(m => m.id));
    return TABS.filter(tab => tab.id === 'overview' || tab.id === 'action-items' || moduleIds.has(tab.id));
  }, [modules]);

  const handlePdfExport = () => {
    alert('正在準備 PDF 報告下載...');
    setIsExportMenuOpen(false);
  };

  const handleCsvExport = () => {
    alert('正在匯出詳細數據為 CSV...');
    setIsExportMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview report={report} companies={allCompanies} />;
      case 'action-items':
        return <DashboardActionItems />;
      case 'seo':
        return <DashboardSeo report={report} companies={allCompanies} />;
      case 'traffic':
        return <DashboardTraffic report={report} companies={allCompanies} />;
      case 'features':
          return <DashboardFeatures report={report} companies={allCompanies} />;
      case 'social':
          return <DashboardSocial report={report} companies={allCompanies} />;
      case 'reputation':
          return <DashboardReputation report={report} companies={allCompanies} />;
      case 'techStack':
          return <DashboardTechStack report={report} companies={allCompanies} />;
      case 'advertising':
          return <DashboardAdvertising report={report} companies={allCompanies} />;
      case 'hiring':
          return <DashboardHiring report={report} companies={allCompanies} />;
      case 'content':
          return <DashboardContent report={report} companies={allCompanies} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-1/5">
        <h2 className="text-2xl font-bold text-text-primary mb-6">分析報告</h2>
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 -mb-2 lg:pb-0 lg:mb-0">
          {enabledTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 border-t border-border-color pt-6 space-y-3">
            <div className="relative">
              <button
                onClick={() => setIsExportMenuOpen(prev => !prev)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 border border-brand-primary text-brand-primary hover:bg-brand-primary-light"
              >
                <DownloadIcon className="w-5 h-5" />
                匯出報告
              </button>
              {isExportMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-card border border-border-color rounded-md shadow-lg z-10">
                  <button
                    onClick={handlePdfExport}
                    className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-100 rounded-t-md"
                  >
                    下載為 PDF
                  </button>
                  <button
                    onClick={handleCsvExport}
                    className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-100 rounded-b-md"
                  >
                    匯出數據為 CSV
                  </button>
                </div>
              )}
            </div>
            <button
                onClick={onReset}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 bg-gray-200 text-text-secondary hover:bg-gray-300"
            >
                開始新分析
            </button>
        </div>
      </aside>
      <main className="lg:w-4/5">
        {renderContent()}
      </main>
    </div>
  );
};

export default Step4Dashboard;