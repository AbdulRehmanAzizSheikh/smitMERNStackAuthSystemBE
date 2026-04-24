import { NextResponse } from "next/server";
import { connectMongodb } from "@/lib/db/connectMongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function DELETE(req: Request) {
  try {
    await connectMongodb();
    const Authorization = req.headers.get("authorization");
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Authorization token is missing or invalid!" },
        { status: 401 },
      );
    }
    const token = Authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!id) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    const deleteUser = await User.deleteOne({ _id: id });
    if (!deleteUser) {
      return NextResponse.json(
        { message: "User deletion failed!" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "User deleted successfully!", deleteUser },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "User deletion failed!", error: error },
      { status: 500 },
    );
  }
}
