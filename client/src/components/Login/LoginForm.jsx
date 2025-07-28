import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormLabel from "../ui/FormLabel";
import { addToLoginPayload, login, resetLoginPayload } from "../../store/slices/authSlice";
import { isEmail, isEmpty } from "../../helper/formHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { loginPayload } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      addToLoginPayload({
        name,
        value,
      })
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = loginPayload;

    if (isEmpty(email)) {
      toast.error("Please enter email.");
      return;
    } else if (!isEmail(email)) {
      toast.error("Email isn't valid.");
      return;
    } else if (isEmpty(password)) {
      toast.error("Please enter password.");
      return;
    }

    dispatch(login(loginPayload))
    .unwrap()
    .then(()=>{
      dispatch(resetLoginPayload());
      navigate("/")
    })
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <FormLabel name="Email" htmlFor="email" required={true} />
        <FormInput
          type="text"
          id="email"
          name="email"
          autoComplete="email"
          value={loginPayload?.email}
          onChange={handleOnChange}
        />
      </div>

      <div className="mt-4">
        <FormLabel name="Password" htmlFor="password" required={true} />
        <FormInput
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={loginPayload?.password}
          onChange={handleOnChange}
        />
      </div>

      <div className="mt-4">
        <Button text="Login" type="submit" />
      </div>
    </form>
  );
}

export default LoginForm;
