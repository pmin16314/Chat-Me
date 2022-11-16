import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../context/AuthContext";
import { logoutIcon } from "../../assets";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="h-[80px] px-5 py-2 flex items-center flex-none justify-between bg-[#e2e2e2] relative">
      <div className="flex flex-row py-2 items-center cursor-pointer">
        <img
          src={currentUser.photoURL}
          className="w-[50px] h-[50px] rounded-[50%] object-cover  hover:scale-110 transition-all duration-200 ease-in-out"
          alt="profileImg"
        />
        <span className="pl-2 text-[18px] text-primaryColor font-medium">
          {currentUser.displayName}
        </span>
      </div>

      <button
        onClick={() => {
          signOut(auth);
        }}
        className="flex flex-row justify-between w-[110px] items-center  p-[10px] rounded-[10px] text-white bg-primaryColor font-medium hover:bg-secondarColor transition-colors duration-500 ease-in-out">
        Log Out
        <img src={logoutIcon} alt="logout" className="w-[20px]" />
      </button>
    </div>
  );
};

export default Profile;
