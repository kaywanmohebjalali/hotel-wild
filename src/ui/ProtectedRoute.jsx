/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useGetUser } from "../features/authentication/useGetUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, isUser } = useGetUser();
  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    if (!isAuthenticated && !isUser) return navigate("/login");
  }, [isUser, isAuthenticated, navigate]);

  if (isUser)
    return (
      <div className="">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
