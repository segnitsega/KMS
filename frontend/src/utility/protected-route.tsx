import { useAuthStore } from "@/stores/auth-store";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import loadingSpinner from "../assets/loading-spinner.svg"

const url = import.meta.env.VITE_BACKEND_URL;

const validateToken = async (accessToken: string | null) => {
  if (!accessToken) throw new Error("No Token");
  const response = await axios.get(`${url}/auth/validate-token`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.valid;
};

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const accessToken = localStorage.getItem("accessToken");
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

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
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
