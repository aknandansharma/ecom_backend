import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

export const isAuth = async(req, res, next) => {
    try {
        const token =  req.headers.token;

        if(!token) {
            return res.status(403).json({
                messgae: "Please Login",
            });
        }
        const extractData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(extractData._id);
        next();
    } catch (error) {
        res.status(403).json({
            messgae: "Please Login",
        })
    }
}