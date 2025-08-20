import React, { useState } from "react";
import { FiFileText, FiBookOpen, FiMessageSquare } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import ManageDocuments from "@/components/ManageDocuments";
import ManageDiscussions from "@/components/ManageDiscussions";
import ManageArticles from "@/components/ManageArticles";


const ContentManagement: React.FC = () => {
  const [showDocs, setShowDocs] = useState(false);
  const [showDiscussions, setShowDiscussions] = useState(false);
  const [showArticles, setShowArticles] = useState(false);

  return (
    <div className="p-6">
      {showDocs ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <ManageDocuments onClose={() => setShowDocs(false)} />
        </div>
      ) : showDiscussions ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <ManageDiscussions onClose={() => setShowDiscussions(false)} />
        </div>
      ) : showArticles ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <ManageArticles onClose={() => setShowArticles(false)} />
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Documents Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <FiFileText className="text-3xl text-[#1976ed] mb-2" />
            <h2 className="font-semibold text-lg mb-2">Documents</h2>
            <p className="text-gray-600 text-sm mb-4">Manage all documents and files</p>
            <div className="w-full mb-4 text-sm">
              <div className="flex justify-between font-medium mb-1">
                <span>Total Documents:</span>
                <span>1,248</span>
              </div>
            </div>
            <Button
              onClick={() => setShowDocs(true)}
              className="bg-[#1976ed] text-white rounded-lg w-full py-2 text-sm font-medium mb-2"
            >
              Manage Documents
            </Button>
          </div>

          {/* Articles Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <FiBookOpen className="text-3xl text-[#7c4dff] mb-2" />
            <h2 className="font-semibold text-lg mb-2">Articles</h2>
            <p className="text-gray-600 text-sm mb-4">Manage knowledge base articles</p>
            <div className="w-full mb-4 text-sm">
              <div className="flex justify-between font-medium mb-1">
                <span>Total Articles:</span>
                <span>89</span>
              </div>
            </div>
            <Button 
              onClick={() => setShowArticles(true)}
              className="bg-[#1976ed] text-white rounded-lg w-full py-2 text-sm font-medium mb-2"
            >
              Manage Articles
            </Button>
          </div>

          {/* Discussions Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <FiMessageSquare className="text-3xl text-[#00c853] mb-2" />
            <h2 className="font-semibold text-lg mb-2">Discussions</h2>
            <p className="text-gray-600 text-sm mb-4">Moderate forum discussions</p>
            <div className="w-full mb-4 text-sm">
              <div className="flex justify-between font-medium mb-1">
                <span>Total Discussions:</span>
                <span>156</span>
              </div>
            </div>
            <Button
              onClick={() => setShowDiscussions(true)}
              className="bg-[#1976ed] text-white rounded-lg w-full py-2 text-sm font-medium mb-2"
            >
              Moderate Forum
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
