import { useState, useEffect } from "react";
import React from "react";
import "./Typing.css";
import Navbar from "./Navbar";
import Hamburger from "../components/Hamburger";
import { db } from "../firebase/firebaseconfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Typing() {
  // document.body.style.setProperty("background-image", `url(${TypingPage})`);

  const [timer, setTimer] = useState(30);
  const [typeStarted, setTypeStarted] = useState(false);
  const [typeEnded, setTypeEnded] = useState(false);
  const [showresult, setShowresult] = useState(false);
  const [runloop, setRunloop] = useState(true); //getMatchedWords can run only once when we click the show results button
  const [words, setWords] = useState("");
  const [modal, setModal] = useState(false);
  let finalMarks = 0; //To show the final Marks/score in after clicking the result button
  const [accuracy, setAccuracy] = React.useState(0);
  const [wordsPerMinute, setWordsperminute] = React.useState(0);

  const [WPM, setWPM] = useState("");
  const [Acc, setAcc] = useState("");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthkey"));

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserId = auth.currentUser.uid;
        const docRef = doc(db, "users", currentUserId);
        const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
          setWPM(doc.data().highestWPM);
          setAcc(doc.data().highestAccuracy);
        });
        // ...
      }
    });
  }, []);

  const paragraph =
    "Mental Health Is Not Just A Concept That Refers To An Individual's Psychological And Emotional Well Being.Rather It's A State Of Psychological And Emotional Well Being Where An Individual Is Able To Use Their Cognitive And Emotional Capabilities, Meet The Ordinary Demand And Functions In The Society";
  const totalWords = paragraph.length; //for calculating words per minute

  useEffect(() => {
    if (typeStarted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setShowresult(true);
            return setTypeStarted(false);
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [typeStarted]);

  function handleChange(event) {
    setWords(event.target.value);
    setTypeStarted(true);
  }

  function toggleModal() {
    setModal(false);
  }

  async function resultHandler() {
    function getWords(str) {
      return str.split(" ").filter(Boolean);
    }
    if (wordsPerMinute > WPM) {
      await updateDoc(docRef, {
        highestWPM: WPM,
      });
    }

    const data1 = {
      highestWPM: wordsPerMinute,
    };
    if (wordsPerMinute > WPM) {
      updateDoc(docRef, data1)
        .then((docRef) => {
          console.log(
            "A New Document Field has been added to an existing document"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const data2 = {
      highestAccuracy: accuracy,
    };
    if (accuracy > Acc) {
      updateDoc(docRef, data2)
        .then((docRef) => {
          console.log(
            "A New Document Field has been added to an existing document"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function getMatchedWords(words1, words2) {
      const max = (await words2.length) - 1; //Because there is no point in checking words beyond the number of words inputed by the user
      const max2 = await words1.length;
      if (runloop == true) {
        for (let i = 0; i <= max - 1; i++) {
          if (words1[i] === words2[i]) {
            finalMarks += 1;
          }
        }
        setRunloop(false);
        if (finalMarks > 0) {
          setAccuracy((finalMarks / max) * 100);
        }
        setWordsperminute(finalMarks * 2);
      }
    }

    const string1 = paragraph;
    const string2 = words;

    const words1 = getWords(string1);
    const words2 = getWords(string2);

    const matchedWords = getMatchedWords(words1, words2);
    setModal(true);
  }
  return (
   <>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Hamburger />
      <span className="scene__home">
      <div className="Header">
        <br />
        <div className="Heading-Headder">
          <ul className="Heading">TYPEMASTER</ul>
          {timer > 0 ? (
            <p className="TIMER" style={{ height: { timer } }}>
              TIMER:{timer}
            </p>
          ) : (
            <p className="TIMER">NO TIME LEFT</p>
          )}
        </div>
        <div>
          <p className="Sentence">
            Mental health is not just a concept that refers to an individual's
            psychological and emotional well being.Rather it's a state of
            psychological and emotional well being where an individual is able
            to use their cognitive and emotional capabilities, meet the ordinary
            demand and functions in the society.
          </p>
        </div>
        <form>
          {timer > 0 ? (
            <textarea
              className="input-hoga"
              type="text"
              style={{ resize: "none" }}
              placeholder="TYPE HERE TO START THE TIME...."
              onChange={handleChange}
            />
          ) : (
            <textarea
              className="input-hoga"
              type="text"
              style={{ resize: "none" }}
              placeholder="TYPE HERE TO START THE TIME...."
              onChange={handleChange}
              disabled={true}
            />
          )}
        </form>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>YOUR RESULT</h2>
              <p>
                WORDS PER MINUTES:{wordsPerMinute}
                <br />
                ACCURACY:{accuracy}%
              </p>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        )}
        <br />
        {showresult == true && (
          <button className="showResult" onClick={resultHandler}>
            Show result
          </button>
        )}{" "}
        <br />
      </div>
    </span>
    </>
  );
}

export default Typing;
