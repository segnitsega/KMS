import { FiHome } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiBookOpen } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { SlGraduation } from "react-icons/sl";
import { FaRegChartBar, FaTasks } from "react-icons/fa";
import { LuUser } from 'react-icons/lu';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  return (
    <div className="border border-t-0 mb-8 shadow-md bg-white h-[110vh] ">
      <div className="flex p-6 flex-col gap-4 ">
        <Link
          to="dashboard"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            ["/kms/dashboard", "/kms"].includes(location.pathname) &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <FiHome size={20}/> Dashboard
        </Link>

        <Link
          to="documents"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/documents" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <IoDocumentTextOutline size={20}/>
          Documents
        </Link>
        <Link
          to="knowledge-base"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer border-r-2 border-white",
            location.pathname === "/kms/knowledge-base" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <PiBookOpen size={20}/>
          Knowledge Base
        </Link>
        <Link
          to="discussions"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/discussions" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <FiMessageCircle size={20}/>
          Discussions
        </Link>
        <Link
          to="expert-directory"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/expert-directory" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <FiUsers size={20}/>
          Expert Directory
        </Link>
        <Link
          to="library"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/library" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <SlGraduation size={20}/>
          Library
        </Link>
        <Link
          to="my-tasks"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/my-tasks" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <FaTasks size={17}/>
          My Tasks
        </Link>
        <Link
          to="analytics"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/analytics" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <FaRegChartBar size={17}/>
          Analytics
        </Link>
        <Link
          to="administration"
          className={cn(
            "flex gap-1 items-center text-lg p-2 rounded-md cursor-pointer",
            location.pathname === "/kms/administration" &&
              "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
          )}
        >
          <LuUser size={18}/>
          Administration
        </Link>
      </div>

      <Link
        to="help-support"
        className="flex gap-1 items-center text-lg p-2 cursor-pointer my-8 shadow-m rounded-md text-gray-700 hover:bg-gray-100 transition duration-200"
      >
        <IoIosHelpCircleOutline size={30}/>
        Help & Support
      </Link>
    </div>
  );
};

export default SideBar;
