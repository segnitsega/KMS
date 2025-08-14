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
    <div className="border border-t-0 mb-8 bg-white h-[110vh] ">
      <div className="flex p-6 flex-col gap-4 ">
        <Link
          to="dashboard"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            ["/kms/dashboard", "/kms"].includes(location.pathname) &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FiHome size={20}/> Dashboard
        </Link>

        <Link
          to="documents"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/documents" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <IoDocumentTextOutline size={20}/>
          Documents
        </Link>
        <Link
          to="knowledge-base"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer border-r-2 border-white",
            location.pathname === "/kms/knowledge-base" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <PiBookOpen size={20}/>
          Knowledge Base
        </Link>
        <Link
          to="discussions"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/discussions" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FiMessageCircle size={20}/>
          Discussions
        </Link>
        <Link
          to="expert-directory"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/expert-directory" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FiUsers size={20}/>
          Expert Directory
        </Link>
        <Link
          to="training"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/training" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <SlGraduation size={20}/>
          Training
        </Link>
        <Link
          to="my-tasks"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/my-tasks" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FaTasks size={17}/>
          My Tasks
        </Link>
        <Link
          to="notifications"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/notifications" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <IoIosNotificationsOutline size={19}/>
          Notifications
        </Link>
        <Link
          to="analytics"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/analytics" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FaRegChartBar size={17}/>
          Analytics
        </Link>
        <Link
          to="administration"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/kms/administration" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <LuUser size={18}/>
          Administration
        </Link>
      </div>

      <div className="border-t mt-4"></div>

      <Link
        to="help-support"
        className="flex gap-2 items-center text-lg p-2 cursor-pointer my-8"
      >
        <IoIosHelpCircleOutline size={30}/>
        Help & Support
      </Link>
    </div>
  );
};

export default SideBar;
