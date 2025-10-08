import React from 'react';
import type { AnalysisReport, Competitor } from '../../types';
import { ALL_FEATURES } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardFeaturesProps {
    report: AnalysisReport;
    companies: Competitor[];
}

const CheckIcon = () => (
    <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const CrossIcon = () => (
    <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const DashboardFeatures: React.FC<DashboardFeaturesProps> = ({ report, companies }) => {

    const userFeatures = new Set(report['my-company']?.features || []);
    
    const featureCountData = companies.map(company => ({
        name: company.name,
        '功能數量': report[company.id]?.features.length || 0,
    }));


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">功能與定價分析</h2>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">功能矩陣比較</h3>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left">
                        <thead>
                            <tr className="border-b-2 border-border-color">
                                <th className="p-3 w-1/4 text-sm font-semibold text-text-secondary">功能</th>
                                {companies.map(company => (
                                    <th key={company.id} className="p-3 text-center w-1/6">
                                        <div className="flex flex-col items-center gap-1">
                                            <img src={company.logo} alt={company.name} className="w-8 h-8 rounded-md" />
                                            <span className="text-sm font-medium">{company.name}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ALL_FEATURES.map((feature, index) => {
                                const isUniqueToUser = userFeatures.has(feature) && companies.slice(1).every(c => !report[c.id]?.features.includes(feature));
                                return (
                                <tr key={feature} className="border-b border-border-color">
                                    <td className={`p-3 font-medium ${isUniqueToUser ? 'text-brand-primary font-bold' : 'text-text-primary'}`}>{feature} {isUniqueToUser && '✨'}</td>
                                    {companies.map(company => {
                                        const hasFeature = report[company.id]?.features.includes(feature);
                                        return (
                                            <td key={company.id} className="p-3 text-center">
                                                <div className="flex justify-center">
                                                    {hasFeature ? <CheckIcon/> : <CrossIcon />}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">功能總數比較</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={featureCountData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#718096" />
                            <YAxis stroke="#718096" allowDecimals={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} cursor={{fill: '#F7FAFC'}} />
                            <Bar dataKey="功能數量" fill="#B794F4" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">定價方案比較</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.slice(0, 3).map((company, index) => { // show first 3 for brevity
                        const pricingData = report[company.id]?.pricing || [];
                        return (
                            <div key={company.id} className={`p-5 rounded-lg border ${index === 0 ? 'bg-brand-primary-light border-brand-primary' : 'bg-background border-border-color'}`}>
                                <h4 className="text-lg font-bold text-center text-text-primary">{company.name}</h4>
                                <div className="mt-4 space-y-4">
                                    {pricingData.map(tier => (
                                        <div key={tier.name} className="p-3 bg-card rounded-md border border-border-color">
                                            <div className="flex justify-between items-baseline">
                                                <p className="font-semibold text-text-primary">{tier.name}</p>
                                                <p className="font-bold text-brand-primary">{tier.price}</p>
                                            </div>
                                            <ul className="text-sm mt-2 list-disc list-inside text-text-secondary">
                                                {tier.features.map(f => <li key={f}>{f}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
};

export default DashboardFeatures;