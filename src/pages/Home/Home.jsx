import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>Quiz App</h1>
      <br />
      <br />
      <br />
      <Link to="/quiz">
        <button>Go to Sports Quiz</button>
      </Link>
    </div>
  );
};

export default Home;
