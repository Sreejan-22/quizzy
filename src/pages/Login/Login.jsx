import "./Login.css";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <br />
      <br />
      <form>
        <label htmlFor="email">Email</label>
        <br />
        <input type="text" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" id="password" />
        <br />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
