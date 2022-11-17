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
import { searchIcon } from "../../assets";

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
      });
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  console.log(user);

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
        await updateDoc(doc(db, "userChats", user.uid), {
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
    setUser(null);
    setFindUser("");
  };

  const handleKey = (key) => {
    key.code === "Enter" && handleSearch();
  };

  return (
    <div className="p-2 mx-3 flex flex-col flex-none items-start space-y-2 border-b-[2px] border-primaryColor">
      <div id="search bar" className="flex flex-row items-stretch">
        <span className="flex flex-none items-center px-3 py-1.5 text-base font-normal text-center whitespace-nowrap">
          <img src={searchIcon} alt="" className="w-6" />
        </span>
        <input
          type="search"
          className="relative flex-auto min-w-0 block px-3 py-1.5 text-[18px] font-light text-textColor bg-transparent transition ease-in-out outline-none placeholder:italic placeholder:text-gray-400  placeholder:font-extralight  m-0"
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
          className="p-[10px] w-full rounded-[10px] flex flex-row items-center  text-primaryColor hover:text-white bg-white hover:bg-secondarColor cursor-pointer transition-all ease-in-out duration-200">
          <img
            src={user.photoURL}
            className="w-[50px] h-[50px] rounded-[50%] object-cover"
            alt="profile"
          />
          <span className="ml-[15px] font-medium">{user.displayName}</span>
        </div>
      )}
    </div>
  );
};

export default Search;
