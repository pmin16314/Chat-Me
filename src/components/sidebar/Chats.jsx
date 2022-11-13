import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChatList = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChatList();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <div className="mx-3 grow ">
      {chats
        ?.sort((a, b) => b[1].dateAndTime - a[1].dateAndTime)
        .map((chat) => (
          <div
            key={chat[0]}
            className="p-[10px] mt-3 w-full rounded-[10px] flex flex-row items-center hover:bg-secondarGreen transition-colors duration-500 ease-in-out"
            onClick={() => handleSelect(chat[1].userInfo)}>
            <img
              src={chat[1].userInfo.photoURL}
              className="w-[50px] h-[50px] rounded-[50%] object-cover"
              alt="dp"
            />
            <div className="flex flex-col items-start ml-[15px]">
              <span className=" font-medium text-[18px] text-gray-50 ">
                {chat[1].userInfo.displayName}
              </span>
              <span className=" font-light text-[14px] text-gray-200 ">
                {chat[1].lastMessage?.msg}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
