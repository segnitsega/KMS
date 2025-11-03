import React, { createContext, useContext, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  BookOpen,
  Download,
  Eye,
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
    const statsCount = await api.get(`/status-count`);
    const documents = await api.get(`/docs?&limit=100`);
    const articles = await api.get(`/articles?&limit=100`);
    const users = await api.get(`/user`);
    return {
      statsCount: statsCount.data,
      documents: documents.data.documents,
      articles: articles.data.articles,
      users: users.data.users,
    };
  };

  const { data, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["dashboard"],
  });

  if (isLoading) console.log("THe data is loading");
  if (data) console.log("Here is the data", data);

  const { currentUser } = useAuth();
  const { analytics } = useAnalytics();
  analytics.activeUsers = data?.users.length;
  analytics.totalUsers = data?.users.length;
  analytics.totalDocuments = data?.documents.length;
  analytics.totalArticles = data?.articles.length;
  analytics.popularContent.documents = data?.documents.slice(3);
  analytics.popularContent.articles = data?.articles.slice(0, 3)

  console.log("articles", data?.articles);
  console.log("documents", data?.documents);

  const [overviewFilter, setOverviewFilter] = useState("Overview");
  const [dateFilter, setDateFilter] = useState("Last 7 days");

  if (!["admin", "expert"].includes(currentUser?.role)) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-500">
          <BarChart3 className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Access Restricted
          </h3>
          <p>You don't have permission to view analytics.</p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex h-screen bg-white justify-center items-center">
        <img src={loadingSpinner} width={50} alt="loading" />
      </div>
    );

  if (data)
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics & Reports
            </h1>
            <p className="text-gray-600">
              Monitor platform usage and performance metrics
            </p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <select
              value={overviewFilter}
              onChange={(e) => setOverviewFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-gray-200"
            >
              <option>Overview</option>
              <option>Content Performance</option>
              <option>User Engagement</option>
              <option>Search Analytics</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-gray-200"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 1 year</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Total Users",
              icon: <Users className="w-6 h-6 text-blue-600" />,
              value: analytics?.totalUsers,
              bg: "bg-blue-100",
              change: "+12%",
            },
            {
              title: "Active Users",
              icon: <TrendingUp className="w-6 h-6 text-green-600" />,
              value: analytics?.activeUsers,
              bg: "bg-green-100",
              change: "+8%",
            },
            {
              title: "Total Documents",
              icon: <FileText className="w-6 h-6 text-purple-600" />,
              value: analytics?.totalDocuments,
              bg: "bg-purple-100",
              change: "+15%",
            },
            {
              title: "Knowledge Articles",
              icon: <BookOpen className="w-6 h-6 text-orange-600" />,
              value: analytics?.totalArticles,
              bg: "bg-orange-100",
              change: "+5%",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
            >
              <div className={`p-3 rounded-lg ${item.bg}`}>{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold">{item.value ?? 0}</p>
                <p className="text-green-600 text-sm flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {item.change} from last week
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              User Activity Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analytics?.userActivity || []}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
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
          <div className="bg-white rounded-lg shadow p-6 flex justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>
              <ul className="space-y-5">
                {analytics?.popularContent?.documents?.map((doc) => (
                  <li key={doc.id} className="flex items-center space-x-6">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="flex-1 font-medium">{doc.title}</span>
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

            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Articles</h2>
              <ul className="space-y-5">
                {analytics?.popularContent?.articles?.map((art) => (
                  <li key={art.id} className="flex items-center space-x-6">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="flex-1 font-medium">{art.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Search Terms</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {analytics?.searchTerms?.map((term, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-gray-100 rounded-md px-10 py-3 min-w-[120px]"
              >
                <span className="text-xl font-bold text-blue-600">
                  {term.count}
                </span>
                <span className="text-sm text-gray-700">{term.term}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Export PDF Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
            Export CSV Data
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
            Schedule Report
          </button>
        </div>
      </div>
    );
};

export default Analytics;
