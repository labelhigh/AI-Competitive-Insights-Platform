import React from 'react';
import type { AnalysisReport, Competitor } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardAdvertisingProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const DashboardAdvertising: React.FC<DashboardAdvertisingProps> = ({ report, companies }) => {
    const chartData = companies.map(company => ({
        name: company.name,
        '月廣告花費 (USD)': report[company.id]?.advertising?.monthlyAdSpend || 0,
    }));

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">線上廣告策略</h2>
            
            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                 <h3 className="text-xl font-semibold text-text-primary mb-4">預估月廣告花費</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#718096" />
                            <YAxis stroke="#718096" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                            <Legend />
                            <Bar dataKey="月廣告花費 (USD)" fill="#F6AD55" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">主要付費關鍵字</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company, index) => {
                        const keywords = report[company.id]?.advertising?.topKeywords || [];
                        return (
                            <div key={company.id} className={`p-5 rounded-lg border ${index === 0 ? 'bg-brand-primary-light border-brand-primary' : 'bg-background border-border-color'}`}>
                                <h4 className="text-base font-bold mb-3 text-text-primary">{company.name}</h4>
                                <ul className="space-y-1">
                                    {keywords.map(kw => (
                                        <li key={kw} className="text-sm text-text-secondary before:content-['#'] before:text-brand-secondary before:mr-1">{kw}</li>
                                    ))}
                                    {keywords.length === 0 && <li className="text-sm text-gray-400">無數據</li>}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardAdvertising;