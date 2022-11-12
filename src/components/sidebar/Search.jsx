import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [findUser, setFindUser] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", findUser)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());

        console.log(doc.data());
      });
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleClick = async () => {
    //check whether the chat available between two or not. if not create it
    const combinedUserIds =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedUserIds));

      if (!res.exists()) {
        //create a chat in chats collection
        console.log("ll");
        await setDoc(doc(db, "chats", combinedUserIds), { messages: [] });

        //create user chat

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedUserIds + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedUserIds + ".dateAndTime"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.id), {
          [combinedUserIds + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedUserIds + ".dateAndTime"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    //
  };

  const handleKey = (key) => {
    key.code === "Enter" && handleSearch();
  };

  setUser(null);
  setFindUser("");

  return (
    <div className="p-2 mx-3 flex flex-col flex-none items-start space-y-2 border-b-[1px] border-secondarGreen">
      <div id="search bar" className="flex flex-row items-stretch">
        <span className="flex items-center px-3 py-1.5 text-base text-white font-normal text-center whitespace-nowrap">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            className="w-4"
            role="img"
            viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </span>
        <input
          type="search"
          className="relative flex-auto min-w-0 block px-3 py-1.5 text-[18px] font-light text-white bg-transparent transition ease-in-out outline-none placeholder:italic placeholder:text-gray-50 placeholder:font-extralight  m-0"
          placeholder="Find a user..."
          onChange={(e) => {
            setFindUser(e.target.value);
          }}
          onKeyDown={handleKey}
          value={findUser}
        />
        {error && (
          <span className="ml-2 text-red-700">Something went wrong</span>
        )}
      </div>
      {user && (
        <div
          onClick={handleClick}
          className="p-[10px] w-full rounded-[10px] flex flex-row items-center hover:bg-secondarGreen">
          <img
            src={user.photoURL}
            className="w-[50px] h-[50px] rounded-[50%] object-cover"
            alt="profile"
          />
          <span className="ml-[15px] font-medium text-gray-50 ">
            {user.displayName}
          </span>
        </div>
      )}
    </div>
  );
};

export default Search;
