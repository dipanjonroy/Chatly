import { Navigate, Outlet } from "react-router-dom";
import Loader from "../ui/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "../../store/slices/authSlice";

function PublicRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  const { isAuthenticated, loading } = useSelector((store) => store.auth);

  if (loading) return <Loader />;

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute;
