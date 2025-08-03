import { FiHome } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiBookOpen } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { SlGraduation } from "react-icons/sl";
import { FaRegChartBar } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  return (
    <div className="border border-t-0 mb-8 bg-white h-[100vh] ">
      <div className="flex p-6 flex-col gap-4 ">
        <Link
          to="/dashboard"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            ["/dashboard", "/"].includes(location.pathname) &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FiHome size={20}/> Dashboard
        </Link>

        <Link
          to="/documents"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/documents" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <IoDocumentTextOutline size={20}/>
          Documents
        </Link>
        <Link
          to="/knowledge-base"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer border-r-2 border-white",
            location.pathname === "/knowledge-base" &&
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
            location.pathname === "/discussions" &&
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
            location.pathname === "/expert-directory" &&
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
            location.pathname === "/training" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <SlGraduation size={20}/>
          Training
        </Link>
        <Link
          to="notifications"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/notifications" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <IoIosNotificationsOutline size={20}/>
          Notifications
        </Link>
        <Link
          to="analytics"
          className={cn(
            "flex gap-2 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/analytics" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FaRegChartBar size={17}/>
          Analytics
        </Link>
      </div>

      <div className="border-t mt-4"></div>

      <span className="flex gap-2 items-center text-lg p-2 cursor-pointer my-8">
        <IoIosHelpCircleOutline size={30}/>
        Help & Support
      </span>
    </div>
  );
};

export default SideBar;
