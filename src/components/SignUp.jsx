import React from "react";

const SignUp = () => {
  return (
    <div className="grid grid-cols-2 w-[1200px] relative bg-white rounded-[15px] overflow-hidden drop-shadow-2xl">
      <img
        alt="signUpImg"
        src={`images/loginImg.png`}
        className="w-[600px]  h-full object-cover"
      />
      <img
        alt="logo"
        src={"images/logo_white.png"}
        className="w-[200px] absolute top-[30px] left-[30px]"
      />
      <div className="p-[50px] flex flex-col justify-between">
        <div>
          <h1 className="font-semibold text-primaryGreen text-[15px]">
            Welcome !
          </h1>
          <p className="font-bold text-secondarGreen text-[60px] leading-none">
            {" "}
            Sign Up
          </p>
        </div>
        {/* form section */}
        <form>
          {/* form section : Name*/}
          <div class="form-group mb-6">
            <label class="form-label font-semibold inline-block mb-1 text-gray-700">
              Name :
            </label>
            <input
              required
              type="text"
              class="form-control w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
              placeholder="Enter Name"
            />
          </div>
          {/* form section : Email*/}
          <div class="form-group mb-6">
            <label class="form-label font-semibold inline-block mb-1 text-gray-700">
              Email address :
            </label>
            <input
              required
              type="email"
              class="form-control w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
              placeholder="Enter email"
            />
          </div>
          {/* form section : Password*/}
          <div class="form-group mb-6">
            <label class="form-label font-semibold inline-block mb-1 text-gray-700">
              Password :
            </label>
            <input
              required
              type="password"
              class="form-control w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
              placeholder="Password"
            />
          </div>
          {/* form section : Avatar*/}
          <div class="form-group mb-6 ">
            <input required type="file" style={{ display: "none" }} id="file" />
            <label
              htmlFor="file"
              className="flex flex-row items-center space-x-3">
              <img src={`images/add_avatar.png`} className="w-[30px]" alt="" />
              <span>Add an avatar</span>
            </label>
          </div>
          {/* form section : Submit Button*/}
          <button
            type="submit"
            class="px-6 py-2.5 mt-2  bg-secondarGreen text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-primaryGreen hover:shadow-lg focus:bg-primaryGreen focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primaryGreen active:shadow-lg transition duration-150 ease-in-out">
            Sign Up
          </button>
          <p class="text-gray-800 text-[12px] mt-2">
            Not a member?{" "}
            <span class="text-secondarGreen hover:text-primaryGreen focus:text-primaryGreen transition duration-200 ease-in-out">
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
