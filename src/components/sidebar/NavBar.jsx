import React, { useEffect, useRef, useState } from "react";
import { close, menu } from "../../assets";
import Chats from "./Chats";
import Profile from "./Profile";
import Search from "./Search";
import { logo_white } from "../../assets";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={menuRef}
      className="sm:h-[80px] h-[60px] bg-secondarColor shadow-lg p-2 flex items-center flex-none">
      <div>
        <img
          src={toggle ? close : menu}
          alt=""
          className="w-5 ml-4 sm:hidden cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            toggle ? "left-0 opacity-1" : "left-[-600px] opacity-0"
          } absolute bg-secondarColorHover flex flex-col h-[600px] w-full top-[60px]  transform duration-500`}>
          <Search />
          <Chats />
          <Profile />
        </div>
      </div>
      <img
        alt="logo"
        src={logo_white}
        className="sm:w-[150px] w-[130px] ml-[20px]"
      />
    </div>
  );
};

export default NavBar;
