import React, { useState } from 'react'

function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
  }


  return (
    <form className='login' onSubmit={handleSubmit}>
    <h3>Login</h3>

    <label>Email:</label>
    <input
      type='email'
      onChange={(e) => setEmail(e.target.value)}
      value={email}
    />

    <label>Password:</label>
    <input
      type='password'
      onChange={(e) => setPassword(e.target.value)}
      value={password}
    />
    <button>Login Up</button>
    {/* {error && <div className='error'>{error}</div>} */}
  </form>
  )
}

export default Signin
