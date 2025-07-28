import { lazy, Suspense } from "react";
import LazyLoader from "../components/ui/Loader/LazyLoader";

const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));

function DashboardPage() {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Dashboard />
    </Suspense>
  );
}

export default DashboardPage;
