import React from 'react';
import type { AnalysisReport, Competitor } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardSocialProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const COLORS = ['#4299E1', '#4FD1C5', '#F6AD55', '#B794F4', '#ED8936', '#F56565'];

const DashboardSocial: React.FC<DashboardSocialProps> = ({ report, companies }) => {
    
    const followersChartData = ['X', 'LinkedIn', 'Facebook'].map(platform => {
        const entry: {[key:string]: any} = { name: platform };
        companies.forEach(company => {
            const platformData = report[company.id]?.social.find(s => s.platform === platform);
            entry[company.name] = platformData?.followers || 0;
        });
        return entry;
    });

    const engagementChartData = ['X', 'LinkedIn', 'Facebook'].map(platform => {
        const entry: {[key:string]: any} = { name: platform };
        companies.forEach(company => {
            const platformData = report[company.id]?.social.find(s => s.platform === platform);
            entry[company.name] = platformData?.engagementRate || 0;
        });
        return entry;
    });

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">社群與內容分析</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                    <div key={company.id} className={`p-5 rounded-xl border ${index === 0 ? 'bg-brand-primary-light border-brand-primary' : 'bg-card border-border-color shadow-md'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-md" />
                            <h4 className="text-lg font-bold text-text-primary">{company.name}</h4>
                        </div>
                        <div className="space-y-3">
                            {report[company.id]?.social.map(social => (
                                <div key={social.platform} className="flex justify-between text-sm">
                                    <span className="font-semibold text-text-secondary">{social.platform} 粉絲數:</span>
                                    <span className="font-mono text-brand-primary font-medium">{social.followers.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">各平台粉絲數</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={followersChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#718096" />
                            <YAxis stroke="#718096" tickFormatter={(value) => `${Number(value) / 1000}k`} />
                            <Tooltip formatter={(value: number) => value.toLocaleString()} contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                            <Legend />
                             {companies.map((company, index) => (
                                <Bar key={company.id} dataKey={company.name} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">各平台互動率 (%)</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={engagementChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#718096" />
                            <YAxis stroke="#718096" unit="%" />
                            <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                            <Legend />
                             {companies.map((company, index) => (
                                <Bar key={company.id} dataKey={company.name} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardSocial;