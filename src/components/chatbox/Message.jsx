import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex space-y-2 ${
        message.senderId === currentUser.uid ? "flex-row-reverse" : ""
      }`}>
      <div
        className={`flex flex-col ${
          message.senderId === currentUser.uid ? "items-end" : "items-start"
        } max-w-[80%] space-y-2`}>
        <p
          className={`p-3 text-[18px] rounded-[15px] max-w-max ${
            message.senderId === currentUser.uid
              ? "text-white bg-secondarGreen rounded-tr-[0px]"
              : "bg-white text-primaryGreen rounded-tl-[0px]"
          } `}>
          {" "}
          {message.msg}
        </p>
        {message.img && (
          <img src={message.img} className="w-[50%] rounded-[15px]" alt="" />
        )}
        <span className="text-primaryGreen text-[14px]"> Just Now</span>
      </div>
    </div>
  );
};

export default Message;
