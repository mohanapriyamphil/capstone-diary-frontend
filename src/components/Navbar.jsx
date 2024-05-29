import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const onLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
      <h1>The Diary App</h1>
        <Link to="/">
          
        </Link>
        <nav>

          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
         
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
