import Jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";


dotenv.config();



const Auth = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET;
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    Jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden" });
        }
        
        const userIdFromToken = decoded._id; // Extract user ID from decoded token

        User.findById(userIdFromToken).then((user) => {
            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            req.user = user; // Attach the user object to the request
            next();
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

export default Auth;