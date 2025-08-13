import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import { Chatbot } from "./components/chatbot";

const Layout = () => {
  return (
    <div className="w-[100%]">
      <NavBar />
      <div className="flex bg-gray-50">
        <SideBar />
        <main className="p-6 flex-1">
          <Outlet />
          <Chatbot />
        </main>
      </div>
    </div>
  );
};

export default Layout;
