import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div className="h-[100vh] flex justify-center items-center font-poppins bg-gradient-to-r from-primaryGreen to-secondarGreen">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
