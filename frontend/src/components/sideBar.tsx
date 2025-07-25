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
    <div className="border w-[20%]">
      <div className="flex flex-col p-8 gap-4 border-b w-[100%] mb-10 ">
        <Link
          to="/dashboard"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/dashboard" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
          // onClick={() => console.log("Dashboard clicked")}
        >
          <FiHome /> Dashboard
        </Link>

        <Link
          to="/documents"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/documents" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <IoDocumentTextOutline />
          Documents
        </Link>
        <Link
          to="/knowledge-base"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/knowledge-base" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <PiBookOpen />
          Knowledge Base
        </Link>
        <Link
          to="discussions"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/discussions" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FiMessageCircle />
          Discussions
        </Link>
        <Link
          to="expert-directory"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/expert-directory" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FiUsers />
          Expert Directory
        </Link>
        <Link
          to="training"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/training" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <SlGraduation />
          Training
        </Link>
        <Link
          to="notifications"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/notifications" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <IoIosNotificationsOutline />
          Notifications
        </Link>
        <Link
          to="analytics"
          className={cn(
            "flex gap-1 items-center text-lg p-2  rounded-md cursor-pointer",
            location.pathname === "/analytics" &&
              "bg-blue-50  text-blue-600 border-r-2 border-blue-600"
          )}
        >
          <FaRegChartBar />
          Analytics
        </Link>
      </div>
      <span className="flex gap-1 items-center text-lg p-2 cursor-pointer">
        <IoIosHelpCircleOutline />
        Help & Support
      </span>
    </div>
  );
};

export default SideBar;
