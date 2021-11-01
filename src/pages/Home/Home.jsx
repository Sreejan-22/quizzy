import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Quiz App</h1>
      <br />
      <Link to="/quiz">
        <button>Go to Sports Quiz</button>
      </Link>
    </div>
  );
};

export default Home;
