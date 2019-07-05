import React from "react";
import { useInput } from "./hooks/input-hook";
import axios from "axios";

function Signup() {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword
  } = useInput("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", { email, password });
      this.props.setUser(res.data);
    } catch (e) {
      console.error(e);
    }
    resetEmail();
    resetPassword();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input type="email" {...bindEmail} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            placeholder="Enter your desired password"
            {...bindPassword}
          />
        </label>
      </div>
      <div>
        <input type="submit" value="Signup" />
      </div>
    </form>
  );
}

export default Signup;