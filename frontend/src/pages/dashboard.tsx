import { IoDocumentTextOutline } from "react-icons/io5";
import { PiBookOpen } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import StatusCard from "@/cards/dashboard/status-cards";
import DocumentCard from "@/cards/dashboard/documents-card";
import CreateDocumentCard from "@/cards/dashboard/document-discusion-card";
import RecentDocumentsModal from "@/components/RecentDocumentsModal";
import PopularArticlesModal from "@/components/PopularArticlesModal";
import { useState } from "react";
import UploadDocumentModal from "@/components/UploadDocumentModal";
import CreateArticleModal from "@/components/create-article-modal";
import NewDiscussionModal from "@/components/NewDiscussionModal";
import { useQuery } from "@tanstack/react-query";
import api from "@/utility/api";
import loadingSpinner from "../assets/loading-spinner.svg";
import { useAuthStore } from "@/stores/auth-store";



// type docsAndArticles = {
//   author: string,
//   category: string[],
//   description: string,
//   title: string,
//   id: string,
//   likes?: number,
//   views?: number,
//   downloads?: number
// }

const getData = async () => {
  const statsCount = await api.get(`/status-count`);
  const documents = await api.get(`/docs?page=1&limit=3`);
  const articles = await api.get(`/articles?page=1&limit=3`);
  console.log("arts: ", articles.data.articles);
  console.log("docs: ", documents.data.documents);
  return {
    statsCount: statsCount.data,
    documents: documents.data.documents,
    articles: articles.data.articles,
  };
};

const Dashboard = () => {
  const userData = useAuthStore((state) => state.userData);

  const { data, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["dashboard"],
  });

  const [showRecentModal, setShowRecentModal] = useState(false);
  const [showPopularModal, setShowPopularModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateArticleModal, setShowCreateArticleModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);

  const documentsFromBackend = [
    {
      title: "Employee Onboarding Guide",
      owner: "Tadesse Gemechu",
      uploadDate: "2024-21-30",
      downloads: "10",
      articleViews: 156,
    },
    {
      title: "Knowledge Gaining Methods",
      owner: "Mubarak Ahmed",
      uploadDate: "2024-01-15",
      downloads: "2",
      articleViews: 214,
    },
    {
      title: "Talent Acquisition",
      owner: "Yosef Asefa",
      uploadDate: "2023-02-14",
      downloads: "24",
      articleViews: 340,
    },
  ];

  const dates = documentsFromBackend.map((document) => document.uploadDate);

  if (isLoading)
    return (
      <div className="flex h-screen bg-white justify-center items-center">
        <img src={loadingSpinner} width={50} alt="loading" />
      </div>
    );
  if (data)
    return (
      <div className="flex flex-col gap-6">
        {showUploadModal && (
          <UploadDocumentModal
            onClose={() => setShowUploadModal(false)}
            onUpload={(file, description) => {
              // TODO: handle upload logic here
              setShowUploadModal(false);
            }}
          />
        )}
        {showCreateArticleModal && (
          <CreateArticleModal
            onClose={() => setShowCreateArticleModal(false)}
            onCreate={() => setShowCreateArticleModal(false)}
          />
        )}
        {showDiscussionModal && (
          <NewDiscussionModal onClose={() => setShowDiscussionModal(false)} />
        )}
        {showRecentModal && (
          <RecentDocumentsModal
            documents={documentsFromBackend}
            onClose={() => setShowRecentModal(false)}
          />
        )}
        {showPopularModal && (
          <PopularArticlesModal
            articles={data.articles}
            onClose={() => setShowPopularModal(false)}
          />
        )}
        <div className="px-4 py-6 flex flex-col gap-4 bg-blue-500 rounded-md text-white">
          <h1 className="font-bold text-xl">
            Hello, {userData.firstName} {userData.lastName} !
          </h1>
          <span className="text-lg">
            Ready to share knowledge and collaborate with your team?
          </span>
        </div>
        <div className="flex gap-6">
          <StatusCard
            title="Total Documents"
            value={data.statsCount.documents}
            icon={IoDocumentTextOutline}
            color="text-blue-700"
            bgColor="bg-blue-200"
          />
          <StatusCard
            title="Total Articles"
            value={data.statsCount.articles}
            icon={PiBookOpen}
            color="text-green-500"
            bgColor="bg-green-200"
          />
          <StatusCard
            title="Active Users"
            value={data.statsCount.users}
            icon={FiUsers}
            color="text-purple-500"
            bgColor="bg-purple-200"
          />
          <StatusCard
            title="Discussions"
            value={data.statsCount.discussions}
            icon={FiMessageCircle}
            color="text-red-500"
            bgColor="bg-red-200"
          />
        </div>
        <div className="flex gap-6">
          <DocumentCard
            heading="Recent Documents"
            titles={data.documents.map((document) => document.title)}
            owners={data.documents.map((document) => document.author)}
            downloads={data.documents.map((document) => document.downloads)}
            dates={dates}
            icon={IoDocumentTextOutline}
            onViewAll={() => setShowRecentModal(true)}
          />
          <DocumentCard
            heading="Popular Articles"
            titles={data.articles.map((article) => article.title)}
            owners={data.articles.map((article) => article.author)}
            articleViews={data.articles.map((article) => article.views)}
            dates={dates}
            onViewAll={() => setShowPopularModal(true)}
          />
        </div>
        <div className="flex justify-between ">
          <div
            onClick={() => setShowUploadModal(true)}
            style={{ cursor: "pointer" }}
          >
            <CreateDocumentCard
              title="Upload Document"
              text="Share knowledge with your team"
              icon={IoDocumentTextOutline}
              iconStyle="text-blue-700 bg-blue-200"
            />
          </div>
          <div
            onClick={() => setShowCreateArticleModal(true)}
            style={{ cursor: "pointer" }}
          >
            <CreateDocumentCard
              title="Create Knowledge Article"
              text="Write a knowledge base article"
              icon={PiBookOpen}
              iconStyle="text-green-700 bg-green-200"
            />
          </div>
          <div
            onClick={() => setShowDiscussionModal(true)}
            style={{ cursor: "pointer" }}
          >
            <CreateDocumentCard
              title="Start New Discussion"
              text="Ask questions and collaborate"
              icon={FiMessageCircle}
              iconStyle="text-purple-700 bg-purple-200"
            />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
