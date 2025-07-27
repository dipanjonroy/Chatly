import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/loginPage";
import RegisterPage from "./pages/auth/registerPage";
import DashboardPage from "./pages/dashboard/dashboardPage";
import ForgetPassPage from "./pages/auth/forgetPassPage";
import NotFoundPage from "./pages/NotFoundPage";
import Loader from "./components/Loader/loader";
import AuthGuard from "./components/auth/authGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPassPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      <Loader />
    </BrowserRouter>
  );
}

export default App;
