import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          console.log(`Error from Uploading: ${error}`);
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="grid grid-cols-2 w-[1200px] relative bg-white rounded-[15px] overflow-hidden drop-shadow-2xl">
      <img
        alt="signUpImg"
        src={`images/loginImg.png`}
        className="w-[600px]  h-full object-cover"
      />
      <img
        alt="logo"
        src={"images/logo_white.png"}
        className="w-[200px] absolute top-[30px] left-[30px]"
      />
      <div className="p-[50px] flex flex-col justify-between">
        <div>
          <h1 className="font-semibold text-primaryGreen text-[15px]">
            Welcome !
          </h1>
          <p className="font-bold text-secondarGreen text-[60px] leading-none">
            {" "}
            Sign Up
          </p>
        </div>
        <div>
          {/* form section */}
          <form onSubmit={handleSubmit}>
            {/* form section : Name*/}
            <div className="mb-6">
              <label className="font-semibold inline-block mb-1 text-gray-700">
                Name :
              </label>
              <input
                type="text"
                className="w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
            {/* form section : Email*/}
            <div className="mb-6">
              <label className="font-semibold inline-block mb-1 text-gray-700">
                Email address :
              </label>
              <input
                type="email"
                className="w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
                placeholder="Enter email"
              />
            </div>
            {/* form section : Password*/}
            <div className="mb-6">
              <label className="font-semibold inline-block mb-1 text-gray-700">
                Password :
              </label>
              <input
                type="password"
                className="w-[400px] block px-3 py-1.5 text-[14px] font-normal text-gray-700 bg-white bg-clip-padding border-b-[1px] border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-secondarGreen focus:outline-none"
                placeholder="Password"
              />
            </div>
            {/* form section : Avatar*/}
            <div className="mb-6 ">
              <input type="file" style={{ display: "none" }} id="file" />
              <label
                htmlFor="file"
                className="flex flex-row items-center space-x-3">
                <img
                  src={`images/add_avatar.png`}
                  className="w-[30px]"
                  alt=""
                />
                <span>Add an avatar</span>
              </label>
            </div>
            {/* form section : Submit Button*/}
            <button className="px-6 py-2.5 mt-2  bg-secondarGreen text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-primaryGreen hover:shadow-lg focus:bg-primaryGreen focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primaryGreen active:shadow-lg transition duration-150 ease-in-out">
              Sign Up
            </button>
            {error && (
              <span className="ml-2 text-red-700">Something went wrong</span>
            )}
          </form>
          <p className="text-gray-800 text-[12px] mt-2">
            Not a member?{" "}
            <span className="text-secondarGreen hover:text-primaryGreen focus:text-primaryGreen transition duration-200 ease-in-out">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
