import React from "react";
import SideBar from "./sidebar/SideBar";
import ChatBox from "./chatbox/ChatBox";

const Home = () => {
  return (
    <div className="flex flex-row w-4/6 h-4/5 overflow-hidden rounded-[15px] drop-shadow-2xl">
      <SideBar />
      <ChatBox />
    </div>
  );
};

export default Home;
