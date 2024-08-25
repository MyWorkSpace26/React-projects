import { useState, useRef } from "react";
export default function Login() {
  const userEmail = useRef();
  const userPassword = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredEmail = userEmail.current.value;
    const enteredPassword = userPassword.current.value;
    console.log(enteredEmail, enteredPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            ref={userEmail}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={userPassword}
            required
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="reset">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}