const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
