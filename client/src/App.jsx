import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Loader from "./components/ui/Loader/Loader";
import ProtectedRoute from "./components/Guards/ProtectedRoutes";
import PublicRoute from "./components/Guards/PublicRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Loader />
    </>
  );
}

export default App;
