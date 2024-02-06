import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && password) {
        axios
            .post("http://localhost:5000/login", { username, password })
            .then((response) => {
                setMessage(response.data.message);
                if (response.data.success) {
                    navigate(`/profile/${username}`);
                }
            })
            .catch((error) => {
                setMessage("Error in login");
            });
        } else {
        // show an error message if the fields are empty
        setMessage("Please enter your username and password");
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required // add the required attribute
        />
        <br/>
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required // add the required attribute
        /><br/>
        <button onClick={handleLogin}>
            Login
        </button>
        <p className="message">{message}</p>
        </div>
    );
}

export default Login;
