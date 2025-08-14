import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import Header from "../components/reusable-header";
import {
  FiPlay,
  FiBookOpen,
  FiLayers,
  FiDownload,
  FiEye,
} from "react-icons/fi";

const TABS = [
  { label: "All Content", value: "all" },
  { label: "Books", value: "books" },
  { label: "Videos", value: "videos" },
  { label: "Courses", value: "courses" },
  { label: "My Library", value: "my-library" },
];

const TRAINING_CONTENT = [
  {
    type: "Video Course",
    category: "videos",
    color: "bg-blue-500",
    labelColor: "bg-blue-400",
    icon: <FiPlay size={40} className="mx-auto text-white" />,
    title: "Advanced React Development",
    desc: "Master React patterns, hooks, and performance optimization techniques",
    stats: "6 hours · 12 lessons",
    downloads: 234,
    free: true,
  },
  {
    type: "E-Book",
    category: "books",
    color: "bg-purple-500",
    labelColor: "bg-purple-400",
    icon: <FiBookOpen size={40} className="mx-auto text-white" />,
    title: "Leadership in Tech",
    desc: "Essential guide for technical leaders and managers in modern organizations",
    stats: "324 pages · PDF + EPUB",
    downloads: 89,
    free: true,
  },
  {
    type: "Interactive Course",
    category: "courses",
    color: "bg-green-500",
    labelColor: "bg-green-400",
    icon: <FiLayers size={40} className="mx-auto text-white" />,
    title: "Effective Communication Skills",
    desc: "Build confidence in presentations, meetings, and team interactions",
    stats: "3 hours · 8 modules",
    downloads: 156,
    free: true,
  },
];

const Training = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredContent = TRAINING_CONTENT.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Learning Library"
        subtitle="Browse and download training resources."
        buttonText="Add Content"
        dropDownText="All Content"
        dropDownOptions={TABS.map((tab) => tab.label)}
        searchPlaceholder="Search courses, books, videos..."
        onButtonClick={() => {}}
      />

      {/* Tabs */}
      <div className="flex items-center gap-3 my-4 flex-wrap">
        {TABS.map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? "default" : "outline"}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition",
              activeTab === tab.value
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.length > 0 ? (
          filteredContent.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-2xl shadow-lg overflow-hidden flex flex-col",
                item.color,
                "bg-gradient-to-br from-white/80 to-white/30"
              )}
            >
              <div className="p-6 pb-4 flex-1 flex flex-col justify-between relative">
                <span
                  className={cn(
                    "absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white",
                    item.labelColor
                  )}
                >
                  {item.type}
                </span>
                <div className="flex-1 flex flex-col justify-center items-center py-6">
                  {item.icon}
                </div>
              </div>
              <div className="bg-white p-6 pt-4 flex flex-col gap-2">
                <h2 className="font-semibold text-lg text-gray-800 mb-1">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm mb-2">{item.desc}</p>
                <div className="flex items-center text-gray-400 text-xs gap-4 mb-4">
                  <span>{item.stats}</span>
                  <span className="flex items-center gap-1">
                    <FiDownload /> {item.downloads} downloads
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
                    <FiDownload className="inline mr-1" /> Download
                  </Button>
                  <Button variant="outline" className="flex-0 rounded-md">
                    <FiEye />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full text-center">
            No content found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Training;
