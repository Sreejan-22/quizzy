import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = {
          name: data.user.name,
          email: data.user.email,
          token: data.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="signup-container">
      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : (
        <div className="signup-wrapper">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt=""
            className="signup-logo-img"
          />
          <h1>Create a new account</h1>
          <p>
            Already a member?{" "}
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
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
