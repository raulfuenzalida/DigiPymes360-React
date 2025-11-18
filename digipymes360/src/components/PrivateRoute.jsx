import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const logged = localStorage.getItem("Logged");

  if (logged === null || logged.toLowerCase().includes("false")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
