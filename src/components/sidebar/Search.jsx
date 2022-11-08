import React from "react";

const Search = () => {
  return (
    <div className="p-2 mx-3 flex flex-col flex-none items-start space-y-2 border-b-[1px] border-secondarGreen">
      <div class="flex flex-row items-stretch">
        <span class="flex items-center px-3 py-1.5 text-base text-white font-normal text-center whitespace-nowrap">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            class="w-4"
            role="img"
            viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </span>
        <input
          type="search"
          class="relative flex-auto min-w-0 block px-3 py-1.5 text-[18px] font-light text-white bg-transparent transition ease-in-out outline-none placeholder:italic placeholder:text-gray-50 placeholder:font-extralight  m-0"
          placeholder="Find a user..."
          aria-label="Search"
        />
      </div>
      <div className="p-[10px] w-full rounded-[10px] flex flex-row items-center hover:bg-secondarGreen">
        <img
          src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-[50px] h-[50px] rounded-[50%] object-cover"
        />
        <span className="ml-[15px] font-medium text-gray-50 ">Jane</span>
      </div>
    </div>
  );
};

export default Search;
