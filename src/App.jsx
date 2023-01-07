import { useState } from "react";
import "./App.css"
import Navbar from "../src/components/Navbar";
import SignUp from "./pages/signup";
import Signin from "./pages/Signin";
import Typing from "../src/components/Typing";
import Aboutus from "../src/pages/Aboutus";
import Leaderboard from "../src/pages/Leaderboard";
import './styles/Signup.css'
import "./styles/Navbar-signin.css"

import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
    
  return (
    <div>
      <Routes>
       <Route
          path="/"
          element={<SignUp/>}
        />
        <Route
          path="/Signin"
          element={<Signin/>}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard/>}
        />
        <Route
          path="/aboutus"
          element={<Aboutus/>}
        />
        {isAuth &&
        <Route
          path="/Typing"
          element={<Typing/>}
        />}
       
        <Route
          path="/*"
          element={<h1>SOMETHING WENT WRONG</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
