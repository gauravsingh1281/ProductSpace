import { useState } from "react";
import signupIllustration from "../assets/images/signup-img.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/features/user/userSlice";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User Registeration State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/950");

  const handleRegister = (e) => {
    e.preventDefault();
    // input field validation
    if (!fullName || !email || !password || !image) {
      const missingFields = [];
      if (!fullName) missingFields.push("Full Name");
      if (!email) missingFields.push("Email");
      if (!password) missingFields.push("Password");
      if (!image) missingFields.push("Image");

      toast.error(
        `Please fill the following fields: ${missingFields.join(", ")}.`
      );
      return;
    }

    // Email and Password Validation

    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      isValid = false;
    }

    //Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 6+ chars and include uppercase, lowercase, number, and symbol."
      );
      isValid = false;
    }

    if (isValid) {
      const id = nanoid() + Date.now();
      dispatch(
        registerUser({
          userFullName: fullName,
          userEmail: email,
          userPassword: password,
          userImage: `${image}?u=${id}`,
        })
      );

      setEmail("");
      setFullName("");
      setPassword("");
      toast.success("User registered successfully.");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="lg:w-[80%] mx-auto w-full h-full lg:h-[520px] flex flex-col lg:flex-row justify-center items-start shadow-xl rounded-2xl overflow-hidden mt-7 ">
        <img
          className="h-full w-full lg:w-[60%] object-cover"
          src={signupIllustration}
          alt="signup-illustration"
        />
        <div className="w-full lg:w-[40%] h-full bg-white px-6 py-4 flex flex-col justify-center items-center gap-3 ">
          <h2 className="text-2xl  text-[#2C444E]">Let's get started!</h2>
          <form className="w-full" onSubmit={handleRegister}>
            <label className="block text-base ">Full name :</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="border outline-0 my-2 w-full rounded-md p-2 "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="off"
            />
            <label className="block text-base ">Email :</label>
            <input
              type="text"
              placeholder="Enter email"
              className="border outline-0 my-2 w-full rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <label className="block text-base ">Password :</label>
            <input
              type="password"
              placeholder="Enter password"
              className="border outline-0 my-2 w-full rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <label className="block text-base ">Image :</label>
            <input
              type="text"
              value={image}
              className="border outline-0 my-2 w-full rounded-md p-2"
              onChange={(e) => setImage(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full bg-[#2A454E] my-3 text-[#FFC801] font-bold uppercase py-2 rounded-lg cursor-pointer active:scale-[90%]  transition-all ease-in duration-100"
            >
              Sign Up
            </button>
          </form>
          <div className="text-base ">
            <span className="text-gray-600"> Already have an account ? </span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
