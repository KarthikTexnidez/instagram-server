const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstinput:String,
    password:String
});

const userModel = mongoose.model("dataofusers", userSchema);

module.exports = userModel;