import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormLabel from "../ui/FormLabel";
import {
  addToRegisterPayload,
  register,
} from "../../features/auth/registerSlice";
import { useState } from "react";
import { isEmail, isEmpty } from "../../helper/formHelper";
import toast from "react-hot-toast";
import { sendRegisterOtp } from "../../features/auth/otpSlice";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerPayload } = useSelector((store) => store.register);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleOnChange = (e) => {
    dispatch(
      addToRegisterPayload({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = registerPayload;

    if (isEmpty(firstName)) {
      toast.error("Firstname is required.");
      return;
    } else if (isEmpty(lastName)) {
      toast.error("Lastname is required.");
      return;
    } else if (isEmpty(email)) {
      toast.error("Email is required.");
      return;
    } else if (!isEmail(email)) {
      toast.error("Invalid email.");
      return;
    } else if (isEmpty(password)) {
      toast.error("Password is required.");
      return;
    } else if (isEmpty(confirmPassword)) {
      toast.error("Please confirm password.");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
      return;
    }

    dispatch(sendRegisterOtp({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => setOtpSent(true));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (isEmpty(registerPayload?.otp)) {
      toast.error("OTP is required.");
      return;
    }

    dispatch(register(registerPayload))
      .unwrap()
      .then(() => navigate("/login"));
  };
  return (
    <form onSubmit={otpSent ? handleVerifyOtp : handleSubmitRegister}>
      {otpSent ? (
        <div>
          <div>
            <FormLabel name="Otp" htmlFor="otp" required={true} />
            <FormInput
              type="text"
              id="otp"
              name="otp"
              value={registerPayload?.otp}
              onChange={handleOnChange}
              autoComplete="otp"
            />
          </div>
          <div className="mt-4">
            <Button type="submit" text="Verify OTP" />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row sm:gap-5">
            <div>
              <FormLabel name="Firstname" htmlFor="fName" required={true} />
              <FormInput
                type="text"
                id="fName"
                name="firstName"
                value={registerPayload?.firstName}
                onChange={handleOnChange}
                autoComplete="fName"
              />
            </div>

            <div>
              <FormLabel name="Lastname" htmlFor="lName" required={true} />
              <FormInput
                type="text"
                id="lName"
                name="lastName"
                value={registerPayload?.lastName}
                onChange={handleOnChange}
                autoComplete="lName"
              />
            </div>
          </div>

          <div className="mt-4">
            <FormLabel name="Email" htmlFor="email" required={true} />
            <FormInput
              type="text"
              id="email"
              name="email"
              value={registerPayload?.email}
              onChange={handleOnChange}
              autoComplete="email"
            />
          </div>

          <div className="mt-4">
            <FormLabel name="Password" htmlFor="password" required={true} />
            <FormInput
              type="password"
              id="password"
              name="password"
              value={registerPayload?.password}
              onChange={handleOnChange}
              autoComplete="password"
            />
          </div>

          <div className="mt-4">
            <FormLabel
              name="Confirm Password"
              htmlFor="cPassword"
              required={true}
            />
            <FormInput
              type="password"
              id="cPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="cPassword"
            />
          </div>

          <div className="mt-4">
            <Button type="submit" text="Signup" />
          </div>
        </div>
      )}
    </form>
  );
}

export default SignupForm;
