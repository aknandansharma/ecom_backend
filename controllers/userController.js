import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user)
            return res.status(400).json({
                message: "User Already Exists",
            });

        const hashPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid UserName and Password!",
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid UserName and Password!",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1hr",
        });

        res.json({
            message: `Welcome ${user.name}`,
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const myProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json({user});
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}