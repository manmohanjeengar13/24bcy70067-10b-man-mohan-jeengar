import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import argon2 from "argon2";
import { connectDB } from "@/lib/db";
import { createAuthCookie } from "@/lib/api-utils";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const response = NextResponse.json(
      { message: "Login successful", user: { id: user._id, email: user.email, name: user.name } },
      { status: StatusCodes.OK }
    );

    await createAuthCookie(response, {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}