import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar"
import SideBar from "./components/sideBar";

const Layout = () => {
  return (
    <div>
        <NavBar />
        <div className="flex gap-4">
            <SideBar />
            <main className="w-full">
              <Outlet />  
            </main>
        </div>
    </div>
  )
}

export default Layout