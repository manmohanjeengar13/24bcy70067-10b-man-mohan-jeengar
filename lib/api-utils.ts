import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { serialize } from "cookie";
import { signToken, verifyToken } from "./jwt";
import { StatusCodes } from "http-status-codes";

export async function createAuthCookie(
  response: NextResponse,
  user: { id: string; email: string; name: string }
) {
  const token = await signToken({ id: user.id, email: user.email, name: user.name });

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
  });

  response.headers.set("Set-Cookie", cookie);
  return { response, token };
}

export async function getSession() {
  const headersList = await headers();

  // 1. Essayer le header Authorization
  const authHeader = headersList.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    return await verifyToken(token);
  }

  // 2. Essayer le cookie HTTP-only
  const cookieHeader = headersList.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
    if (match) {
      return await verifyToken(match[1]);
    }
  }

  return null;
}

export function unauthorized() {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: StatusCodes.UNAUTHORIZED }
  );
}