import { useEffect, useRef, useState } from "react";
import useTimer from "../../hooks/useTimer";
import "./Question.css";

const timeLimit = 20;

const Question = ({
  question,
  index,
  options,
  nextQuestion,
  correctAnswerIndex,
}) => {
  const { start, stop, seconds } = useTimer(timeLimit, nextQuestion);
  const [showResults, setShowResults] = useState(false);
  const clickedIndex = useRef();

  useEffect(() => {
    setShowResults(false);
    start();
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
        <div>Question No. {index + 1}</div>
        <div>00:{seconds < 10 ? "0" + seconds : seconds}</div>
      </div>
      <div>{question}</div>
      <div className="options">
        {options.map((item, currIndex) => (
          <div
            className={`option ${
              showResults ? showColor(currIndex, correctAnswerIndex) : ""
            }`}
            key={item}
            onClick={() => {
              clickedIndex.current = currIndex;
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
      <button onClick={stop}>Skip</button>
    </>
  );
};

export default Question;
