import moment from "moment/moment";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  console.log(message.date.toDate());

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex space-y-2 ${
        message.senderId === currentUser.uid ? "flex-row-reverse" : ""
      } mb-4`}>
      <div
        className={`flex flex-col ${
          message.senderId === currentUser.uid ? "items-end" : "items-start"
        } max-w-[80%] space-y-[5px]`}>
        {message.msg !== "" && (
          <p
            className={`p-3 text-[18px] rounded-[15px] max-w-max ${
              message.senderId === currentUser.uid
                ? "text-secondarColorHover bg-primaryColor rounded-tr-[0px] "
                : "bg-secondarColorHover text-primaryColor rounded-tl-[0px]"
            } `}>
            {" "}
            {message.msg}
          </p>
        )}
        {message.img && (
          <img src={message.img} className="w-[50%] rounded-[15px]" alt="" />
        )}
        <span className=" text-gray-400 text-[14px] transp">
          {" "}
          {moment(message.date.toDate()).format("L LT")}
        </span>
      </div>
    </div>
  );
};

export default Message;
