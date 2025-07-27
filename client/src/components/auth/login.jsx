import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/ChatlyLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { addToLoginPayload, login } from "../../redux/stateSlice/authSlice";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {loginPayload} = useSelector(store => store.auth);


  const handleLogin = ()=>{
    dispatch(login(loginPayload))
    .unwrap()
    .then(()=>{
      navigate("/")
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-inter">
      <div className="flex flex-col items-center justify-center bg-white px-12 py-[60px] w-full max-w-[400px]">
        <img src={Logo} alt="Chatly Logo" className="w-35" />
        <div className="mt-8 w-full">
          <label htmlFor="email" className="block text-sm">
            Email:
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter register email"
            className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            value={loginPayload?.email}
            onChange={(e)=>dispatch(addToLoginPayload({
              name: "email",
              value: e.target.value
            }))}
          />
        </div>

        <div className="mt-4 w-full">
          <label htmlFor="password" className="block text-sm">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            value={loginPayload?.password}
            onChange={(e)=>dispatch(addToLoginPayload({
              name: "password",
              value: e.target.value
            }))}
          />
        </div>

        <button className="w-full mt-4 bg-button py-3 text-text font-medium cursor-pointer hover:bg-[#1c52c9] transition duration-300" onClick={handleLogin}>Login</button>

        <div className="mt-3">
          <span className="block text-center">Don't have account? <b><Link to="/register">Sign Up</Link></b></span>
          <span className="block text-center text-button text-sm mt-1"><Link to="/forget-password">Forget password?</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
