import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { auth, db } from "../firebase/firebaseconfig";
import { doc, onSnapshot } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserId = auth.currentUser.uid;
        const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
          setfirstName(doc.data().firstName);
          setlastName(doc.data().lastName);
        });
      }
    });
  }, []);

  function SignOutHandler() {
    localStorage.clear();
    auth.signOut();
    navigate("/");
    setIsAuth(false);
  }

  function leaderboardHandler() {
    navigate("/leaderboard");
  }

  function aboutusHandler() {
    navigate("/aboutUs");
  }
  function gameHandler() {
    navigate("/Typing");
  }

  return (
    <div className="Header">
      <nav className="Header-1">
        <ul className="Trial" onClick={gameHandler}>
          {firstName}
        </ul>
        <div className="Header-2">
          <ul className="Trial" onClick={leaderboardHandler}>
            LEADERBOARD
          </ul>
          <ul className="Trial" onClick={aboutusHandler}>
            ABOUTUS
          </ul>
          <ul className="Trial" onClick={SignOutHandler}>
            LOGOUT
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
