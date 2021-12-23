import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../utils/notifyToasts";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    isSubmitting: false,
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const toggleLoading = (type, value) => {
    if (type === "guest") {
      setLoading(value);
    } else {
      setLoginData({ ...loginData, isSubmitting: value });
    }
  };

  const handleSubmit = (isGuestLogin) => {
    const type = isGuestLogin ? "guest" : "user";
    const jsonData = isGuestLogin
      ? {
          email: process.env.REACT_APP_TEST_EMAIL,
          password: process.env.REACT_APP_TEST_PASSWORD,
        }
      : { email: loginData.email, password: loginData.password };

    toggleLoading(type, true);

    fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(jsonData),
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
          toggleLoading(type, false);
          history.push("/");
        } else {
          toggleLoading(type, false);
          notifyError(data.message);
        }
      })
      .catch((err) => {
        toggleLoading(type, false);
        notifyError("Something went wrong!");
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
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(false);
            }}
          >
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              required
              value={loginData.email}
              onChange={handleInputChange}
              disabled={loginData.isSubmitting || loading}
            />

            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              required
              value={loginData.password}
              onChange={handleInputChange}
              disabled={loginData.isSubmitting || loading}
            />
            <br />
            <button
              type="submit"
              disabled={loading}
              className={loginData.isSubmitting ? "btn-loading" : ""}
            >
              {loginData.isSubmitting ? "Loading..." : "Login"}
            </button>
            <p style={{ margin: "8px 0px", textAlign: "center" }}>Or</p>
            <button
              disabled={loginData.isSubmitting}
              className={loading ? "btn-loading" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(true);
              }}
            >
              {loading ? "Loading..." : "Login with test credentials"}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
