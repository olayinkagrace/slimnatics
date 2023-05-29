import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>Slimnatics</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span className="user_email">{user.name}</span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
