import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { AnalysisReport, Competitor } from '../../types';
import { generateSwotAnalysis } from '../../services/geminiService';

interface DashboardOverviewProps {
    report: AnalysisReport;
    companies: Competitor[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ report, companies }) => {
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userUrl = companies[0]?.url;
        const competitors = companies.slice(1);

        if (!userUrl) {
            setIsLoading(false);
            setSummary("無法確定使用者公司 URL。");
            return;
        }

        const fetchSummary = async () => {
          setIsLoading(true);
          try {
            const result = await generateSwotAnalysis(userUrl, competitors, report);
            setSummary(result);
          } catch (error) {
            console.error("Failed to generate AI summary", error);
            setSummary("目前無法生成 AI 摘要。");
          } finally {
            setIsLoading(false);
          }
        };
        fetchSummary();
      }, [companies, report]);


    const radarData = companies.map(company => {
        const data = report[company.id];
        if (!data) return { subject: company.name };
        return {
            subject: company.name,
            seo: data.seo.domainAuthority,
            流量: data.traffic.monthlyVisits / 10000, // Normalize
            功能: data.features.length * 10, // Normalize
            社群: data.social.reduce((acc, s) => acc + s.followers, 0) / 10000, // Normalize
            聲譽: data.reputation.positive,
            fullMark: 100,
        };
    });

    // We need to transpose the data for Recharts RadarChart
    const transposedData = [
        { dimension: 'SEO' },
        { dimension: '流量' },
        { dimension: '功能' },
        { dimension: '社群' },
        { dimension: '聲譽' },
    ].map(item => {
        const dimensionData: { [key: string]: any } = { dimension: item.dimension };
        radarData.forEach(companyData => {
            dimensionData[companyData.subject] = companyData[item.dimension.toLowerCase() as keyof typeof companyData];
        });
        return dimensionData;
    });

    const colors = ['#4299E1', '#4FD1C5', '#F6AD55', '#B794F4', '#ED8936', '#F56565'];

    return (
        <div className="space-y-8">
            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary">AI 生成的洞察報告</h3>
                {isLoading ? (
                    <div className="space-y-3 mt-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                ) : (
                    <div className="prose mt-4 max-w-none prose-p:text-text-secondary prose-strong:text-brand-primary" dangerouslySetInnerHTML={{ __html: summary?.replace(/\n/g, '<br />') || "" }} />
                )}
            </div>
            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">競爭格局雷達圖</h3>
                 <div style={{ width: '100%', height: 400 }}>
                     <ResponsiveContainer>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={transposedData}>
                            <PolarGrid stroke="#E2E8F0" />
                            <PolarAngleAxis dataKey="dimension" stroke="#718096" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#E2E8F0" />
                            {companies.map((company, index) => (
                                <Radar key={company.id} name={company.name} dataKey={company.name} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} fillOpacity={0.6} />
                            ))}
                            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
                            <Legend wrapperStyle={{ color: '#2D3748', paddingTop: '20px' }}/>
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;