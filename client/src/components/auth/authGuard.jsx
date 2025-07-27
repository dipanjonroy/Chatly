import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../redux/stateSlice/authSlice";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const dispatch = useDispatch();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    dispatch(checkAuth())
    .unwrap()
    .then((res)=>{
      console.log(res)
    })
  });

  if (!isAuth) return <Navigate to="/login" />;

  return children;
}

export default AuthGuard;
