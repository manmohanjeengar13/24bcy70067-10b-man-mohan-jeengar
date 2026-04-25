import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { getSession, unauthorized } from "@/lib/api-utils";
import { paginatePosts, createPost } from "@/services/posts";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return unauthorized();

  const page = parseInt(req.nextUrl.searchParams.get("page") ?? "1");
  const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "5");

  const data = await paginatePosts(page, limit);
  return NextResponse.json(data, { status: StatusCodes.OK });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { title, description } = await req.json();

  if (!title || !description) {
    return NextResponse.json(
      { message: "Title and description are required" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const post = await createPost(session.id as string, { title, description });
  return NextResponse.json(post, { status: StatusCodes.CREATED });
}