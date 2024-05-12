const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// In-memory database (replace this with an actual database like MongoDB or PostgreSQL)
let users = [];

// Register endpoint
app.post("/register", (req, res) => {
    const { user, pwd } = req.body;

    // Check if the username already exists
    if (users.find((u) => u.user === user)) {
        return res.status(409).json({ message: "Username Taken" });
    }

    // Simulate storing the user data (replace this with actual database logic)
    users.push({ user, pwd });

    // Send a success response
    res.status(200).json({ message: "Registration Successful" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
