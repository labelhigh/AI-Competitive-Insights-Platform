import React from 'react';
import type { AnalysisReport, Competitor } from '../../types';

interface DashboardTechStackProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const TechTag: React.FC<{ tech: string }> = ({ tech }) => (
    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full">
        {tech}
    </span>
);

const DashboardTechStack: React.FC<DashboardTechStackProps> = ({ report, companies }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">技術堆疊分析</h2>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">技術堆疊比較</h3>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left">
                        <thead>
                            <tr className="border-b-2 border-border-color">
                                <th className="p-3 w-1/4 text-sm font-semibold text-text-secondary">公司</th>
                                <th className="p-3 w-1/4 text-sm font-semibold text-text-secondary">前端</th>
                                <th className="p-3 w-1/4 text-sm font-semibold text-text-secondary">後端</th>
                                <th className="p-3 w-1/4 text-sm font-semibold text-text-secondary">分析工具</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company, index) => {
                                const data = report[company.id]?.techStack;
                                return (
                                    <tr key={company.id} className={`border-b border-border-color ${index === 0 ? 'bg-brand-primary-light' : ''}`}>
                                        <td className="p-3 font-medium flex items-center gap-3">
                                            <img src={company.logo} alt={company.name} className="w-6 h-6 rounded-sm"/>
                                            {company.name}
                                        </td>
                                        <td className="p-3">{data?.frontend.map(tech => <TechTag key={tech} tech={tech} />)}</td>
                                        <td className="p-3">{data?.backend.map(tech => <TechTag key={tech} tech={tech} />)}</td>
                                        <td className="p-3">{data?.analytics.map(tech => <TechTag key={tech} tech={tech} />)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardTechStack;