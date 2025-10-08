import type { AnalysisModule, Competitor, AnalysisReport } from './types';

export const ALL_MODULES: AnalysisModule[] = [
  {
    id: 'seo',
    title: '網站與 SEO 分析',
    description: '網站速度、域名權重、關鍵字排名與反向連結分析。',
    required: true,
  },
  {
    id: 'traffic',
    title: '網站流量與使用者行為',
    description: '預估月流量、流量來源、跳出率與平均網站停留時間。',
  },
  {
    id: 'features',
    title: '產品功能與定價策略',
    description: '產品功能與定價方案的結構化比較。',
  },
  {
    id: 'social',
    title: '內容與社群媒體行銷',
    description: '部落格更新頻率、社群媒體表現、粉絲數與互動率。',
  },
  {
    id: 'reputation',
    title: '使用者評價與品牌聲譽',
    description: '分析來自主要平台的客戶評論情緒。',
  },
  {
    id: 'techStack',
    title: '技術堆疊分析',
    description: '探測網站使用的前端框架、後端技術、分析工具等。'
  },
  {
    id: 'advertising',
    title: '線上廣告策略',
    description: '分析付費搜尋關鍵字、展示廣告素材與預估廣告花費。'
  },
  {
    id: 'hiring',
    title: '招募動態與人才策略',
    description: '分析職缺數量、類型與重點招募領域，洞察公司發展方向。'
  },
  {
    id: 'content',
    title: '進階內容策略',
    description: '深度分析部落格主題、內容格式（影片、白皮書）與發佈頻率。'
  }
];

export const MOCK_COMPETITORS: Competitor[] = [
    { id: 'c1', name: 'Innovate Inc.', url: 'www.innovate.com', logo: `https://picsum.photos/seed/innovate/40/40` },
    { id: 'c2', name: 'Synergy Solutions', url: 'www.synergy.com', logo: `https://picsum.photos/seed/synergy/40/40` },
    { id: 'c3', name: 'Future Forward', url: 'www.ffwd.com', logo: `https://picsum.photos/seed/ffwd/40/40` },
    { id: 'c4', name: 'Quantum Leap', url: 'www.qleap.com', logo: `https://picsum.photos/seed/qleap/40/40` },
    { id: 'c5', name: 'Apex Digital', url: 'www.apexdigital.com', logo: `https://picsum.photos/seed/apex/40/40` },
];

const ALL_FEATURES = ['雲端同步', 'API 存取', '全年無休支援', '進階分析', '單一登入整合', '團隊協作', '自訂品牌'];

const generateRandomData = (seed: string): any => {
    const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const random = (min: number, max: number) => (Math.abs(hash * 17) % (max - min)) + min;
    const randomFromArray = <T>(arr: T[]): T[] => arr.filter(() => random(0, 10) > 4);

    return {
        seo: {
            domainAuthority: random(40, 90),
            keywords: random(500, 10000),
            backlinks: random(1000, 100000),
        },
        traffic: {
            monthlyVisits: random(10000, 500000),
            sources: [
                { name: '直接流量', value: random(20, 40) },
                { name: '搜尋流量', value: random(40, 60) },
                { name: '社群流量', value: random(5, 15) },
                { name: '推薦流量', value: random(5, 10) },
            ],
            bounceRate: random(25, 60),
            avgStay: parseFloat(random(2, 8).toFixed(1)),
        },
        social: [
            { platform: 'X', followers: random(5000, 100000), engagementRate: parseFloat(random(1, 5).toFixed(2)) },
            { platform: 'LinkedIn', followers: random(10000, 250000), engagementRate: parseFloat(random(2, 8).toFixed(2)) },
            { platform: 'Facebook', followers: random(2000, 50000), engagementRate: parseFloat(random(0.5, 3).toFixed(2)) },
        ],
        features: ALL_FEATURES.filter(() => random(0, 10) > 3),
        pricing: [
            { name: '基本方案', price: `$${random(10, 29)}/月`, features: ['雲端同步', '基本分析'] },
            { name: '專業方案', price: `$${random(49, 99)}/月`, features: ['所有基本方案功能', 'API 存取', '全年無休支援'] },
            { name: '企業方案', price: '聯繫我們', features: ['所有專業方案功能', '單一登入整合', '自訂品牌'] },
        ],
        reputation: {
            positive: random(60, 90),
            neutral: random(5, 15),
            negative: random(5, 15),
            wordCloud: [
                { text: '簡單易用', value: random(50,100), type: 'pro'},
                { text: '支援很棒', value: random(40,80), type: 'pro'},
                { text: '價格實惠', value: random(30,70), type: 'pro'},
                { text: '穩定可靠', value: random(20,60), type: 'pro'},
                { text: '速度慢', value: random(20,50), type: 'con'},
                { text: '有臭蟲', value: random(15,40), type: 'con'},
                { text: '價格昂貴', value: random(10,30), type: 'con'},
            ].sort(() => 0.5 - Math.random())
        },
        techStack: {
            frontend: randomFromArray(['React', 'Vue.js', 'Next.js', 'Svelte']),
            backend: randomFromArray(['Node.js', 'Python', 'Go', 'Ruby on Rails']),
            analytics: randomFromArray(['Google Analytics', 'Amplitude', 'Mixpanel', 'Hotjar']),
        },
        advertising: {
            monthlyAdSpend: random(5000, 50000),
            topKeywords: randomFromArray(['AI 工具', '數據分析', '專案管理', 'CRM 軟體', '雲端儲存']),
        },
        hiring: {
            openRoles: random(5, 50),
            focusAreas: randomFromArray(['工程', '行銷', '銷售', '產品', '數據科學']),
        },
        content: {
            blogFrequency: ['每週 1 篇', '每週 2-3 篇', '每月 2 篇'][random(0,3)],
            topTopics: randomFromArray(['產業趨勢', '客戶成功案例', '產品教學', '領導力', '公司文化']),
        }
    };
};

export const MOCK_ANALYSIS_REPORT: AnalysisReport = {
  'my-company': generateRandomData('my-company'),
  'c1': generateRandomData('c1'),
  'c2': generateRandomData('c2'),
  'c3': generateRandomData('c3'),
  'c4': generateRandomData('c4'),
  'c5': generateRandomData('c5'),
};

export const MOCK_AI_SUMMARY = `
根據分析，**貴公司**展現出強大的潛力，但面臨著來自 **Innovate Inc.** 和 **Synergy Solutions** 等市場既有者的激烈競爭。

**主要優勢：** 您獨特的功能組合，尤其是在「自訂品牌」方面，提供了顯著的競爭優勢。您的使用者聲譽也相當不錯，「簡單易用」是經常被提及的正面評價。

**待改進領域：** 與競爭對手相比，SEO 和自然流量是主要弱點。Innovate Inc. 在關鍵字排名上佔據主導地位，而您的反向連結數量也明顯較少。社群媒體互動雖然穩定，但缺乏像 Future Forward 在 LinkedIn 上的高影響力。

**策略機會：** 透過投資目標明確的內容行銷和 SEO 策略來縮小流量差距，有明顯的機會可以奪取市佔率。利用「專業方案」的競爭性定價專注於中階市場，也可以從定價較高的 Synergy Solutions 手中吸引客戶。

**潛在威脅：** Quantum Leap 入門級方案的積極定價可能會威脅到您在低階市場的用戶獲取。此外，Apex Digital 在社群媒體粉絲數上的快速增長表明其正在大力進行品牌建設，這可能在不久的將來挑戰您的市場地位。
`;

export { ALL_FEATURES };