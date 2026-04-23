import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/db/connectMongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectMongodb();
  const { Authorization } = req.headers;
  try {
    if (!Authorization) {
      return NextResponse.json(
        { message: "User not logged in!" },
        { status: 401 },
      );
    }

    const {id} = jwt.verify(Authorization, process.env.JWT_SECRET);

    const user = await User.findById(id);
    if(!user){
      return NextResponse.json(
        { message: "User not found!" },
        { status: 404 },
      );
    }
    const deleteUser = await User.deleteOne({_id: id});
    if(!deleteUser){
      return NextResponse.json(
        { message: "User logout failed!" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "User logout failed!", error: error },
      { status: 500 },
    );
  }
}