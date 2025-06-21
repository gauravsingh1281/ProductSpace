import { useState } from "react";
import loginIllustration from "../assets/images/login-img.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  //User login State
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/products";

  const handleLogin = (e) => {
    e.preventDefault();
    // input field validation
    if (!userEmail || !userPassword) {
      const missingFields = [];
      if (!userEmail) missingFields.push("Email");
      if (!userPassword) missingFields.push("Password");
      toast.error(
        `Please fill the following fields: ${missingFields.join(", ")}.`
      );
      return;
    }
    dispatch(
      loginUser({
        email: userEmail,
        password: userPassword,
      })
    );

    // Reset login data
    setUserEmail("");
    setUserPassword("");
    navigate(from, { replace: true });
  };

  return (
    <>
      <div className="mx-auto w-full lg:w-[80%] h-full lg:h-[520px] flex flex-col lg:flex-row justify-center items-start shadow-xl rounded-2xl overflow-hidden mt-7">
        <img
          className="h-full w-full lg:w-[60%] object-cover"
          src={loginIllustration}
          alt="login-illustration"
        />
        <div className="w-full lg:w-[40%] h-full  bg-white px-6 py-4 flex flex-col justify-center items-center gap-2">
          <h2 className="text-3xl mb-3 text-[#2C444E]">Welcome back!</h2>

          <form className="w-full" onSubmit={handleLogin}>
            <label className="block text-base ">Email :</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border outline-0 my-2 w-full rounded-md p-2 "
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              autoComplete="off"
            />
            <label className="block text-base ">Password :</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border outline-0 my-2 w-full rounded-md p-2"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              autoComplete="off"
            />

            <button
              type="submit"
              className="w-full bg-[#2C444E] my-3 text-[#FFC801] font-bold uppercase py-2 rounded-lg cursor-pointer active:scale-[90%]  transition-all ease-in duration-100"
            >
              Log In
            </button>
          </form>
          <div className="text-base ">
            <span className="text-gray-600">Don't have an account ? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
