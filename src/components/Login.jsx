import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="grid grid-cols-2 w-[1200px] relative bg-white rounded-[15px] overflow-hidden drop-shadow-2xl">
      <img
        alt="logingImg"
        src={`images/loginImg.png`}
        className="w-[600px]  h-full aspect-square"
      />
      <img
        alt="logo"
        src={"images/logo_white.png"}
        className="w-[200px] absolute top-[30px] left-[20px]"
      />
      <div className="p-[50px] flex flex-col justify-between">
        <div>
          <h1 className="font-semibold text-primaryGreen text-[15px]">
            Welcome Back!
          </h1>
          <p className="font-bold text-secondarGreen text-[60px] leading-none">
            {" "}
            LogIn
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label className="form-label font-semibold inline-block mb-1 text-gray-700">
              Email address :
            </label>
            <input
              type="email"
              className="form-control w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-label font-semibold inline-block mb-1 text-gray-700">
              Password :
            </label>
            <input
              type="password"
              className="form-control w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 mt-2 bg-secondarGreen text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-primaryGreen hover:shadow-lg focus:bg-primaryGreen focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primaryGreen active:shadow-lg transition duration-150 ease-in-out">
            Log In
          </button>
          {error && (
            <span className="ml-2 text-red-700">Something went wrong</span>
          )}
          <p className="text-gray-800 mt-2">
            Not a member?{" "}
            <span className="text-secondarGreen hover:text-primaryGreen focus:text-primaryGreen transition duration-200 ease-in-out">
              <Link to="/signup">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
