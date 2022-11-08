import React from "react";

const Profile = () => {
  return (
    <div className="h-[80px] px-5 py-2 flex items-center flex-none justify-between bg-primaryGreen">
      <div className="flex flex-row py-2 items-center">
        <img
          src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-[50px] h-[50px] rounded-[50%] object-cover"
        />
        <span className="pl-2 text-white font-medium">Jane</span>
      </div>
      <button className="flex flex-row justify-between w-[110px] items-center  p-[10px] rounded-[10px] text-white font-medium hover:bg-secondarGreenHover">
        Log Out
        <img src={"images/logoutIcon.png"} alt="logout" className="w-[20px]" />
      </button>
    </div>
  );
};

export default Profile;
