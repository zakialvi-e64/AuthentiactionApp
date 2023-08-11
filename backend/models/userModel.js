import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        requied: false
    },
    email:{
        type: String,
        requied: true
    },
    password:{
        type: String,
        requied: true
    }
});

const User = mongoose.model("users", userSchema);

export default User;