import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";
import { db } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc} from "firebase/firestore";
import Navbarsignin from "../components/Navbar-signin"
import Hamburger from "../components/Hamburger";

function SignUp() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));
  let navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        localStorage.setItem("isAuthkey", true);
        const ref = doc(db, "users", userCredentials.user.uid);
        const docRef = await setDoc(ref, { firstName, lastName, email,highestWPM:0,highestAccuracy:0 ,rank:0})
          .then((response) => {
            alert("new data in firestore added");
          })
          .catch((error) => {
            console.log(error.message);
          });
        navigate("/Typing");
      })
      .catch((error) => {
        const errorcode = error.code;
        alert(errorcode);
      });
  };

  function LoginNavigate() {
    navigate("/signin");
  }
  function leaderboardHandler(){
    navigate("/leaderboard")
  }

  function aboutusHandler(){
    navigate("/aboutUs")
  }

  return (
    <div className="working-signup">
      <Navbarsignin/>
      <div className="Hamburger">
            <Hamburger/>
        </div>
       <div>
        <nav className="loginBody-signup">
          <ul className="loginBody-signup-1">START FOR FREE</ul>
          <ul className="loginBody-signup-2">Create New account.</ul>
          <div className="loginBody-signup-3">
            <p className="member">Already a member?</p>
            <p className="loginBody-signup_login" onClick={LoginNavigate}>
              Log in.
            </p>
          </div>
        </nav>
        <form className="loginForm">
          <div className="form1">
            <input
              placeholder="First Name"
              className="formInput-firstName"
              onChange={() => setfirstName(event.target.value)}
              required={true}
            />
            <input
              placeholder="Last Name"
              className="formInput-lastName"
              onChange={() => setlastName(event.target.value)}
              required={true}
            />
          </div>
          <div className="form2">
            <input
              placeholder="Email"
              className="loginBody-signup-email"
              type={"email"}
              onChange={() => setEmail(event.target.value)}
              required={true}
            />
            <br />
            <br />
            <input
              placeholder="Password"
              className="loginBody-signup-password"
              type={"password"}
              // minLength="7"
              onChange={() => setPassword(event.target.value)}
              required={true}
            />
            <br />
            <br />
            <br />
            <button
              className="createAccount"
              // type="submit"
              onClick={handleSignUp}
            >
              Create Account
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

export default SignUp;
