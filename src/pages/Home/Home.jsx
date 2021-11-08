import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { isAuthenticated } from "../../utils/auth";

const sportpic =
  "https://media.istockphoto.com/photos/various-sport-equipments-on-grass-picture-id949190736";
const historypic =
  "https://media.istockphoto.com/vectors/open-book-with-history-doodles-and-lettering-vector-id1092170968";
const politicspic =
  "imf.org/external/pubs/ft/fandd/2020/06/images/frieden-1600.jpg";

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
          <h1>Try out different quizzes</h1>
          <br />
          <br />
          <div className="category-container">
            &nbsp;&nbsp;
            <Link to="/quiz/sports">
              <button>Sports Quiz</button>
            </Link>
            &nbsp;&nbsp;
            <Link to="/quiz/history">
              <button>History Quiz</button>
            </Link>
            &nbsp;&nbsp;
            <Link to="/quiz/politics">
              <button>Politics Quiz</button>
            </Link>
            &nbsp;&nbsp;
          </div>
          <br />
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
