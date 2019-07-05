import React from "react";
import { useInput } from "./hooks/input-hook"
import axios from "axios";
import { setToken } from "../services/tokenService";

function Login() {
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
    const {
        value: password,
        bind: bindPassword,
        reset: resetPassword
    } = useInput("");

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { email, password})
            const token = res.data.token
            setToken(token)
            this.props.getCurrentUser();
        } catch (e) {
            console.error(e)
        }
        resetEmail();
        resetPassword();
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="login-email">Email: </label>
                <input
                    type="email"
                    name="email"
                    id="login-email"
                    placeholder="email"
                    {...bindEmail}
                />
            </div>
            <div>
                <label htmlFor="login-password">Password: </label>
                <input
                    type="password"
                    name="password"
                    id="login-password"
                    placeholder="Enter your desired password"
                    {...bindPassword}
                />
            </div>
            <div>
                <input type="submit" value="Log In" />
            </div>
        </form>
    );
}

export default Login;