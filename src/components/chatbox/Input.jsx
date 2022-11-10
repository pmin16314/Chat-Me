import React from "react";

const Input = () => {
  return (
    <div className="bg-white h-[80px] flex flex-none flex-row items-center px-[20px]">
      <input
        type="text"
        placeholder="Type here..."
        className="w-full border-none outline-none text-[18px]"
      />
      <div className="flex flex-row items-center space-x-3">
        <img
          src="images/attach_file.png"
          alt="attachFile"
          className="h-[30px]"
        />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img src="images/image_FILL0.png" alt="image2" className="h-[30px]" />
        </label>
        <button className="p-2 w-[60px] flex justify-center items-center bg-secondarGreen hover:bg-secondarGreenHover rounded-[10px]">
          <img src="images/send.png" alt="send" className="h-[30px]" />
        </button>
      </div>
    </div>
  );
};

export default Input;
