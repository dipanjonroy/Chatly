import { Link } from "react-router-dom";
import Logo from "../../assets/ChatlyLogo.png";
import { useState } from "react";

function Register() {
  const [otpSent, setOtpSent] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-inter">
      <div className="flex flex-col items-center justify-center bg-white px-12 py-[60px] w-full max-w-[600px]">
        <img src={Logo} alt="Chatly Logo" className="w-35" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-9 w-full">
          <div>
            <label htmlFor="fName" className="block text-sm">
              Firstname: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fName"
              placeholder="Enter your firstname"
              className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            />
          </div>

          <div>
            <label htmlFor="lName" className="block text-sm">
              Lastname: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lName"
              placeholder="Enter your lastname"
              className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            />
          </div>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full">
          <div className="w-full">
            <label htmlFor="password" className="block text-sm">
              Password: <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            />
          </div>

          <div>
            <label htmlFor="confirmPass" className="block text-sm">
              Confirm password: <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPass"
              placeholder="Confirm password"
              className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            />
          </div>
        </div>

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

        {otpSent ? (
          (<button className="w-full mt-4 bg-button py-3 text-text font-medium cursor-pointer hover:bg-[#1c52c9] transition duration-300">
            Regsiter
          </button>)()
        ) : (
          <button className="w-full mt-4 bg-button py-3 text-text font-medium cursor-pointer hover:bg-[#1c52c9] transition duration-300">
            Verify email
          </button>
        )}

        <span className="block text-center mt-3">
            Already have an account? {" "}
            <b>
              <Link to="/login">Login</Link>
            </b>
          </span>
      </div>
    </div>
  );
}

export default Register;
