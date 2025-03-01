import connectDB from "@/utils/db";
import User from "@/models/user.model";

export async function POST(req, res) {
    await connectDB();
    const { email, password } = await req.json();
    console.log(email, password);
    if(!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if(user) {
        return res.status(400).json({ message: "Login successful" });
    }
    if()
    res.status(200).json({ message: "User created successfully" });
}