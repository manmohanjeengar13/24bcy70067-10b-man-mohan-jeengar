import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import argon2 from "argon2";
import { connectDB } from "@/lib/db";
import { createAuthCookie } from "@/lib/api-utils";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: StatusCodes.CONFLICT }
      );
    }

    const hashed = await argon2.hash(password);
    const user = await User.create({ name, email, password: hashed });

    const response = NextResponse.json(
      { message: "User created", user: { id: user._id, email: user.email, name: user.name } },
      { status: StatusCodes.CREATED }
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