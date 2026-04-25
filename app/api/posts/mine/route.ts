import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { getSession, unauthorized } from "@/lib/api-utils";
import { getMyPosts } from "@/services/posts";

export async function GET() {
  const session = await getSession();
  if (!session) return unauthorized();

  const posts = await getMyPosts(session.id as string);
  return NextResponse.json(posts, { status: StatusCodes.OK });
}