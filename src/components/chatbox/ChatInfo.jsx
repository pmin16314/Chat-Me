import React from "react";

const ChatInfo = () => {
  return (
    <div
      id="chatInfo"
      className="h-[80px] w-full pl-[30px] font-semibold text-[30px] flex items-center flex-none space-x-4 text-white tracking-wider bg-secondarGreen">
      <img
        src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-[50px] h-[50px] rounded-[50%] object-cover border-2 border-emerald-50"
      />
      <p>Jane</p>
    </div>
  );
};

export default ChatInfo;
