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
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    const otp = otpGenerator(6);
    user.verify.otp.code = otp;
    user.verify.otp.expireAt = Date.now() + 10 * 60 * 1000;
    user.verify.status = false;
    await user.save();
    await sendVerificationEmail(email, otp);

    return NextResponse.json(
      { message: "Verification email sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error sending verification email",
        error,
      },
      { status: 500 },
    );
  }
}
