import express from "express";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import Bcrypt from "bcrypt";

dotenv.config();

const Guest = express.Router();
const jwtSecret = process.env.JWT_SECRET;

Guest.post("/register",(req,res)=>{

    const {name,email,password} = req.body;

    if(!name || !email || !password)
    {
        return res.status(400).json({error:"Please add all the fields"})
    }

    User.findOne({email:email})
        .then((savedUser)=>{

            if(savedUser)
            {
                return res.status(409).json({error:"User with this email already exists"})
            }

            Bcrypt.hash(password,12)
                .then((hashedPassword)=>{

                    const user = new User({
                        name,
                        email,
                        password: hashedPassword
                    })

                    user.save()
                        .then(user=>{res.status(201).json({message: "User registered successfully"})})
                        .catch(err=>{console.log(err)})

                })
        });   
});

Guest.post("/login",(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password)
    {
        return res.status(400).json({error:"Please add all the fields"})
    }

    User.findOne({email: email})
        .then((savedUser)=>{

            if(!savedUser)
            {
                return res.status(400).json({error:"Invalid Email"})
            }

            Bcrypt.compare(password, savedUser.password)
                .then((match)=>{
                    if(match)
                    {
                        const payload = {_id: savedUser._id, name: savedUser.name};
                        const token = Jwt.sign(payload, jwtSecret);

                        savedUser.token = token;
                        savedUser.save();

                        const {name, email, _id} = savedUser;

                        res.status(200)
                        .header("Authorization", `Bearer ${token}`)
                        .json({ userInfo: { name, email, _id }, token });
                    }
                    else
                    {
                        return res.status(400).json({error:"Invalid Password"})
                    }
                })
                .catch(err=>{console.log(err)})




        })
});

Guest.get("/logout", (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout Successfull"});
    
})

export default Guest;