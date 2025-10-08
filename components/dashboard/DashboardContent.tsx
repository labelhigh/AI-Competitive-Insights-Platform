import React from 'react';
import type { AnalysisReport, Competitor } from '../../types';

interface DashboardContentProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ report, companies }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">進階內容策略</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, index) => {
                    const data = report[company.id]?.content;
                    return (
                        <div key={company.id} className={`p-5 rounded-xl border ${index === 0 ? 'bg-brand-primary-light border-brand-primary' : 'bg-card border-border-color shadow-md'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-md" />
                                <h4 className="text-lg font-bold text-text-primary">{company.name}</h4>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-text-secondary">發佈頻率:</span>
                                    <span className="font-mono text-brand-primary font-medium">{data?.blogFrequency || 'N/A'}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-text-secondary text-sm mb-1">熱門主題:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        {data?.topTopics.map(topic => (
                                            <li key={topic} className="text-sm text-text-secondary">{topic}</li>
                                        ))}
                                        {(data?.topTopics?.length === 0 || !data) && <li className="text-sm text-gray-400">無數據</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DashboardContent;