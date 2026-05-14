import React, { createContext, useContext, useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  BookOpen,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useAnalytics } from "../hooks/useAnalytics";
import { useQuery } from "@tanstack/react-query";
import api from "@/utility/api";
import loadingSpinner from "../assets/loading-spinner.svg";

const AuthContext = createContext({ currentUser: { role: "admin" } });
const useAuth = () => useContext(AuthContext);

const Analytics: React.FC = () => {
  const getData = async () => {
    const [statsRes, docsRes, articlesRes, usersRes] = await Promise.allSettled([
      api.get(`/status-count`),
      api.get(`/docs?page=1&limit=100`),
      api.get(`/articles?page=1&limit=100`),
      api.get(`/user?page=1&limit=100`),
    ]);

    return {
      statsCount:
        statsRes.status === "fulfilled" ? statsRes.value.data : null,
      documents:
        docsRes.status === "fulfilled"
          ? docsRes.value.data.documents ?? []
          : [],
      articles:
        articlesRes.status === "fulfilled"
          ? articlesRes.value.data.articles ?? []
          : [],
      users:
        usersRes.status === "fulfilled" ? usersRes.value.data.users ?? [] : [],
    };
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: getData,
    queryKey: ["dashboard"],
  });

  const { currentUser } = useAuth();
  const { analytics } = useAnalytics();

  const [overviewFilter, setOverviewFilter] = useState("Overview");
  const [dateFilter, setDateFilter] = useState("Last 7 days");

  const dashboardStats = useMemo(() => {
    const users = data?.users ?? [];
    const documents = data?.documents ?? [];
    const articles = data?.articles ?? [];

    return {
      totalUsers: users.length,
      activeUsers: users.length,
      totalDocuments: documents.length,
      totalArticles: articles.length,
      popularDocuments: documents.slice(3) as { id: string; title: string }[],
      popularArticles: articles.slice(0, 3) as { id: string; title: string }[],
    };
  }, [data]);

  if (!["admin", "expert"].includes(currentUser?.role)) {
    return (
      <div className="flex w-full min-w-0 justify-center px-4 py-10 sm:py-16">
        <div className="text-center text-gray-500">
          <BarChart3 className="mx-auto mb-4 h-12 w-12 sm:h-16 sm:w-16" />
          <h3 className="mb-2 text-base font-medium text-gray-900 sm:text-lg">
            Access Restricted
          </h3>
          <p className="text-sm sm:text-base">
            You don't have permission to view analytics.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex justify-center py-10 sm:py-16">
        <img src={loadingSpinner} width={50} alt="loading" />
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-[12rem] items-center justify-center rounded-md bg-white px-4 py-8 text-center text-sm text-red-500 sm:text-base">
        Failed to load analytics. Please refresh the page.
      </div>
    );

  if (data)
    return (
      <div className="w-full min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Analytics & Reports
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Monitor platform usage and performance metrics
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-4">
            <select
              value={overviewFilter}
              onChange={(e) => setOverviewFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 text-sm sm:w-auto sm:text-base"
            >
              <option>Overview</option>
              <option>Content Performance</option>
              <option>User Engagement</option>
              <option>Search Analytics</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 text-sm sm:w-auto sm:text-base"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 1 year</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {[
            {
              title: "Total Users",
              icon: <Users className="w-6 h-6 text-blue-600" />,
              value: dashboardStats.totalUsers,
              bg: "bg-blue-100",
              change: "+12%",
            },
            {
              title: "Active Users",
              icon: <TrendingUp className="w-6 h-6 text-green-600" />,
              value: dashboardStats.activeUsers,
              bg: "bg-green-100",
              change: "+8%",
            },
            {
              title: "Total Documents",
              icon: <FileText className="w-6 h-6 text-purple-600" />,
              value: dashboardStats.totalDocuments,
              bg: "bg-purple-100",
              change: "+15%",
            },
            {
              title: "Knowledge Articles",
              icon: <BookOpen className="w-6 h-6 text-orange-600" />,
              value: dashboardStats.totalArticles,
              bg: "bg-orange-100",
              change: "+5%",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg bg-white p-3 shadow sm:gap-4 sm:p-4"
            >
              <div className={`shrink-0 rounded-lg p-2.5 sm:p-3 ${item.bg}`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 sm:text-sm">{item.title}</p>
                <p className="text-xl font-bold sm:text-2xl">{item.value ?? 0}</p>
                <p className="flex items-center text-xs text-green-600 sm:text-sm">
                  <TrendingUp className="mr-1 h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
                  <span className="truncate">{item.change} from last week</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:gap-6 lg:mb-8 lg:grid-cols-2">
          <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
              User Activity Trends
            </h3>
            <div className="h-[220px] w-full sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics?.userActivity || []}
                margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  name="Active Users"
                  fill="#4285F4"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-6 rounded-lg bg-white p-4 shadow sm:p-6 lg:flex-row lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <h2 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Recent Documents</h2>
              <ul className="space-y-3 sm:space-y-5">
                {dashboardStats.popularDocuments.map((doc) => (
                  <li key={doc.id} className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="shrink-0 rounded-md bg-blue-100 p-2">
                      <FileText className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium sm:text-base">{doc.title}</span>
                    {/* <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{doc.views ?? 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                     <Download className="w-4 h-4" />
                    <span>{doc.downloadCount ?? 0}</span>
                    </div>
                  </div> */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Recent Articles</h2>
              <ul className="space-y-3 sm:space-y-5">
                {dashboardStats.popularArticles.map((art) => (
                  <li key={art.id} className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="shrink-0 rounded-md bg-blue-100 p-2">
                      <FileText className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5" />
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium sm:text-base">{art.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow sm:p-6">
          <h2 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Popular Search Terms</h2>
          <div className="-mx-1 flex gap-3 overflow-x-auto pb-1 sm:gap-4">
            {analytics?.searchTerms?.map((term, idx) => (
              <div
                key={idx}
                className="flex min-w-[100px] shrink-0 flex-col items-center rounded-md bg-gray-100 px-6 py-2.5 sm:min-w-[120px] sm:px-10 sm:py-3"
              >
                <span className="text-lg font-bold text-blue-600 sm:text-xl">
                  {term.count}
                </span>
                <span className="max-w-[8rem] truncate text-center text-xs text-gray-700 sm:max-w-none sm:text-sm">
                  {term.term}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow sm:flex-row sm:flex-wrap sm:gap-3 sm:p-6">
          <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 sm:w-auto sm:text-base">
            Export PDF Report
          </button>
          <button className="w-full rounded-md bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700 sm:w-auto sm:text-base">
            Export CSV Data
          </button>
          <button className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700 sm:w-auto sm:text-base">
            Schedule Report
          </button>
        </div>
      </div>
    );
};

export default Analytics;
