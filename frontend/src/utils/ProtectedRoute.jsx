import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated,
  setShowLogin,
  children,
}) {
  if (!isAuthenticated) {
    setShowLogin(true);
    return <Navigate to="/" replace />;
  }
  return children;
}
