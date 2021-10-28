import "./Question.css";

const Question = () => {
  return (
    <>
      <div className="question-header">
        <div>Correct Answers: 0/0</div>
        <div>00:21</div>
      </div>
      <div>
        What was the final score of the Germany vs. Brazil 2014 FIFA World Cup
        match?
      </div>
      <div className="options">
        <div className="option a">
          <p>0-1</p>
        </div>
        <div className="option b">
          <p>7-1</p>
        </div>
        <div className="option c">
          <p>16-0</p>
        </div>
        <div className="option d">
          <p>3-4</p>
        </div>
      </div>
    </>
  );
};

export default Question;
