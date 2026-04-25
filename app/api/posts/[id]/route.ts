import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { getSession, unauthorized } from "@/lib/api-utils";
import { getPostById, deletePost } from "@/services/posts";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return NextResponse.json(
      { message: "Post not found" },
      { status: StatusCodes.NOT_FOUND }
    );
  }

  return NextResponse.json(post, { status: StatusCodes.OK });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const deleted = await deletePost(id, session.id as string);

  if (!deleted) {
    return NextResponse.json(
      { message: "Post not found or not authorized" },
      { status: StatusCodes.NOT_FOUND }
    );
  }

  return NextResponse.json({ message: "Post deleted" }, { status: StatusCodes.OK });
}