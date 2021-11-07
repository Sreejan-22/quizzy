import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { isAuthenticated } from "../../utils/auth";

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
      <Navbar logout={logout} />
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
