import { useNavigate } from "react-router-dom";
import { useState} from "react";

function Navbarsignin() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
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

  return (
    <div className="working">
      <nav className="loginNavbar">
        <ul className="loginNavbar-text" onClick={signupHandler}>
          TYPEMASTER
        </ul>
        <div className="loginNavbar-2">
          <ul className="loginNavbar-text" onClick={leaderboardHandler}>
            LEADERBOARD
          </ul>
          <ul className="loginNavbar-text" onClick={aboutusHandler}>
            ABOUTUS
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbarsignin;
