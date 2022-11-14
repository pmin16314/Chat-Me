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
    <div className="basis-2/3 h-full bg-[#dcf8e6] flex flex-col">
      <div className="sm:hidden">{/* <NavBar /> */}</div>
      {/* <ChatInfo />
      <Chat />
      <Input /> */}
    </div>
  );
};

export default ChatBox;
