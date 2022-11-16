import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db, storage } from "../../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { image_FILL0, send } from "../../assets";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [msg, setMsg] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, `chatPhotos/${uuid()}`);

      uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                msg,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (err) {}
        });
      });
    }
    if (msg !== "") {
      updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          msg,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    } else {
      return;
    }

    updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { msg },
      [data.chatId + ".dateAndTime"]: serverTimestamp(),
    });

    updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { msg },
      [data.chatId + ".dateAndTime"]: serverTimestamp(),
    });

    setImg(null);
    setMsg("");
  };

  return (
    <div className=" bg-secondarColorHover h-[80px] flex flex-none flex-row items-center px-[20px]">
      <input
        type="text"
        placeholder="Type here..."
        className="w-full grow  border-none outline-none text-[18px] bg-transparent"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <div className="flex flex-row flex-none items-center space-x-3">
        <input
          type="file"
          style={{ display: "none" }}
          id="image"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="image">
          <img src={image_FILL0} alt="image2" className="h-[30px]" />
        </label>
        <button
          onClick={handleSend}
          className="p-2 w-[60px] flex justify-center items-center bg-primaryColor hover:bg-secondarColor rounded-[10px] transition-colors duration-500 ease-in-out">
          <img src={send} alt="send" className="h-[30px]" />
        </button>
      </div>
    </div>
  );
};

export default Input;
