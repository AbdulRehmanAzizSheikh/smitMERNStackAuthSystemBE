import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/db/connectMongodb";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  await connectMongodb();
  let query = {};
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
    const users = await User.find(query);
    if (!users || (Array.isArray(users) && users.length === 0)) {
      return NextResponse.json({ message: "No data found!" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Users found successfully!", users },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Users not found!", error: error },
      { status: 500 },
    );
  }
}
