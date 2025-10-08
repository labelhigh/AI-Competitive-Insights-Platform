
export interface Competitor {
  id: string;
  name: string;
  url: string;
  logo: string;
}

export interface AnalysisModule {
  id: string;
  title: string;
  description: string;
  required?: boolean;
}

export interface SeoData {
  domainAuthority: number;
  keywords: number;
  backlinks: number;
}

export interface TrafficData {
  monthlyVisits: number;
  sources: { name: string; value: number }[];
  bounceRate: number;
  avgStay: number; // in minutes
}

export interface SocialData {
  platform: string;
  followers: number;
  engagementRate: number;
}

export interface PricingTier {
    name: string;
    price: string;
    features: string[];
}

export interface ReputationData {
    positive: number;
    neutral: number;
    negative: number;
    wordCloud: { text: string; value: number; type: 'pro' | 'con'}[];
}

export interface TechStackData {
    frontend: string[];
    backend: string[];
    analytics: string[];
}

export interface AdvertisingData {
    monthlyAdSpend: number;
    topKeywords: string[];
}

export interface HiringData {
    openRoles: number;
    focusAreas: string[];
}

export interface ContentData {
    blogFrequency: string;
    topTopics: string[];
}

export interface Task {
  id: number;
  text: string;
  dueDate: string; // YYYY-MM-DD format
  completed: boolean;
}


export interface CompetitorAnalysisData {
  seo: SeoData;
  traffic: TrafficData;
  social: SocialData[];
  features: string[];
  pricing: PricingTier[];
  reputation: ReputationData;
  techStack?: TechStackData;
  advertising?: AdvertisingData;
  hiring?: HiringData;
  content?: ContentData;
}

export interface AnalysisReport {
  [competitorId: string]: CompetitorAnalysisData;
}