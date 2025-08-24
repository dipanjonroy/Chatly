import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../ui/Loader/Loader";
import { checkAuth } from "../../features/auth/checkAuthSlice";
import toast from "react-hot-toast";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (store) => store.checkAuth
  );
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    dispatch(checkAuth()).finally(() => {
      setHasCheckedAuth(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (hasCheckedAuth && !loading && !isAuthenticated) {
      toast.error(error || "Please login to access");
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate, hasCheckedAuth, error]);

  if (loading) return <Loader />;

  return isAuthenticated ? <Outlet /> : null;
}

export default ProtectedRoute;
