import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../redux/stateSlice/authSlice";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/loader";

function AuthGuard({ children }) {
  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then(() => {
        console.log("Auth success");
        setIsAuth(true);
      })
      .catch(() => {
        console.log("Auth failed");
        setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if(loading) return <Loader/>
 
  if (!isAuth) return <Navigate to="/login" />;

  return children;
}

export default AuthGuard;
