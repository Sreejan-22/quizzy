import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../utils/notifyToasts";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
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
          notifyError(data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        notifyError("Something went wrong!");
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt=""
          className="login-logo-img"
        />
        <h1>Log in to your account</h1>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="plain-link">
            Sign Up
          </Link>
        </p>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>

            <input
              type="text"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <br />
            <button type="submit" className={loading ? "btn-loading" : ""}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
