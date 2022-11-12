import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="h-[80px] px-5 py-2 flex items-center flex-none justify-between bg-primaryGreen">
      <div className="flex flex-row py-2 items-center">
        <img
          src={currentUser.photoURL}
          className="w-[50px] h-[50px] rounded-[50%] object-cover"
          alt="profileImg"
        />
        <span className="pl-2 text-white font-medium">
          {currentUser.displayName}
        </span>
      </div>
      <button
        onClick={() => {
          signOut(auth);
          console.log("asas");
        }}
        className="flex flex-row justify-between w-[110px] items-center  p-[10px] rounded-[10px] text-white font-medium hover:bg-secondarGreenHover">
        Log Out
        <img src={"images/logoutIcon.png"} alt="logout" className="w-[20px]" />
      </button>
    </div>
  );
};

export default Profile;
