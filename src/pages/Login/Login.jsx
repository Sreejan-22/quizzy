import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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
          console.log(data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : (
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
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
