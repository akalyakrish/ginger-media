import React, { useState } from "react";
import axios from "axios";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0);
    const [dob, setDob] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = () => {
        axios
        .post("http://localhost:5000/signup", {
            username,
            password,
            age,
            dob,
            contact,
        })
        .then((response) => setMessage(response.data.message))
        .catch((error) => setMessage("Error in signup"));
    };

    return (
        <div>
        <h2>Signup</h2>
        <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <input
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
        />
        <input
            type="text"
            placeholder="Date of Birth"
            onChange={(e) => setDob(e.target.value)}
        />
        <input
            type="text"
            placeholder="Contact"
            onChange={(e) => setContact(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
        <p className="message">{message}</p>
        </div>
    );
}

export default Signup;
