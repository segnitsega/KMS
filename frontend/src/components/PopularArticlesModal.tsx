import React from "react";
import { PiBookOpen } from "react-icons/pi";
import { FiUser, FiCalendar, FiEye } from "react-icons/fi";

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  views: number;
  tags?: string[];
}

interface PopularArticlesModalProps {
  articles: Article[];
  onClose: () => void;
}

const PopularArticlesModal = ({ articles, onClose }: PopularArticlesModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-[1300px] max-h-[120vh] relative border border-green-200 transform scale-95 animate-scaleIn flex flex-col">
        <button
          className="absolute top-5 right-5 text-black-400 hover:text-gray-700 transition-colors text-2xl font-bold z-20"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <div className="absolute top-14 right-0 left-0 border-t border-green-200" />

        
        <div className="flex items-center gap-3 px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-t-3xl shadow-md z-10">
          <PiBookOpen className="text-3xl" />
          <h2 className="text-2xl font-bold tracking-wide">
            All Popular Articles
          </h2>
        </div>
        <div className="p-8 overflow-y-auto flex-1 max-h-[70vh]">
          {articles.length > 0 ? (
            <div className="flex flex-col gap-6">
              {articles.map((article: Article, idx: number) => (
                <div
                  key={idx}
                  className="hover:shadow-lg hover:scale-[1.03] transition-all duration-250 rounded-xl bg-white-50 border border-green-200"
                >
                  <div className="flex gap-6 items-top p-6">
                    <div className="flex items-top justify-center w-10 h-6 rounded-x1 bg-green-300">
                      <PiBookOpen className="text-green-800 text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1 text-green-900">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 mb-3 leading-relaxed">{article.description}</p>
                      <div className="flex items-center gap-6 text-gray-600 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <FiUser className="text-base" /> {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar className="text-base" /> {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiEye className="text-base" /> {article.views} views
                        </span>
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        {article.tags && article.tags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold select-none"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-10">
              No popular articles found.
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PopularArticlesModal;
