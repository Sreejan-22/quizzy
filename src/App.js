import { useEffect, useState } from "react";
import Question from "./components/Question/Question";
import "./App.css";
import data from "./data/sports.json";

// What was the final score of the Germany vs. Brazil 2014 FIFA World Cup match?

function App() {
  const [question, setQuestion] = useState(null);
  const [number, setNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        setQuestion(data.results[0]);
        setNumber(1);
        setLoading(false);
      });
  }, []);

  const nextQuestion = () => {
    if (number !== data.results.length) {
      const temp = number;
      setQuestion(data.results[temp]);
      setNumber(temp + 1);
    }
  };

  return (
    <div className="quiz-content-wrapper">
      <div className="quiz-content">
        <div className="quiz-category-container">
          <h3 className="quiz-category">Sports</h3>
        </div>
        {/* {[1, 2, 3, 4, 5].map((item) => (
          <Question number={item} key={item} />
        ))} */}
        {loading ? null : (
          <Question
            question={question.question}
            number={number}
            options={question.answers}
            nextQuestion={nextQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default App;
