import React from 'react';
import type { AnalysisReport, Competitor } from '../../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardReputationProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const WordCloud: React.FC<{words: {text: string, value: number, type: 'pro' | 'con'}[]}> = ({ words }) => {
    const maxVal = Math.max(...words.map(w => w.value));
    return (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 p-4">
            {words.map(({text, value, type}) => {
                const fontSize = 1 + (value / maxVal) * 1.5; // from 1rem to 2.5rem
                return (
                    <span key={text} style={{fontSize: `${fontSize}rem`}} className={`${type === 'pro' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                        {text}
                    </span>
                )
            })}
        </div>
    );
};

const SENTIMENT_COLORS = { positive: '#22c55e', neutral: '#a0aec0', negative: '#f56565' };

const DashboardReputation: React.FC<DashboardReputationProps> = ({ report, companies }) => {
    const userReputation = report['my-company']?.reputation;

    const sentimentData = userReputation ? [
        {name: '正面', value: userReputation.positive},
        {name: '中立', value: userReputation.neutral},
        {name: '負面', value: userReputation.negative},
    ] : [];

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">品牌聲譽分析</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">您的評論情緒分析</h3>
                    {userReputation && 
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label>
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name === '正面' ? 'positive' : entry.name === '中立' ? 'neutral' : 'negative']} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    }
                </div>
                <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">競品情緒總覽</h3>
                    <div className="space-y-3 mt-4">
                        {companies.map(c => {
                            const data = report[c.id]?.reputation;
                            if(!data) return null;
                            const total = data.positive + data.neutral + data.negative;
                            return (
                                <div key={c.id}>
                                    <p className="font-semibold mb-1 text-text-primary">{c.name}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 flex overflow-hidden">
                                        <div className="h-2.5 bg-green-500" style={{width: `${data.positive/total*100}%`}}></div>
                                        <div className="h-2.5 bg-gray-400" style={{width: `${data.neutral/total*100}%`}}></div>
                                        <div className="h-2.5 bg-red-500" style={{width: `${data.negative/total*100}%`}}></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">評論中常見詞彙</h3>
                {userReputation && <WordCloud words={userReputation.wordCloud} />}
            </div>
        </div>
    );
};

export default DashboardReputation;