import React, { useState } from "react";

function EmailVerification() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {};
  return (
    <form className='signup' onSubmit={handleSubmit}>
      <label>Enter Your Email:</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <button>Send</button>
    </form>
  );
}

export default EmailVerification;
