import { useState } from "react";
import { useHistory } from "react-router-dom";
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
    <div>
      <h1>Login</h1>
      <br />
      <br />
      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
