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
      <br />
      <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        &nbsp;
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
