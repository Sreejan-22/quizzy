import "./Signup.css";

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      <br />
      <br />
      <form>
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" id="name" />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input type="text" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input type="password" id="password" />
        <br />
        <br />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
