import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { StatusCodes } from "http-status-codes";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: StatusCodes.OK }
  );

  response.headers.set(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })
  );

  return response;
}