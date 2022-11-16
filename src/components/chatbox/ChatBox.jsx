import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import NavBar from "../sidebar/NavBar";
import Chat from "./Chat";
import ChatInfo from "./ChatInfo";
import Input from "./Input";

const ChatBox = () => {
  const { data } = useContext(ChatContext);
  console.log(data.chatId);
  return (
    <>
      <div className="sm:hidden z-10">
        <NavBar />
      </div>
      {data.chatId === "null" && (
        <div className="basis-2/3 h-full bg-white flex items-center justify-center z-0">
          <div className="font-medium text-secondarColor text-[40px] text-center">
            Click a chat to start conversation
          </div>
        </div>
      )}
      {data.chatId !== "null" && (
        <div className="basis-2/3 h-full bg-white flex flex-col z-0">
          <div className="sm:hidden">
            <NavBar />
          </div>
          <ChatInfo />
          <Chat />
          <Input />
        </div>
      )}
    </>
  );
};

export default ChatBox;
