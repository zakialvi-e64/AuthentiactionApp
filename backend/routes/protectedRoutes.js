import express from "express";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const Protect = express.Router();

Protect.get("/userlist",  (req, res) => {
    User.find()
        .then(users => {
            if (users.length > 0) 
            {
                res.status(200).json(users);
                
            } 
            else 
            {
                res.status(404).json({error:"No User Found"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json();
        });
});

export default Protect;