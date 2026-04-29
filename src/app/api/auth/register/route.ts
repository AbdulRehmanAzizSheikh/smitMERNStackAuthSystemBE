import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectMongodb } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await connectMongodb();
  const body = await req.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 },
    );
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 },
      );
    }
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );
    await User.create({ username, email, password: hashedPassword });
    return NextResponse.json(
      {
        registeration: {
          success: true,
        },
        message: "User registered successfully!",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        registeration: { success: false },
        message: "User registration failed!",
      },
      { status: 500 },
    );
  }
}
