import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateToken = async (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    const cookieStore = cookies();
    cookieStore.set("token", token, {
        // httpOnly: true, 
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });


};