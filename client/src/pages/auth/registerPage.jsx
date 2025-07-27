import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/loader";
const Register = lazy(() => import("../../components/auth/register"));

function RegisterPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Register />
    </Suspense>
  );
}

export default RegisterPage;
