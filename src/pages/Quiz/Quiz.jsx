import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Question from "../../components/Question/Question";
import "./Quiz.css";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const allQuestions = useRef();
  const score = useRef(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/quiz/sports`)
      .then((res) => res.json())
      .then((jsonData) => {
        allQuestions.current = jsonData.questions;
        setLoading(false);
      });
  }, []);

  const nextQuestion = () => {
    if (index !== allQuestions.current.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const setScore = (newScore) => {
    score.current = newScore;
  };

  return (
    <div className="quiz-content-wrapper">
      <div className="quiz-content">
        <div className="quiz-category-container">
          <h3 className="quiz-category">Sports</h3>
        </div>
        {loading ? (
          <h3>Loading...</h3>
        ) : index === allQuestions.current.length ? (
          <div>
            <h1>Quiz Finished</h1>
            <br />
            <h3>Total Score: {score.current}/100</h3>
            <br />
            <Link to="/">
              <button>Go to Home</button>
            </Link>
          </div>
        ) : (
          <Question
            question={allQuestions.current[index].question}
            index={index}
            options={allQuestions.current[index].answers}
            nextQuestion={nextQuestion}
            correctAnswerIndex={allQuestions.current[index].correctAnswerIndex}
            currScore={score.current}
            setScore={setScore}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
