import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
        <Link to="/signup">
            <button>Signup</button>
        </Link>
        <br/>
        <Link to="/login">
            <button>Login</button>
        </Link>
        </div>
    );
}

export default Home;
