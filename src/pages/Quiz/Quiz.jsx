import { useEffect, useRef, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";
import data from "../../data/sports.json";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const allQuestions = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((jsonData) => {
        allQuestions.current = data.results;
        setLoading(false);
      });
  }, []);

  const nextQuestion = () => {
    if (index !== allQuestions.current.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="quiz-content-wrapper">
      <div className="quiz-content">
        <div className="quiz-category-container">
          <h3 className="quiz-category">Sports</h3>
        </div>
        {loading ? null : index === allQuestions.current.length ? (
          <h1>Quiz Finished</h1>
        ) : (
          <Question
            question={allQuestions.current[index].question}
            index={index}
            options={allQuestions.current[index].answers}
            nextQuestion={nextQuestion}
            correctAnswerIndex={
              allQuestions.current[index].correct_answer_index
            }
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
