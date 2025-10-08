import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { AnalysisReport, Competitor } from '../../types';

interface DashboardTrafficProps {
  report: AnalysisReport;
  companies: Competitor[];
}

const COLORS = ['#4299E1', '#4FD1C5', '#F6AD55', '#B794F4'];

const CustomLineChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-card rounded-lg shadow-lg border border-border-color">
                <p className="mb-2 font-semibold text-text-primary">{label}</p>
                {payload.map((p: any) => (
                    <p key={p.dataKey} style={{ color: p.stroke }} className="text-sm font-medium">
                        {`${p.dataKey}: ${p.value.toLocaleString()}`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CustomPieChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-card rounded-lg shadow-lg border border-border-color">
                <p className="text-sm text-text-secondary">
                    {`${payload[0].name}: `}
                    <span className="font-bold text-text-primary">{`${payload[0].value}%`}</span>
                </p>
            </div>
        );
    }
    return null;
};


const DashboardTraffic: React.FC<DashboardTrafficProps> = ({ report, companies }) => {

    const lineChartData = [-5,-4,-3,-2,-1,0].map(monthOffset => {
        const entry: {[key: string]: any} = {
            name: monthOffset === 0 ? '今天' : `${-monthOffset} 個月前`,
        };
        companies.forEach(company => {
            const baseTraffic = report[company.id]?.traffic.monthlyVisits || 0;
            const fluctuation = 1 + (Math.sin(company.id.charCodeAt(0) + monthOffset) * 0.2); // semi-random trend
            entry[company.name] = Math.round(baseTraffic * fluctuation / 1000) * 1000;
        });
        return entry;
    });

    const userCompanyData = report[companies[0].id]?.traffic;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">流量分析</h2>
            
             <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">預估月流量趨勢 (近 6 個月)</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="name" stroke="#718096" />
                            <YAxis stroke="#718096" tickFormatter={(value) => `${Number(value) / 1000}k`} />
                            <Tooltip content={<CustomLineChartTooltip />} cursor={{ stroke: '#4299E1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                            <Legend />
                            {companies.map((company, index) => (
                                <Line key={company.id} type="monotone" dataKey={company.name} stroke={COLORS[index % COLORS.length]} strokeWidth={2} activeDot={{ r: 6 }} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">您的流量來源</h3>
                    {userCompanyData && 
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={userCompanyData.sources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {userCompanyData.sources.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip content={<CustomPieChartTooltip />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    }
                </div>
                <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">互動指標</h3>
                    <div className="space-y-4 mt-6">
                        {companies.map((company, index) => {
                             const data = report[company.id]?.traffic;
                             return (
                                <div key={company.id} className={`p-3 rounded-lg ${index === 0 ? 'bg-brand-primary-light': 'bg-background'}`}>
                                    <p className="font-bold text-text-primary">{company.name}</p>
                                    <div className="flex justify-between items-center mt-1 text-sm text-text-secondary">
                                        <span>跳出率: <span className="font-mono text-brand-primary font-medium">{data?.bounceRate}%</span></span>
                                        <span>平均停留時間: <span className="font-mono text-brand-primary font-medium">{data?.avgStay} 分鐘</span></span>
                                    </div>
                                </div>
                             )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTraffic;