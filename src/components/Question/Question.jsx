import { useEffect } from "react";
import useTimer from "../../hooks/useTimer";
import "./Question.css";

const Question = ({ question, index, options, nextQuestion, lastIndex }) => {
  const { start, stop, seconds } = useTimer(5, nextQuestion);

  useEffect(() => {
    start();
  }, [index, start]);

  return (
    <>
      <div className="question-header">
        <div>Question No. {index + 1}</div>
        <div>00:{seconds < 10 ? "0" + seconds : seconds}</div>
      </div>
      <div>{question}</div>
      <div className="options">
        {options.map((item) => (
          <div className="option" key={item} onClick={stop}>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <button onClick={stop}>Skip</button>
    </>
  );
};

export default Question;
