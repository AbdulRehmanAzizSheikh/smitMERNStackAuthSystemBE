import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/db/connectMongodb";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  await connectMongodb();
  let query = {};
  if(req.query.id){
    query._id = req.query.id;
  }
  if(req.query.email){
    query.email = req.query.email;
  }
  if(req.query.username){
    query.username = req.query.username;
  }
  try {
    const users = await User.find(query);
    return NextResponse.json(
      { message: "User found successfully!", users },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User not found!", error: error },
      { status: 500 },
    );
  }
}