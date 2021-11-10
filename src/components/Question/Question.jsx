import { useEffect, useRef, useState } from "react";
import useTimer from "../../hooks/useTimer";
import "./Question.css";

const timeLimit = 200;

const Question = ({
  question,
  index,
  options,
  nextQuestion,
  correctAnswerIndex,
  currScore,
  setScore,
  setSummary,
}) => {
  const { start, stop, seconds } = useTimer(timeLimit, nextQuestion);
  const [showResults, setShowResults] = useState(false);
  const clickedIndex = useRef();

  useEffect(() => {
    clickedIndex.current = null;
    setShowResults(false);
    start();

    return () => {
      const result = {
        question: question,
        answer: options[correctAnswerIndex],
        userAnswer:
          clickedIndex.current !== null ? options[clickedIndex.current] : null,
        attempt:
          clickedIndex.current === null
            ? "skipped"
            : clickedIndex.current === correctAnswerIndex
            ? "correct"
            : "wrong",
      };
      setSummary(result);
    };
  }, [index, start]);

  function showColor(currIndex, correctAnswerIndex) {
    if (currIndex === correctAnswerIndex) {
      return "correct";
    } else if (
      clickedIndex.current === currIndex &&
      currIndex !== correctAnswerIndex
    ) {
      return "wrong";
    }
  }

  return (
    <>
      <div className="question-header">
        <div className="question-number">Question No. {index + 1}</div>
        <div>00:{seconds < 10 ? "0" + seconds : seconds}</div>
      </div>
      <div className="question">{question}</div>
      <br />
      <div className="options">
        {options.map((item, currIndex) => (
          <div
            className={`option ${
              showResults ? showColor(currIndex, correctAnswerIndex) : ""
            }`}
            key={item}
            onClick={() => {
              clickedIndex.current = currIndex;
              if (currIndex === correctAnswerIndex) {
                setScore(currScore + 10);
              }
              setShowResults(true);
              if (seconds > 1) {
                setTimeout(() => {
                  stop();
                }, 1000);
              } else {
                stop();
              }
            }}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
      <br />
      <button className="skip-btn" onClick={stop}>
        Skip
      </button>
    </>
  );
};

export default Question;
