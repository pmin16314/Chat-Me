import React from "react";
import Message from "./Message";

const Chat = () => {
  return (
    <div className="h-[800px] px-7 py-5 overflow-auto">
      <Message owner="A" />
      <Message owner="As" />
      <Message owner="A" />
    </div>
  );
};

export default Chat;
