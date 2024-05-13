const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./lib/database");
const User = require("./models/User");

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

// Connect to MongoDB
connectDB();

// Register endpoint
app.post("/register", async (req, res) => {
    const { user, pwd } = req.body;

    // Validate the request body
    if (!user || !pwd) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    // Add additional user input validation
    if (user.length < 4 || !/^[a-zA-Z0-9]+$/.test(user)) {
        return res.status(400).json({ message: "Invalid username" });
    }

    if (pwd.length < 8) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ user });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        // Hash the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Create a new user
        const newUser = new User({ user, pwd: hashedPwd });
        await newUser.save();

        res.status(200).json({ message: "Registration Successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Generate access token
const generateAccessToken = (user, userId) => {
    const payload = {
        user,
        userId,
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    })

    return accessToken
}

// Login endpoint
app.post("/login", async (req, res) => {
    const { user, pwd } = req.body;

    try {
        // Find the user in the database
        const foundUser = await User.findOne({ user });

        if (!foundUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(pwd, foundUser.pwd);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Generate an access token
        const accessToken = generateAccessToken(foundUser.user, foundUser._id);

        // Send the access token and user roles in the response
        const roles = foundUser.roles || [];
        res.json({ accessToken, roles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
