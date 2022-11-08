import React from "react";
import Chat from "./Chat";
import ChatInfo from "./ChatInfo";
import Input from "./Input";

const ChatBox = () => {
  return (
    <div className="basis-2/3 bg-[#dcf8e6] flex flex-col">
      <ChatInfo />
      <Chat />
      <Input />
    </div>
  );
};

export default ChatBox;
