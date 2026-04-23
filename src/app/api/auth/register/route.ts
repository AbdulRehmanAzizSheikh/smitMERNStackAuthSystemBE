import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectMongodb } from "@/lib/db/connectMongodb";

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
    const user = await User.create({ username, email, password });
    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User registration failed!", error: error },
      { status: 500 },
    );
  }
}
