import React from "react";

const Chats = () => {
  return (
    <div className="mx-3 h-[800px]">
      <div className="p-[10px] mt-3 w-full rounded-[10px] flex flex-row items-center hover:bg-secondarGreen">
        <img
          src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-[50px] h-[50px] rounded-[50%] object-cover"
        />
        <div className="flex flex-col items-start ml-[15px]">
          <span className=" font-medium text-[18px] text-gray-50 ">Jane</span>
          <span className=" font-light text-[14px] text-gray-200 ">
            Hello... Howare you?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chats;
