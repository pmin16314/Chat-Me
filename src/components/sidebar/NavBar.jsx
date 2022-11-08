import React from "react";

const NavBar = () => {
  return (
    <div className="h-[80px] bg-primaryGreen p-2 flex items-center flex-none">
      <img
        alt="logo"
        src={"images/logo_white.png"}
        className="w-[150px] ml-[20px]"
      />
    </div>
  );
};

export default NavBar;
