import React, { useState } from "react";
import { close, menu } from "../../assets";
import Chats from "./Chats";
import Profile from "./Profile";
import Search from "./Search";
import { logo_white } from "../../assets";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="h-[80px] bg-secondarColor shadow-lg z-10 p-2 flex items-center flex-none">
      <div>
        <img
          src={toggle ? close : menu}
          alt=""
          className="w-6 ml-4 sm:hidden transition-transform duration-1000"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } absolute bg-secondarColorHover flex flex-col h-[500px] w-full top-[80px] left-0 transform duration-500 z-20`}>
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
