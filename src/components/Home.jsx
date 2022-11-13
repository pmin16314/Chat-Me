import React from "react";
import SideBar from "./sidebar/SideBar";
import ChatBox from "./chatbox/ChatBox";

const Home = () => {
  return (
    <div className="sm:flex sm:flex-row sm:w-4/6 sm:h-4/5 w-full h-full overflow-hidden sm:rounded-[15px] drop-shadow-2xl">
      <SideBar />
      <ChatBox />
    </div>
  );
};

export default Home;
