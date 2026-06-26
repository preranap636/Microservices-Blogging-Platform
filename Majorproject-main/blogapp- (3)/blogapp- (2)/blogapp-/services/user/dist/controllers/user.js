import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../utils/TryCatch.js";
import getBuffer from "../utils/dataUri.js";
import { v2 as cloudinary } from "cloudinary";
import { oauth2client } from "../utils/GoogleConfig.js";
import axios from 'axios';
export const loginUser = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            res.status(400).json({
                message: "Authorization code is required",
            });
            return;
        }
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const { name, email, picture } = userRes.data;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
                image: picture,
            });
        }
        const token = jwt.sign({ user }, process.env.JWT_SEC, {
            expiresIn: "30d",
        });
        res.status(200).json({
            message: "Login success",
            token,
            user,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.json(user);
});
export const getUserProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            //success: false,
            message: "User not found",
        });
        return;
    }
    res.json(user);
});
export const updateUser = TryCatch(async (req, res) => {
    const { name, instagram, facebook, linkedin, bio } = req.body;
    // 🧩 Make sure the user exists
    const user = await User.findByIdAndUpdate(req.user?._id, { name, instagram, facebook, linkedin, bio }, { new: true });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    // ✅ Generate token safely (after confirming user exists)
    const token = jwt.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "30d",
    });
    res.json({
        message: "User Updated",
        token,
        user,
    });
});
export const updateProfilePic = TryCatch(async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer?.content) {
        return res.status(400).json({ message: "Failed to generate buffer" });
    }
    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
        folder: "blogs",
    });
    const user = await User.findByIdAndUpdate(req.user?._id, { image: cloud.secure_url }, { new: true });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // ✅ Generate a consistent token
    const token = jwt.sign({ user }, process.env.JWT_SEC, {
        expiresIn: "30d",
    });
    res.json({
        message: "User Profile pic updated",
        token,
        user,
    });
});
//# sourceMappingURL=user.js.map