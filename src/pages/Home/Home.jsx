import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import "./Home.css";

const Home = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      history.push("/");
    }
  };

  return (
    <div className="home">
      <h1>Quiz App</h1>
      <br />
      {isAuthenticated() ? (
        <>
          <Link to="/quiz">
            <button>Go to Sports Quiz</button>
          </Link>
          <br />
          <Link to="/results">
            <button>See past results</button>
          </Link>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          &nbsp;
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
