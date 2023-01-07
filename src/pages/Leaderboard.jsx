import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseconfig";
import { doc, getDocs, onSnapshot, collection } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import "../styles/leaderboard.css";
import Navbarsignin from "../components/Navbar-signin";
import Navbar from "../components/Navbar";
import Hamburger from "../components/Hamburger";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]); //get an object getWPM function
  const [showdataWPM, setShowdataWPM] = useState(false);
  const [showdataAcc, setShowdataAcc] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserId = auth.currentUser.uid;
        const docRef = doc(db, "users", currentUserId);

        const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
          setfirstName(doc.data().firstName);
          setlastName(doc.data().lastName);
        });
      }
    });
  }, []);

  const leaderboardRef = collection(db, "users");
  var newData;

  async function getWPM() {
    const data = await getDocs(
      query(leaderboardRef, orderBy("highestWPM", "desc"))
    );
    newData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShowdataWPM(!showdataWPM);
    setLeaderboard(newData);
  }
  async function getAcc() {
    const data = await getDocs(
      query(leaderboardRef, orderBy("highestAccuracy", "desc"))
    );
    newData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setShowdataAcc(!showdataAcc);
    setLeaderboard(newData);
  }

  return (
    <div className="leaderboard">
      {!isAuth && <Navbarsignin />}
      <div className="Hamburger">
       <Hamburger/>
      </div>
      {isAuth && <Navbar />}
      <div className="leaderboard-body">
        <div className="leaderboard-body-1">
          {isAuth && (
            <div className="name">
              <ul className="game-name">
                {firstName} {lastName}
              </ul>
            </div>
          )}
          <div className="leaderboard-body-label">
            <div>
              <br className="break-Sortby" />
              SORT BY
            </div>
            <div>
              <br className="break-Sortby" />
              <input type="checkbox" className="checkbox-1" onClick={getWPM} />
              <label> WPM</label>
              <br />
              <input type="checkbox" className="checkbox-2" onClick={getAcc} />
              <label> ACCURACY</label>
            </div>
          </div>
        </div>
        <hr />
        <br />
        {showdataWPM && (
          <div className="leaderboard-body-2">
            {showdataWPM &&
              Object.keys(leaderboard).map((item, i) => (
                <div className="sortbyWPM">
                  <ul className="WPM-value"> {leaderboard[item].firstName} </ul>
                  <ul className="WPM-value">
                    {" "}
                    {leaderboard[item].highestWPM}{" "}
                  </ul>
                  <ul className="WPM-value">
                    {" "}
                    {leaderboard[item].highestAccuracy}{" "}
                  </ul>
                </div>
              ))}
          </div>
        )}
        <br />
        {showdataWPM && showdataAcc && <hr />}

        {showdataAcc && (
          <div className="leaderboard-body-2">
            {showdataAcc &&
              Object.keys(leaderboard).map((item, i) => (
                <div className="sortbyWPM">
                  <ul className="WPM-value"> {leaderboard[item].firstName} </ul>
                  <ul className="WPM-value">
                    {" "}
                    {leaderboard[item].highestWPM}{" "}
                  </ul>
                  <ul className="WPM-value">
                    {" "}
                    {leaderboard[item].highestAccuracy}{" "}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
