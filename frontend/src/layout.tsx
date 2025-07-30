import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar"
import SideBar from "./components/sideBar";
import {Chatbot} from "./components/chatbot";

const Layout = () => {
  return (
    <div>
        <NavBar />
        <div className="flex gap-4">
            <SideBar />
            <main className="w-full">
              <Outlet /> 
              <Chatbot /> 
            </main>
        </div>
    </div>
  )
}

export default Layout