import { lazy, Suspense } from "react";
import LazyLoader from "../components/ui/Loader/LazyLoader";
const Signup = lazy(() => import("../components/Signup/Signup"));

function SignupPage() {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Signup />
    </Suspense>
  );
}

export default SignupPage;
