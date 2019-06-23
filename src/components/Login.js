import React, { Component } from "react";
import axios from "axios";
import { setToken } from "../services/tokenService";

class Login extends Component {
    state = {
        email: '',
        password: ''
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };
    handleSubmit = async e => {
        console.log('submit')
        e.preventDefault();
        const { email, password } = this.state
        try {
            const res = await axios.post('/auth/login', { email, password})
            const token = res.data.token
            setToken(token)
            this.props.getCurrentUser();
        } catch (e) {
            console.error(e)
        }
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="login-email">Email: </label>
                    <input
                        type="email"
                        onChange={this.handleChange}
                        name="email"
                        id="login-email"
                        placeholder="email"
                    />
                </div>
                <div>
                    <label htmlFor="login-password">Password: </label>
                    <input
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                        id="login-password"
                        placeholder="Enter your desired password"
                    />
                </div>
                <div>
                    <input type="submit" value="Log In" />
                </div>
            </form>
        );
    }
}

export default Login;