import { Link } from "react-router-dom";
import Logo from "../../assets/ChatlyLogo.png";
import SignupForm from "./SignupForm";

function Signup() {
  return ( 
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-[600px] px-12 py-[60px] bg-white flex flex-col items-center justify-center font-inter">
        <div className="w-40">
          <img src={Logo} alt="Chatly Logo" />
        </div>

        <div className="w-full mt-8">
          <SignupForm />
        </div>

        <div className="mt-3">
          <span className="block text-center">
            Already have an account?{" "}
            <b>
              <Link to="/login">Login</Link>
            </b>
          </span>
        </div>
      </div>
    </div>
   );
}

export default Signup;