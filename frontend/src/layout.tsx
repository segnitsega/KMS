import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import { Chatbot } from "./components/chatbot";
import api from "./utility/api";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import loadingSpinner from "./assets/loading-spinner.svg"

type jwtPayload = JwtPayload & {
  id: string;
};

const token = localStorage.getItem("accessToken") as string;

let decoded: jwtPayload | string = "";
let userId: string;

if (token) {
  decoded = jwtDecode<jwtPayload>(token);
  userId = decoded.id;
}

const getUser = async () => {
  const user = await api.get(`/user/${userId}`);
  return user.data.user;
};

const Layout = () => {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
  if (isLoading)
    return (
      <div className="flex h-screen justify-center items-center">
        <img src={loadingSpinner} width={80} alt="loading" />
      </div>
    );
  if (data)
    return (
      <div className="w-[100%]">
        <NavBar
          userName={`${data.firstName} ${data.lastName}`}
          department={data.department}
          role={data.role}
        />
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
