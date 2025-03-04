import connectDB from "@/utils/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import TempUser from "@/models/temp.user.model";
import nodemailer from "nodemailer";

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, 
        auth: {
            user: '79ac62002@smtp-brevo.com', 
            pass: process.env.BREVEO_PASS
        }
    });

    const mailOptions = {
        from: 'Phyquie <ayushking6395@gmail.com>',
        to: email,
        subject: 'Your OTP Code for Sportwave',
        html: `
        <table role="presentation" width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #c5bcf5; font-family: Arial, sans-serif; padding: 20px;">
    <tr>
        <td align="center" valign="middle">
            <table role="presentation" width="500px" cellspacing="0" cellpadding="0" border="0" style="background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); text-align: center;">
                <tr>
                    <td>
                        <h1 style="font-size: 32px; font-weight: bold; color: #4f46e5;">Sportwave</h1>
                        <h2 style="font-size: 24px; font-weight: bold;">Welcome to <span style="color: #4f46e5;">Sportwave</span></h2>
                        <p style="font-size: 18px;">Your OTP code is <span style="font-weight: bold; color: #e63946;">${otp}</span></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email:', error);
        }
        console.log('Message sent: %s', info.messageId);
    });
     


};

export const POST = async (req) => {
    await connectDB();
    const { email, password, name } = await req.json();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne({ email });
    if(user) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
   await TempUser.deleteMany({ email });
    const otp = generateOtp();
    await sendOTPEmail(email, otp);
    const newUser = new TempUser({ email, password: hashedPassword, name, otp });
    await newUser.save();
    return NextResponse.json({ message: "Temporary User created successfully" }, { status: 200 });
}
