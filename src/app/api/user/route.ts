import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/db/connectMongodb";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  await connectMongodb();
  let query: Record<string, any> = {};
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const username = searchParams.get("username");
  if (id) {
    query._id = id;
  }
  if (email) {
    query.email = email;
  }
  if (username) {
    query.username = username;
  }
  try {
    const user = await User.findOne(query);
    if (!user) {
      return NextResponse.json(
        { message: "User data not found!" },
        { status: 404 },
      );
    }
    const data = {
      username: user.username,
      email: user.email,
      id: user._id,
    };
    return NextResponse.json(
      { message: "User found successfully!", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User not found!", error: error },
      { status: 500 },
    );
  }
}
