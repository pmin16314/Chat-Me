import React, { useState } from "react";
import { close, menu } from "../../assets";
import Chats from "./Chats";
import Profile from "./Profile";
import Search from "./Search";
import { logo_white } from "../../assets";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="h-[80px] bg-primaryGreen p-2 flex items-center flex-none">
      <div>
        <img
          src={toggle ? close : menu}
          alt=""
          className="w-8 ml-4 sm:hidden"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } absolute bg-secondarGreenHover flex flex-col h-[500px] w-full top-[80px] left-0 transform duration-500`}>
          <Search />
          <Chats />
          <Profile />
        </div>
      </div>
      <img alt="logo" src={logo_white} className="w-[150px] ml-[20px]" />
    </div>
  );
};

export default NavBar;
