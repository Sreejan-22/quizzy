import Question from "./components/Question/Question";
import "./App.css";

// What was the final score of the Germany vs. Brazil 2014 FIFA World Cup match?

function App() {
  return (
    <div className="quiz-content-wrapper">
      <div className="quiz-content">
        <div className="quiz-category-container">
          <h3 className="quiz-category">Sports</h3>
        </div>
        {/* {[1, 2, 3, 4, 5].map((item) => (
          <Question number={item} key={item} />
        ))} */}
        <Question />
      </div>
    </div>
  );
}

export default App;
