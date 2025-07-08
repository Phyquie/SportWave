import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/utils/db";
import { generateToken } from "@/utils/generatetoken";




export const POST = async (req) => {
    console.log("Running");
    try {
        const { token_google ,name ,email ,photo_url } = await req.json();
        console.log(token_google ,name ,email ,photo_url )
        if (!token_google) {
            return NextResponse.json({ message: "Token not found" }, { status: 400 });
        }

        const token = jwt.sign({ id: token_google }, process.env.JWT_SECRET, { expiresIn: "30d" });
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            // httpOnly: ,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        await connectDB();
        const user = await User.findOne({ email });
        console.log(user)
       
        if(!user) {
            try{
            const newUser = new User({ google_id: token_google, name, email, photo_url, password: "" });
            await newUser.save();
            console.log("New user created" , newUser);
            generateToken(newUser);
            return NextResponse.json({ message: "Login successful via Google" }, { status: 200 });
            }
            catch(error){
                console.log(error);
            }
            
        }
          
        if(user.photo_url === null){
            await User.findOneAndUpdate( 
                { email },  // Changed from google_id to email for consistency
                { google_id: token_google, name, photo_url: photo_url },
                { new: true }
            );
        }
        else{
        await User.findOneAndUpdate( 
            { email },  // Changed from google_id to email for consistency
            { google_id: token_google, name},
            { new: true }
        );
    }
        generateToken(user);
            return NextResponse.json({ message: "Login successful via Google" }, { status: 200 });
        }
        
     catch (error) {
        return NextResponse.json({ message: "Authentication failed" }, { status: 500 });
    }
}