import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Question from "../../components/Question/Question";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../utils/auth";
import { notifyError, notifySuccess } from "../../utils/notifyToasts";
import "./Quiz.css";

function Quiz() {
  const { category } = useParams();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(true);
  const allQuestions = useRef();
  const score = useRef(0);
  const summary = useRef([]);

  /*
  const summary = [
    {
      question: "...",
      answer: "...",
      attempt: "correct"/"wrong"/"skipped",
      userAnswer: "..." (if skipped then null)
    }
  ]
  */

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/quiz/${category}`, {
      headers: {
        Authorization: `Bearer ${getUser().token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jsonData) => {
        allQuestions.current = jsonData.questions;
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showSummary) {
      document.body.classList.add("add-bg-color");
    } else {
      document.body.classList.remove("add-bg-color");
    }
  }, [showSummary]);

  const nextQuestion = () => {
    if (index !== allQuestions.current.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const setScore = (newScore) => {
    score.current = newScore;
  };

  const setSummary = (val) => {
    const temp = summary.current;
    temp.push(val);
    summary.current = temp;
  };

  const saveResults = async (e) => {
    e.preventDefault();

    try {
      const resultData = {
        category,
        email: getUser().email,
        score: score.current,
      };

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/results`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getUser().token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(resultData),
      });
      const data = await res.json();
      if (data.success) {
        notifySuccess("Result saved");
        setShowSaveBtn(false);
      } else {
        notifyError("Failed to save result");
      }
    } catch (err) {
      console.log(err);
      notifyError("Failed to save result");
    }
  };

  return (
    <>
      <Navbar />
      <div className="quiz-content-wrapper">
        <div className="quiz-content">
          {/* <div className="quiz-category-container">
            <h3 className="quiz-category">Sports</h3>
          </div> */}
          {loading ? (
            <h3>Loading...</h3>
          ) : index === allQuestions.current.length ? (
            <>
              <h1>Quiz completed!</h1>
              <br />
              <h2 className="quiz-category">Cagetory: {category}</h2>
              <br />
              <h2>Total Score: {score.current}/100</h2>
              <br />
              <div className="quiz-btn-container">
                &nbsp;&nbsp;
                {showSaveBtn ? (
                  <>
                    <button onClick={saveResults}>Save Results</button>
                    &nbsp;&nbsp;&nbsp;
                  </>
                ) : null}
                <button onClick={() => setShowSummary((prev) => !prev)}>
                  {showSummary ? "Hide" : "Show"} Summary
                </button>
                &nbsp;&nbsp;&nbsp;
                <Link to="/">
                  <button>Go to Home</button>
                </Link>
                &nbsp;&nbsp;
              </div>
            </>
          ) : (
            <Question
              question={allQuestions.current[index].question}
              index={index}
              options={allQuestions.current[index].answers}
              nextQuestion={nextQuestion}
              correctAnswerIndex={
                allQuestions.current[index].correctAnswerIndex
              }
              currScore={score.current}
              setScore={setScore}
              summary={summary.current}
              setSummary={setSummary}
            />
          )}
        </div>
      </div>
      {showSummary ? (
        <div className="quiz-summary-container">
          <div className="quiz-summary">
            {summary.current.map((item, index) => (
              <div key={`summary-${index}`}>
                <p>
                  <b>Question {index + 1}: </b>
                  {item.question}
                </p>
                <p>
                  <b>Correct Answer: </b>
                  {item.answer}
                </p>
                {item.attempt === "correct" ? (
                  <p>Your answer is correct!</p>
                ) : item.attempt === "wrong" ? (
                  <p>
                    <b>Your answer: </b>
                    {item.userAnswer}
                  </p>
                ) : (
                  <p>You skipped this question</p>
                )}
                <br />
                <br />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </>
  );
}

export default Quiz;
