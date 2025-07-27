import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/loader";

const ForgetPass = lazy(()=>import("../../components/auth/forgetPass"));

function ForgetPassPage() {
  return ( 
    <Suspense fallback={<Loader force={true}/>}>
      <ForgetPass/>
    </Suspense>
   );
}

export default ForgetPassPage;