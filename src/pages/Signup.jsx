import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notValid, setNotValid] = useState(null);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!username) {
      setNotValid("Please enter your name");
      return;
    }

    if(!email) {
      setNotValid("Please enter a valid email");
      return;
    }

    if(!password) {
      setNotValid("Please enter a password");
      return;
    }
    setNotValid("");

    await signup(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label htmlFor="username">Username: </label>
      <input
        id="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label htmlFor="password">Password: </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {notValid && <div className="error">{notValid}</div>}
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
      <p>Already have an account?{" "}<Link to={"/login"}>Login</Link></p> 
    </form>
  );
};

export default Signup;
