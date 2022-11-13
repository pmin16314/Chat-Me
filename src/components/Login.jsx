import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { loginImg, logo_white } from "../assets";

const Login = () => {
  const [error, setError] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(`error in loging ${error}`);
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 sm:w-[1200px] w-full sm:h-fit h-full relative bg-white sm:rounded-[15px] overflow-hidden drop-shadow-2xl">
      <img
        alt="logingImg"
        src={loginImg}
        className="w-full sm:w-[600px] sm:h-full h-[200px] object-cover"
      />
      <img
        alt="logo"
        src={logo_white}
        className="w-[250px] sm:w-[200px] absolute sm:top-[30px] top-[40px] sm:left-[20px] left-[30px]"
      />
      <div className="sm:p-[50px] p-[30px] sm:mb-0 mb-[150px] flex flex-col justify-between">
        <div>
          <h1 className="font-semibold text-primaryGreen text-[15px]">
            Welcome Back!
          </h1>
          <p className="font-bold text-secondarGreen text-[60px] leading-none sm:mb-2 mb-[50px]">
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
              className="form-control w-full block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
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
              className="form-control w-full block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="flex flex-row items-center px-6 py-2.5 mt-2 bg-secondarGreen text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-primaryGreen hover:shadow-lg focus:bg-primaryGreen focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primaryGreen active:shadow-lg transition duration-150 ease-in-out">
            <span className="mr-2">Log In</span>
            <div role="status">
              {isloading && (
                <svg
                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#94a3b8"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#f8fafc"
                  />
                </svg>
              )}
            </div>
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
