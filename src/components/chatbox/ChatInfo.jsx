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
          className="sm:h-[80px] h-[60px] w-full sm:pl-[30px] pl-[20px] font-semibold text-[30px] flex items-center flex-none space-x-4 text-white tracking-wider bg-primaryColor shadow-lg">
          <img
            src={data.user?.photoURL}
            className="sm:w-[50px] sm:h-[50px] w-[40px] h-[40px] rounded-[50%] object-cover"
            alt=""
          />
          <p className="font-medium sm:text-[30px] text-[24px]">
            {data.user?.displayName}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatInfo;
