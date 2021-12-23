import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import { notifyError } from "../../utils/notifyToasts";

const Signup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const user = {
            name: data.user.name,
            email: data.user.email,
            token: data.token,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setLoading(false);
          history.push("/");
        } else {
          setLoading(false);
          if (data.hasOwnProperty("serverError")) {
            notifyError(data.message);
          } else {
            const errors = data.errors;
            for (let field in errors) {
              if (errors[field].length) {
                notifyError(errors[field]);
              }
            }
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError("Something went wrong!!");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt=""
          className="signup-logo-img"
        />
        <h1>Create a new account</h1>
        <p>
          Already a user?{" "}
          <Link to="/login" className="plain-link">
            Login
          </Link>
        </p>
        <div className="signup-form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={signupData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <br />
            <button type="submit" className={loading ? "btn-loading" : ""}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
