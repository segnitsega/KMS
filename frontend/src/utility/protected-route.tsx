import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import loadingSpinner from "../assets/loading-spinner.svg"
import api from "./api";
import { useNavigate } from "react-router-dom";


const validateToken = async (accessToken: string | null) => {
  // console.log(`token validation run:  ${accessToken}`)
  if (!accessToken) throw new Error("No Token");
  const response = await api.get(`/auth/validate-token`);
  return response.data.valid;
};

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const accessToken = localStorage.getItem("accessToken");
  // console.log(accessToken)
  
  const {
    data: isValid,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["validateToken", accessToken],
    queryFn: () => validateToken(accessToken),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  if (isLoading) return <div className="flex h-screen justify-center items-center"><img src={loadingSpinner} width={120} alt="loading"/></div>;
  if (isError || !isValid) {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate('/login')
  }

  return children;
};

export default ProtectedRoute;
