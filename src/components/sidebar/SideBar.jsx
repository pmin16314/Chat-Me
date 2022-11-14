import React from "react";
import NaveBar from "./NavBar";
import Search from "./Search";
import Chats from "./Chats";
import Profile from "./Profile";

const SideBar = () => {
  return (
    <div className="basis-1/3 bg-secondarGreenHover sm:flex sm:flex-col hidden">
      {/* <NaveBar />
      <Search />
      <Chats />
      <Profile /> */}
    </div>
  );
};

export default SideBar;
