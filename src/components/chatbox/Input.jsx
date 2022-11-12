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

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [msg, setMsg] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          console.log(`Error from Uploading: ${error}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                msg,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          msg,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { msg },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { msg },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setImg(null);
    setMsg("");
  };

  return (
    <div className="bg-white h-[80px] flex flex-none flex-row items-center px-[20px]">
      <input
        type="text"
        placeholder="Type here..."
        className="w-full border-none outline-none text-[18px]"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <div className="flex flex-row items-center space-x-3">
        {/* <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.value[0])}
        />
        <label htmlFor="file">
          <img src="images/image_FILL0.png" alt="image2" className="h-[30px]" />
        </label> */}
        <button
          onClick={handleSend}
          className="p-2 w-[60px] flex justify-center items-center bg-secondarGreen hover:bg-secondarGreenHover rounded-[10px]">
          <img src="images/send.png" alt="send" className="h-[30px]" />
        </button>
      </div>
    </div>
  );
};

export default Input;
