import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseconfig";
import "../styles/Aboutus.css";
import Navbarsignin from "../components/Navbar-signin";
import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Aboutus() {
  const [message, setMessage] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));

  var docRef

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserId = auth.currentUser.uid;
        docRef = doc(db, "contactUs", currentUserId);

        const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
          setfirstName(doc.data().firstName);
          setlastName(doc.data().lastName);
          setEmail(doc.data().email);
        });
      }
    });
  }, []);

  async function submitHandler() {
    await setDoc(docRef, {
      firstName,
      lastName,
      email,
      message,
    });
    alert("WE WILL RESPOND BACK TO YOU WITHIN 24 HOURS")
  }
  function handleChange(event) {
    setMessage(event.target.value);
  }

  return (
    <div className="working">
      {!isAuth && <Navbarsignin />}
      <div className="Hamburger">
        <Hamburger />
      </div>
      {isAuth && <Navbar />}
      <div className="aboutUs">
        <div className="map">
          <iframe
            width="510"
            height="380"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=dj%20sanghvi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            className="dj-map"
          ></iframe>
        </div>
        <div className="aboutUs-texts">
          <p className="aboutUs-1">GOT A QUESTION ??</p>
          <b className="aboutUs-2">Drop us a line!</b>
          <p className="aboutUs-3">
            We are here to answer any questions
            <br /> that you might have.
            <br /> We look forward to hearing from
            <br /> you.
          </p>
          {isAuth && (
            <div>
              <input className="contactUs-input" onChange={handleChange} />
              <br />
              <br />
              <button className="aboutUs-submit" onClick={submitHandler}>
                Send Message
              </button>
            </div>
          )}
          {!isAuth && <h1>SIGN IN TO REACH OUT TO US</h1>}
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
