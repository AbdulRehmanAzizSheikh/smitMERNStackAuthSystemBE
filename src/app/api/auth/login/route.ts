import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/db";
import { cookies } from "next/headers";
import User from "@/lib/models/User";
import { generateToken } from "@/utils/jwt";
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

    const token = generateToken({ id: user._id });
    const cookieStore = await cookies();
    cookieStore.set("token", token);

    return NextResponse.json(
      { message: "User login successfully!" },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "User login failed!", error: error.message },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "User login failed!", error: "Unknown error" },
      { status: 500 },
    );
  }
}
