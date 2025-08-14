import React, { useState } from "react";
import { MessageCircle, Mail, Phone } from "react-feather";
import { Button } from '@/components/ui/button';

const helpTopics = [
  {
    category: "Getting Started",
    articles: [
      "How to upload documents",
      "Setting up your profile",
      "Navigating the knowledge base",
      "Joining discussions",
    ],
  },
  {
    category: "Document Management",
    articles: [
      "Version control basics",
      "Setting permissions",
      "Organizing with tags",
      "Sharing documents",
    ],
  },
  {
    category: "Collaboration",
    articles: [
      "Starting discussions",
      "Finding experts",
      "Using the AI assistant",
      "Notification settings",
    ],
  },
];

const HelpSupportModule: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {helpTopics.map((topic, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm border-sky-200 shadow-lg">
            <div className="p-4 border-b border-sky-100">
              <h4 className="text-slate-800 font-semibold">{topic.category}</h4>
            </div>
            <div className="p-4 space-y-2">
              {topic.articles.map((article, articleIndex) => (
                <Button
                  key={articleIndex}
                  variant="ghost"
                  className={`w-full justify-start text-left text-slate-600 hover:text-sky-600 hover:bg-sky-50 ${selectedArticle === article ? 'bg-blue-100 backdrop-blur-sm ring-2 ring-sky-300' : ''}`}
                  size="sm"
                  onClick={() => setSelectedArticle(article)}
                >
                  {article}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSupportModule;
