// src/app/api/test/route.ts

import { generateToken, decodeToken } from "@/utils/jwt";

export async function POST(req: Request) {
  try {
    // Token generate
    const token = generateToken(
      {
        userId: "12345",
        email: "abdul@example.com",
      },
      7 * 24 * 60 * 60,
    );

    console.log("Generated Token:", token);

    // Token decode
    const decoded = decodeToken<{
      userId: string;
      email: string;
    }>(token);

    console.log("Decoded:", decoded);

    return Response.json({
      message: "Success",
      token,
      decoded,
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
