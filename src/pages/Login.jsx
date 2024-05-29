import { useState } from "react";
import { useLogin } from '../hooks/useLogin'
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notValid, setNotValid] = useState(null);
  const { login, error, isLoading } = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if((!email)) {
      setNotValid("Please enter a valid email")
      return;
    }
    if(!password) {
      setNotValid("Please enter a password");
      return;
    }
    setNotValid("");

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

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

      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
      <p>Not registered yet?{" "}<Link to={"/signup"}>Create an Account</Link></p>
    </form>
  );
};

export default Login;
