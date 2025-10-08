import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AnalysisReport, Competitor } from '../../types';

interface DashboardSeoProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const DashboardSeo: React.FC<DashboardSeoProps> = ({ report, companies }) => {
    const domainAuthorityData = companies.map(company => ({
        name: company.name,
        '域名權重': report[company.id]?.seo.domainAuthority || 0,
    }));

    const keywordsData = companies.map(company => ({
        name: company.name,
        '自然關鍵字': report[company.id]?.seo.keywords || 0,
    }));

    const backlinksData = companies.map(company => ({
        name: company.name,
        '反向連結': report[company.id]?.seo.backlinks || 0,
    }));


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">SEO 分析</h2>
            
            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">關鍵 SEO 指標比較</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-border-color">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-text-secondary">競品</th>
                                <th className="p-3 text-right text-sm font-semibold text-text-secondary">域名權重</th>
                                <th className="p-3 text-right text-sm font-semibold text-text-secondary">自然關鍵字</th>
                                <th className="p-3 text-right text-sm font-semibold text-text-secondary">反向連結</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company, index) => {
                                const data = report[company.id]?.seo;
                                return (
                                    <tr key={company.id} className={`border-b border-border-color ${index === 0 ? 'bg-brand-primary-light' : ''}`}>
                                        <td className="p-3 font-medium flex items-center gap-3">
                                            <img src={company.logo} alt={company.name} className="w-6 h-6 rounded-sm"/>
                                            {company.name}
                                        </td>
                                        <td className="p-3 text-right font-mono">{data?.domainAuthority}</td>
                                        <td className="p-3 text-right font-mono">{data?.keywords.toLocaleString()}</td>
                                        <td className="p-3 text-right font-mono">{data?.backlinks.toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">域名權重</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={domainAuthorityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="name" stroke="#718096" tick={false} />
                                <YAxis stroke="#718096" />
                                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                                <Bar dataKey="域名權重" fill="#4299E1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                 <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">自然關鍵字</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={keywordsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="name" stroke="#718096" tick={false} />
                                <YAxis stroke="#718096" tickFormatter={(value) => `${Number(value) / 1000}k`} />
                                <Tooltip formatter={(value: number) => value.toLocaleString()} contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                                <Bar dataKey="自然關鍵字" fill="#4FD1C5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                 <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">反向連結</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={backlinksData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                <XAxis dataKey="name" stroke="#718096" tick={false} />
                                <YAxis stroke="#718096" tickFormatter={(value) => `${Number(value) / 1000}k`} />
                                <Tooltip formatter={(value: number) => value.toLocaleString()} contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                                <Bar dataKey="反向連結" fill="#F6AD55" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardSeo;