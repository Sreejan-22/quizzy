import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ logout }) => {
  return (
    <nav className="navbar">
      <div className="nav-child">
        <Link to="/" className="logo-container">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt=""
            className="logo-img"
          />
          <h1 className="logo-name">Quizzy</h1>
        </Link>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
