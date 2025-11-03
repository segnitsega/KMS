import { useState } from 'react';

interface Document {
  id: string;
  title: string;
  views?: number;
  downloadCount: number;
}

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalDocuments: number;
  totalArticles: number;
  userActivity: { date: string; count: number }[];
  searchTerms: { term: string; count: number }[];
  popularContent: {
    documents: Document[];
    articles?: any[]; // Extend later if needed
  };
}

const mockAnalytics: AnalyticsData = {
  totalUsers: 1245,
  activeUsers: 973,
  totalDocuments: 342,
  totalArticles: 87,
  userActivity: [
    { date: 'mon', count: 95 },
    { date: 'Tues', count: 110 },
    { date: 'Wedn', count: 120 },
    { date: 'Thur', count: 105 },
    { date: 'Fri', count: 130 },
    { date: 'satur', count: 125 },
    { date: 'Sun', count: 138 },
  ],
  searchTerms: [
    { term: 'onboarding', count: 150 },
    { term: 'sales process', count: 90 },
    { term: 'security training', count: 75 },
    { term: 'documentation', count: 60 },
    { term: 'HR policy', count: 45 },
  ],
  popularContent: {
    documents: [
      {
        id: 'doc1',
        title: 'Employee Onboarding Guide',
        views: 320,
        downloadCount: 180,
      },
      {
        id: 'doc2',
        title: 'Remote Work Policy',
        views: 250,
        downloadCount: 140,
      },
      {
        id: 'doc3',
        title: 'Annual Review Process',
        views: 210,
        downloadCount: 130,
      },
    ],
    articles: [],
  },
};

export const useAnalytics = () => {
  const [analytics] = useState<AnalyticsData>(mockAnalytics);
  return { analytics };
};
