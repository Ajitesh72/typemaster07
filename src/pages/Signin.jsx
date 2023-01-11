import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Navbarsignin from "../components/Navbar-signin";
import Hamburger from "../components/Hamburger";
import "../styles/Signin.css";

function Signin() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));

  let navigate = useNavigate();

  const [Email, setemail] = useState("");
  const [Password, setpassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredentials) => {
        localStorage.setItem("isAuthkey", true);
        alert("WELCOME BACK");
        // alert(userCredentials.user.uid);
        navigate("/Typing");
      })
      .catch((error) => {
        const errorcode = error.code;
        alert(errorcode);
      });
  };

  function LoginNavigate() {
    navigate("/");
  }

  function leaderboardHandler() {
    navigate("/leaderboard");
  }

  function aboutusHandler() {
    navigate("/aboutUs");
  }

  return (
    <div className="working">
      <Navbarsignin />
      <div className="Hamburger">
        <Hamburger />
      </div>
      <div>
        <nav className="loginBody">
          <ul className="loginBody-1">WE ARE GLAD YOU ARE BACK</ul>
          <ul className="loginBody-2">SIGIN TO CONTINUE!!</ul>
          <div className="loginBody-3">
            <p>New to TYPEMASTER?</p>
            <p className="loginBody-3_login" onClick={LoginNavigate}>
              SignUp.
            </p>
          </div>
        </nav>
        <form className="loginForm">
          <div className="form2">
            <input
              placeholder="Email"
              className="formInput-email"
              type="email"
              onChange={() => setemail(event.target.value)}
              required={true}
            />
            <br />
            <br />
            <input
              placeholder="Password"
              className="formInput-password"
              type="password"
              min="6"
              onChange={() => setpassword(event.target.value)}
              required={true}
            />
            <br />
            <br />
            <br />
            <button className="createAccount" onClick={handleSignIn}>
              SIGN ME IN
            </button>
            {/* <br/> */}
            {/* <ul>OR</ul> */}
            {/* <button>Sign in with Google</button> */}
            {/* <button>Continue as a Guest</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
