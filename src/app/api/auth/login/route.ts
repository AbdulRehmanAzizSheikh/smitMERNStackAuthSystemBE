import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/db/connectMongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await connectMongodb();
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 },
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 404 },
      );
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Invalid credentials!" },
        { status: 401 },
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    return NextResponse.json(
      { message: "User login successfully!", token: token },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User login failed!", error: error },
      { status: 500 },
    );
  }
}
