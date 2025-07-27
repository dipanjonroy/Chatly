import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/loader";

const Login = lazy(()=>import("../../components/auth/login"))

function LoginPage() {
  return ( 
    <Suspense fallback={<Loader/>}>
      <Login/>
    </Suspense>
   );
}

export default LoginPage;