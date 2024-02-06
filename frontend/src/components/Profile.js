import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Profile() {
    const { username } = useParams();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        axios
        .get(`http://localhost:5000/getUserDetails/${username}`)
        .then((response) => setUserDetails(response.data.userDetails))
        .catch((error) => console.log("Error in getting user details"));
    }, [username]);

    return (
        <div>
            <h2>Profile details of {userDetails.username}</h2>
            <br/>
            <p>Username: {userDetails.username}</p><br/>
            <p>Age: {userDetails.age}</p><br/>
            <p>Date of Birth: {userDetails.dob}</p><br/>
            <p>Contact: {userDetails.contact}</p><br/>
            <br/>
            <Link className="button" to={`/update-profile/${username}`}><button>Update Profile</button></Link>
            <br/>
            <Link className="button" to={`/Login`} ><button>Logout</button></Link>
        </div>
    );
}

export default Profile;
