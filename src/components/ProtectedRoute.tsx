import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  const { currentUser } = useAuthContext()

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
