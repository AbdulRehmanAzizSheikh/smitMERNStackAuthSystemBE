import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpGenerator from "@/utils/otpGenerator";
import User from "@/lib/models/User";
import { connectMongodb } from "@/lib/db";

const emailConfig = {
  service: "gmail",
  auth: {
    user: process.env.PORTAL_EMAIL,
    pass: process.env.PORTAL_PASSWORD,
  },
};

async function sendVerificationEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: process.env.PORTAL_EMAIL,
    to: email,
    subject: "Email Verification OTP",
    text: `Your OTP is: ${otp}`,
  };
  await transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required!" },
        { status: 400 },
      );
    }
    await connectMongodb();
    const otp = otpGenerator(6);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    user.emailVerification = {
      otp: otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
      verified: false,
    };
    await user.save();
    await sendVerificationEmail(email, otp);

    return NextResponse.json(
      { message: "Verification email sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error, "error ----------------------");
    return NextResponse.json(
      { message: "Error verifying email" },
      { status: 500 },
    );
  }
}
