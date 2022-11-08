import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="h-[100vh] flex justify-center items-center font-poppins bg-gradient-to-r from-primaryGreen to-secondarGreen">
      {/* <Login /> */}
      <SignUp />
      {/* <Home /> */}
    </div>
  );
}

export default App;
