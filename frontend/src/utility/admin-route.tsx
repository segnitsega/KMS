import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import type { PropsWithChildren } from "react";

const AdminRoute = ({ children }: PropsWithChildren) => {
  const userData = useAuthStore((state) => state.userData);

  if (userData.role !== "ADMIN") {
    return <Navigate to="/kms/dashboard" replace />; 
  }

  return children;
};

export default AdminRoute;
