import { Link } from "react-router-dom";
import Logo from "../../assets/ChatlyLogo.png";
import { useState } from "react";

function ForgetPass() {
  const [otpSent, setOtpSent] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-inter">
      <div className="flex flex-col items-center justify-center bg-white px-12 py-[60px] w-full max-w-[400px]">
        <img src={Logo} alt="Chatly Logo" className="w-35" />

        <div className="mt-4 w-full">
          <label htmlFor="email" className="block text-sm">
            Email: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
          />
        </div>

        {otpSent && (
          <div className="mt-4 w-full">
            <label htmlFor="otp" className="block text-sm">
              OTP: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter the otp"
              className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            />
          </div>
        )}

        {otpSent ? (
          <button className="w-full mt-4 bg-button py-3 text-text font-medium cursor-pointer hover:bg-[#1c52c9] transition duration-300">
            Verify Email
          </button>
        ) : (
          <button
            className="w-full mt-4 bg-button py-3 text-text font-medium cursor-pointer hover:bg-[#1c52c9] transition duration-300"
            onClick={() => setOtpSent(true)}
          >
            Send OTP
          </button>
        )}

        <span className="block text-center mt-3">
          Already have an account?{" "}
          <b>
            <Link to="/login">Login</Link>
          </b>
        </span>
      </div>
    </div>
  );
}

export default ForgetPass;
