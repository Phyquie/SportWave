import connectDB from "@/utils/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import TempUser from "@/models/temp.user.model";
import nodemailer from "nodemailer";

export const runtime = 'nodejs'


const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOTPEmail = async (email, otp) => {
    try {
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

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: String(info.messageId) };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP email');
    }
};

export const POST = async (req) => {
    try {
        await connectDB();
        const { email, password, name } = await req.json();
        console.log(email, password, name);
        // Add validation for required fields
        if (!email || !password || !name) {
            return NextResponse.json(
                { message: "Email, password, and name are required" },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 401 });
        }

        await TempUser.deleteMany({ email });
        const otp = generateOtp();

        await sendOTPEmail(email, otp);

        try {
            const newUser = new TempUser({ email, password: hashedPassword, name, otp });
            await newUser.save();
        } catch (error) {
            console.error('Error creating temporary user:', error);
            return NextResponse.json(
                { message: "An error occurred during signup in temporary database" },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: "Temporary User created successfully" }, { status: 200 });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: "An error occurred during signup" },
            { status: 500 }
        );
    }
}
