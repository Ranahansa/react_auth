const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);


let users = [];


app.post("/register", async (req, res) => {
    const { user, pwd } = req.body;

    
    if (!user || !pwd) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    
    const existingUser = users.find((u) => u.user === user);
    if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
    }

    try {
        
        const hashedPwd = await bcrypt.hash(pwd, 10);

        users.push({ user, pwd: hashedPwd });

        res.status(200).json({ message: "Registration Successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
