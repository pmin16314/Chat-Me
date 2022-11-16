import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { add_avatar, loginImg, logo_white } from "../assets";

const SignUp = () => {
  const [error, setError] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //create unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `userPhotos/${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
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
          } catch (err) {
            setError(true);
          }
        });
      });
    } catch (err) {
      console.log(`Error from Signup: ${err}`);
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 sm:w-[1200px] w-full sm:h-fit h-full relative bg-white sm:rounded-[15px] overflow-hidden drop-shadow-2xl sm:mx-3 mx-0">
      <img
        alt="signUpImg"
        src={loginImg}
        className="w-full sm:w-[600px] sm:h-full h-[200px] object-cover"
      />
      <img
        alt="logo"
        src={logo_white}
        className="w-[250px] sm:w-[200px] absolute sm:top-[30px] top-[40px] sm:left-[20px] left-[30px]"
      />
      <div className="sm:p-[50px] p-[30px] sm:mb-0 mb-[150px] flex flex-col justify-between">
        <div>
          <h1 className="font-semibold text-primaryColor text-[15px]">
            Welcome !
          </h1>
          <p className="font-bold text-secondarColor text-[60px] leading-none sm:mb-2 mb-[30px]">
            {" "}
            Sign Up
          </p>
        </div>
        <div>
          {/* form section */}
          <form onSubmit={handleSubmit}>
            {/* form section : Name*/}
            <div className="mb-6">
              <label className="font-semibold inline-block mb-1 text-textColor">
                Name :
              </label>
              <input
                type="text"
                className="w-full block px-3 py-1.5 text-[14px] font-normal text-textColor bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-textColor focus:bg-white focus:border-secondarColor focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
            {/* form section : Email*/}
            <div className="mb-6">
              <label className="font-semibold inline-block mb-1 text-textColor">
                Email address :
              </label>
              <input
                type="email"
                className="w-full block px-3 py-1.5 text-[14px] font-normal text-textColor bg-white bg-clip-padding  border-b-[1px] border-gray-300 transition ease-in-out focus:text-textColor focus:bg-white focus:border-secondarColor focus:outline-none"
                placeholder="Enter email"
              />
            </div>
            {/* form section : Password*/}
            <div className="mb-6">
              <label className="font-semibold inline-block mb-1 text-textColor">
                Password :
              </label>
              <input
                type="password"
                className="w-full block px-3 py-1.5 text-[14px] font-normal text-textColor bg-white bg-clip-padding border-b-[1px] border-gray-300 transition ease-in-out focus:text-textColor focus:bg-white focus:border-secondarColor focus:outline-none"
                placeholder="Password"
              />
            </div>
            {/* form section : Avatar*/}
            <div className="mb-6 ">
              <input type="file" style={{ display: "none" }} id="file" />
              <label
                htmlFor="file"
                className="flex flex-row items-center space-x-3">
                <img src={add_avatar} className="w-[30px]" alt="" />
                <span>Add an avatar</span>
              </label>
            </div>
            {/* form section : Submit Button*/}
            <button className="flex flex-row px-6 py-2.5  bg-secondarColor text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-primaryColor hover:shadow-lg focus:bg-primaryColor focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primaryColor active:shadow-lg transition duration-150 ease-in-out">
              <span className="mr-2">Sign Up</span>
              <div role="status">
                {isloading && (
                  <svg
                    class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#94a3b8"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#f8fafc"
                    />
                  </svg>
                )}
              </div>
            </button>
            {error && (
              <span className="ml-2 text-red-700">Something went wrong</span>
            )}
          </form>
          <p className="text-gray-800 text-[12px] mt-2">
            Not a member?{" "}
            <span className="text-primaryColor font-bold hover:text-secondarColor transition duration-200 ease-in-out">
              <Link to="/login">LogIn</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
