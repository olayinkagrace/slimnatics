import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

const handleClick = (e) => {
    e.preventDefault()
}

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <span></span>
            <button onClick={handleClick}>Log Out</button>
          </div>
          <div>
            <Link to='/login'>
              <h1>Login</h1>
            </Link>
            <Link to='/signup'>
              <h1>Sign Up</h1>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
