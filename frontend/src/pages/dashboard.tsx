import { IoDocumentTextOutline } from "react-icons/io5";
import { PiBookOpen } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import StatusCard from "@/cards/dashboard/status-cards";
import DocumentCard from "@/cards/dashboard/documents-card";
import CreateDocumentCard from "@/cards/dashboard/document-discusion-card";

const Dashboard = () => {
  const userName = "Tadesse Gemechu";
  const values = [156, 86, 78, 24];

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

  const titles = documentsFromBackend.map((document) => document.title);
  const owners = documentsFromBackend.map((document) => document.owner);
  const downloads = documentsFromBackend.map((document) => document.downloads);
  const dates = documentsFromBackend.map((document) => document.uploadDate);
  const articleViews = documentsFromBackend.map(
    (document) => document.articleViews
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 py-6 flex flex-col gap-4 bg-blue-500 rounded-md text-white">
        <h1 className="font-bold text-xl">Good morning, {userName}!</h1>
        <span className="text-lg">
          Ready to share knowledge and collaborate with your team?
        </span>
      </div>
      <div className="flex gap-6">
        <StatusCard
          title="Total Documents"
          value={values[0]}
          icon={IoDocumentTextOutline}
          color="text-blue-700"
          bgColor="bg-blue-200"
        />
        <StatusCard
          title="Total Documents"
          value={values[1]}
          icon={PiBookOpen}
          color="text-green-500"
          bgColor="bg-green-200"
        />
        <StatusCard
          title="Active Users"
          value={values[2]}
          icon={FiUsers}
          color="text-purple-500"
          bgColor="bg-purple-200"
        />
        <StatusCard
          title="Discussions"
          value={values[3]}
          icon={FiMessageCircle}
          color="text-red-500"
          bgColor="bg-red-200"
        />
      </div>
      <div className="flex gap-6">
        <DocumentCard
          heading="Recent Documents"
          titles={titles}
          owners={owners}
          downloads={downloads}
          dates={dates}
          icon={IoDocumentTextOutline}
        />
        <DocumentCard
          heading="Popular Articles"
          titles={titles}
          owners={owners}
          articleViews={articleViews}
          dates={dates}
        />
      </div>
      <div className="flex justify-between ">
        <CreateDocumentCard
          title="Upload Document"
          text="Share knowledge with your team"
          icon={IoDocumentTextOutline}
          iconStyle="text-blue-700 bg-blue-200"
        />
        <CreateDocumentCard
          title="Upload Document"
          text="Write a knowledge base article"
          icon={PiBookOpen}
          iconStyle="text-green-700 bg-green-200"
        />
        <CreateDocumentCard
          title="Upload Document"
          text="Ask questions and collaborate"
          icon={FiMessageCircle}
          iconStyle="text-purple-700 bg-purple-200"
        />
      </div>
    </div>
  );
};

export default Dashboard;
