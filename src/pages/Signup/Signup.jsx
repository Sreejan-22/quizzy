import { useState } from "react";
import { useHistory } from "react-router-dom";
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
          email: data.user.name,
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
    <div>
      <h1>Signup</h1>
      <br />
      <br />
      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
