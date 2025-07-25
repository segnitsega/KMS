import { IoDocumentTextOutline } from "react-icons/io5";
import { PiBookOpen } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import StatusCard from "@/cards/dashboard/status-cards";

const Dashboard = () => {
  const userName = "Tadesse Gemechu";
  const values = [156, 86, 78, 24];
  return (
    <div>
      <div className="px-4 py-6 flex flex-col gap-4 bg-blue-500 rounded-md text-white">
        <h1 className="font-bold text-xl">Good morning, {userName}!</h1>
        <span className="text-lg">
          Ready to share knowledge and collaborate with your team?
        </span>
      </div>

      <div className="flex gap-4 mt-4">
        <StatusCard
          title="Total Documents"
          value={values[0]}
          icon={IoDocumentTextOutline}
          color="text-blue-700"
          bgColor="bg-blue-200"
        />
        <StatusCard
          title="Total Documents"
          value={values[0]}
          icon={IoDocumentTextOutline}
          color="blue-500"
          bgColor="blue-300"
        />
        <StatusCard
          title="Total Documents"
          value={values[0]}
          icon={IoDocumentTextOutline}
          color="blue-500"
          bgColor="blue-300"
        />
        <StatusCard
          title="Total Documents"
          value={values[0]}
          icon={IoDocumentTextOutline}
          color="blue-500"
          bgColor="blue-300"
        />
      </div>
    </div>
  );
};

export default Dashboard;
