import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatInfo = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="flex flex-row">
      <div></div>
      {data.chatID === "null" ? (
        <></>
      ) : (
        <div
          id="chatInfo"
          className="h-[80px] w-full pl-[30px] font-semibold text-[30px] flex items-center flex-none space-x-4 text-white tracking-wider bg-secondarGreen">
          <img
            src={data.user?.photoURL}
            className="w-[50px] h-[50px] rounded-[50%] object-cover"
            alt=""
          />
          <p className="font-medium">{data.user?.displayName}</p>
        </div>
      )}
    </div>
  );
};

export default ChatInfo;
