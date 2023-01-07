import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/Hamburger.css";
import { auth, db } from "../firebase/firebaseconfig";
import { AiOutlineMenu } from "react-icons/ai";

function Hamburger() {
  const [flip, setFlip] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(localStorage.getItem("isAuthkey"));
  let navigate = useNavigate();

  function leaderboardHandler() {
    navigate("/leaderboard");
  }

  function aboutusHandler() {
    navigate("/aboutUs");
  }
  function signupHandler() {
    if (!isAuth) {
      navigate("/");
    }
  }
  function TypingHandler() {
    if (isAuth) {
      navigate("/Typing");
    }
  }

  function flipMenu() {
    setFlip(!flip);
  }

  function SignOutHandler() {
    auth.signOut();
    localStorage.clear();
    navigate("/");
    setIsAuth(false);
  }

  return (
    <div>
      <nav className="hamburgerNav">
        <ul className="Hamburger-title" onClick={signupHandler}>
          TYPEMASTER
        </ul>

        <div onClick={flipMenu} className="hamburgerMenu">
          <AiOutlineMenu style={{ fontSize: "3em", color: "white" }} />
        </div>
      </nav>
      {flip && (
        <div className="hamburgerNav-2">
          {isAuth && <ul onClick={TypingHandler}>Typing</ul>}
          <ul onClick={leaderboardHandler}>LEADERBOARD</ul>
          <ul onClick={aboutusHandler}>ABOUTUS</ul>
          {!isAuth && <ul onClick={signupHandler}>SIGN UP</ul>}
          {isAuth && <ul onClick={SignOutHandler}>SIGN Out</ul>}
        </div>
      )}
    </div>
  );
}

export default Hamburger;
