import { Link } from "react-router-dom";
import Logo from "../../assets/ChatlyLogo.png";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-[400px] px-12 py-[60px] bg-white flex flex-col items-center justify-center font-inter">
        <div className="w-40">
          <img src={Logo} alt="Chatly Logo" />
        </div>

        <div className="w-full mt-8">
          <LoginForm />
        </div>

        <div className="mt-3">
          <span className="block text-center">
            Don't have account?{" "}
            <b>
              <Link to="/register">Sign Up</Link>
            </b>
          </span>
          <span className="block text-center text-button text-sm mt-1">
            <Link to="/forget-password">Forget password?</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
