import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/slices/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader/Loader";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) return <Loader />;

  return isAuthenticated ? <Outlet/> : null;
}

export default ProtectedRoute;
