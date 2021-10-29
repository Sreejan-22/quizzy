import "./Question.css";

const Question = ({ question, number, options, nextQuestion }) => {
  return (
    <>
      <div className="question-header">
        <div>Question No. {number}</div>
        <div>00:21</div>
      </div>
      <div>
        {/* What was the final score of the Germany vs. Brazil 2014 FIFA World Cup
        match? */}
        {question}
      </div>
      <div className="options">
        {/* <div className="option">
          <p>0-1</p>
        </div>
        <div className="option">
          <p>7-1</p>
        </div>
        <div className="option">
          <p>16-0</p>
        </div>
        <div className="option">
          <p>3-4</p>
        </div> */}
        {options.map((item) => (
          <div className="option" key={item} onClick={nextQuestion}>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <button onClick={nextQuestion}>Skip</button>
    </>
  );
};

export default Question;
