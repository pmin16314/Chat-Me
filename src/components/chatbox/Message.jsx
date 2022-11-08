import React from "react";

const message = ({ owner }) => {
  console.log(owner);
  return (
    <div className={`flex space-y-2 ${owner == "A" ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex flex-col ${
          owner == "A" ? "items-end" : "items-start"
        } max-w-[80%] space-y-2`}>
        <p
          className={`p-3 text-[18px] rounded-[15px] max-w-max ${
            owner == "A"
              ? "text-white bg-secondarGreen rounded-tr-[0px]"
              : "bg-white text-primaryGreen rounded-tl-[0px]"
          } `}>
          {" "}
          dsadadsss
        </p>
        <img
          src="https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-[50%] rounded-[15px]"
        />
        <span className="text-primaryGreen text-[14px]"> Just Now</span>
      </div>
    </div>
  );
};

export default message;
