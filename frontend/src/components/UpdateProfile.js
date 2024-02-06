import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function UpdateProfile() {
    const { username } = useParams();
    const [age, setAge] = useState(0);
    const [dob, setDob] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
        .get(`http://localhost:5000/getUserDetails/${username}`)
        .then((response) => {
            const { age, dob, contact } = response.data.userDetails;
            setAge(age);
            setDob(dob);
            setContact(contact);
        })
        .catch((error) => console.log("Error in getting user details"));
    }, [username]);

    const handleUpdateProfile = () => {
        axios
        .put(`http://localhost:5000/editUserDetails/${username}`, {
            age,
            dob,
            contact,
        })
        .then((response) => setMessage(response.data.message))
        .catch((error) => setMessage("Error in updating user details"));
    };

    return (
        <div>
            <h2>Update Profile of {username}</h2>
            <br/>
            <p>
            Age:{" "}
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            </p>
            <br/>
            <p>
            Date of Birth:{" "}
            <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            </p>
            <br/>
            <p>
            Contact:{" "}
            <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            </p>
            <br/>
            <button onClick={handleUpdateProfile}>Update Profile</button><br/>
            <Link to={`/profile/${username}`}><button>Back</button></Link>
            <br/><br/><p className="message">{message}</p>
        </div>
    );
}

export default UpdateProfile;
