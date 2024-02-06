const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6682192",
    password: "guS7QgLX91",
    database: "sql6682192",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL!");
    }
});

// Signup API
app.post("/signup", (req, res) => {
    const { username, password, age, dob, contact } = req.body;
    const sql =
        "INSERT INTO users (username, password, age, dob, contact) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [username, password, age, dob, contact], (err, result) => {
        if (err) {
        console.error("Error in signup:", err);
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
        res
            .status(200)
            .json({ success: true, message: "User registered successfully" });
        }
    });
});

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
        console.error("Error in login:", err);
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
        if (result.length > 0) {
            res.status(200).json({ success: true, message: "Login successful" });
        } else {
            res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }
        }
    });
});

// GetUserDetails API
app.get("/getUserDetails/:username", (req, res) => {
    const { username } = req.params;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) {
        console.error("Error in getUserDetails:", err);
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
        if (result.length > 0) {
            const userDetails = result[0];
            res.status(200).json({ success: true, userDetails });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
        }
    });
});

// EditUserDetails API
app.put("/editUserDetails/:username", (req, res) => {
    const { username } = req.params;
    const { age, dob, contact } = req.body;
    const sql =
        "UPDATE users SET age = ?, dob = ?, contact = ? WHERE username = ?";
    db.query(sql, [age, dob, contact, username], (err, result) => {
        if (err) {
        console.error("Error in editUserDetails:", err);
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
        res
            .status(200)
            .json({ success: true, message: "User details updated successfully" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
