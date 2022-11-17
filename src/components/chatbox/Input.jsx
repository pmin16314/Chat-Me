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
  const [error, setError] = useState(false);

  const [msg, setMsg] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgePreview] = useState(null);

  const handleImageChange = (e) => {
    const selectedImg = e.target.files[0];
    setImg(selectedImg);
    if (selectedImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgePreview(reader.result);
      };
      reader.readAsDataURL(selectedImg);
    } else {
      setError(true);
      console.log(error);
    }
  };

  const handleKey = (key) => {
    key.code === "Enter" && handleSend();
  };

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
    } else if (msg !== "") {
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
    setImgePreview(null);
    setMsg("");
    console.log("img");
  };

  return (
    <div
      className=" relative bg-secondarColorHover sm:h-[80px] h-[60px] flex flex-none flex-row items-center px-[20px] z-20"
      onKeyDown={handleKey}>
      <input
        type="text"
        placeholder="Type here..."
        className="w-full grow  border-none outline-none sm:text-[18px] text-[16px] bg-transparent"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <div className="flex flex-row flex-none items-center space-x-3">
        <input
          type="file"
          style={{ display: "none" }}
          id="image"
          onChange={handleImageChange}
          accept=".png, .jpg, .jpeg"
        />
        <label htmlFor="image">
          <img
            src={image_FILL0}
            alt="image2"
            className="sm:h-[30px] h-[25px]"
          />
        </label>
        <button
          onClick={handleSend}
          className="p-2 sm:w-[60px] w-[40px] flex justify-center items-center bg-primaryColor hover:bg-secondarColor sm:rounded-[10px] rounded-[50%] transition-colors duration-500 ease-in-out">
          <img src={send} alt="send" className="sm:h-[30px] s" />
        </button>
      </div>
      {imgPreview && (
        <div className="flex sm:w-[60%] w-[80%] h-fit justify-center rounded-[10px] bg-opacity-70 bg-blue-200 p-5 absolute -top-[130px] left-1/2 origin- transform -translate-x-1/2 -translate-y-1/2 ">
          <img
            src={imgPreview}
            alt=""
            className="max-h-[200px] rounded-[10px]"
          />
        </div>
      )}
    </div>
  );
};

export default Input;
