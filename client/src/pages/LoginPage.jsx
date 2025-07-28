import { lazy, Suspense } from "react";
import LazyLoader from "../components/ui/Loader/LazyLoader";

const Login = lazy(()=>import("../components/Login/Login"));

function LoginPage() {
  return ( 
    <Suspense fallback={<LazyLoader/>}>
      <Login/>
    </Suspense>
   );
}

export default LoginPage;