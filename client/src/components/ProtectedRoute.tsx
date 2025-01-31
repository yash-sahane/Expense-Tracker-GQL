import useStore from "@/context/StoreContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
  const { user } = useStore();

  return user ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;
