import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-child">
        <div className="logo-container">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt=""
            className="logo-img"
          />
          <h1 className="logo-name">Quizzy</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
