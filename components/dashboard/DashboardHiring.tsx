import React from 'react';
import type { AnalysisReport, Competitor } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardHiringProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const DashboardHiring: React.FC<DashboardHiringProps> = ({ report, companies }) => {
    
    const openRolesData = companies.map(company => ({
        name: company.name,
        '活躍職缺數': report[company.id]?.hiring?.openRoles || 0,
    }));
    
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">招募動態與人才策略</h2>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">招募指標比較</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-border-color">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-text-secondary">競品</th>
                                <th className="p-3 text-right text-sm font-semibold text-text-secondary">活躍職缺數</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">重點招募領域</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company, index) => {
                                const data = report[company.id]?.hiring;
                                return (
                                    <tr key={company.id} className={`border-b border-border-color ${index === 0 ? 'bg-brand-primary-light' : ''}`}>
                                        <td className="p-3 font-medium flex items-center gap-3">
                                            <img src={company.logo} alt={company.name} className="w-6 h-6 rounded-sm"/>
                                            {company.name}
                                        </td>
                                        <td className="p-3 text-right font-mono">{data?.openRoles}</td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-2">
                                                {data?.focusAreas.map(area => (
                                                    <span key={area} className="text-xs font-medium bg-gray-200 text-text-secondary px-2 py-1 rounded">
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">活躍職缺數比較</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={openRolesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#718096" />
                            <YAxis stroke="#718096" allowDecimals={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                            <Bar dataKey="活躍職缺數" fill="#ED8936" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardHiring;