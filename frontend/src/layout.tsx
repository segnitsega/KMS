import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import { Chatbot } from "./components/chatbot";
import { useAuthStore } from "./stores/auth-store";
// import { RxHamburgerMenu } from "react-icons/rx";

const Layout = () => {
  const userData = useAuthStore((state: any) => state.userData)
    return (
      <div className="w-[100%]">
        <NavBar
          userName={`${userData.firstName} ${userData.lastName}`}
          department={userData.department}
          role={userData.role}
        />
        <div className="flex bg-gray-175">
          <div className="hidden md:block">
            <SideBar />
          </div>
          <div>
        {/* <RxHamburgerMenu /> */}

          </div>
          <main className="p-6 flex-1">
            <Outlet />
            <Chatbot />
          </main>
        </div>
      </div>
    );
};

export default Layout;
