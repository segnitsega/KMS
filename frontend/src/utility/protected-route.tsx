import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import loadingSpinner from "../assets/loading-spinner.svg";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { jwtDecode, type JwtPayload } from "jwt-decode";

type jwtPayload = JwtPayload & {
  id: string;
};

const getUser = async (token: string) => {
  const decoded = jwtDecode<jwtPayload>(token);
  const user = await api.get(`/user/${decoded.id}`);
  return user.data.user;
};

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore((state: any) => state.setIsAuthenticated);
  const setUserData = useAuthStore((state: any) => state.setUserData);

  const accessToken = localStorage.getItem("accessToken");
  if(!accessToken){
    navigate("/login")
  }
  const { isLoading, isError, error } = useQuery({
    queryKey: ["validateToken", accessToken],
    queryFn: async () => {
      const user = await getUser(`${localStorage.getItem("accessToken")}`);
      setUserData(user);
      return user
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className="flex h-screen justify-center items-center">
        <img src={loadingSpinner} width={80} alt="loading" />
      </div>
    );
  if (isError) {
    console.log("Error here: ", error)
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;

