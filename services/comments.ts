import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import User from "@/models/User";

export async function getCommentsByPost(postId: string) {
  await connectDB();

  const comments = await Comment.find({ postId })
    .sort({ createdAt: -1 })
    .lean();

  const enriched = await Promise.all(
    comments.map(async (comment) => {
      const author = await User.findById(comment.userId).lean() as any;
      return {
        ...comment,
        authorName: author?.name ?? "Unknown",
      };
    })
  );

  return enriched;
}

export async function createComment(
  postId: string,
  userId: string,
  content: string
) {
  await connectDB();

  const comment = await Comment.create({ postId, userId, content });
  return comment;
}

export async function deleteComment(commentId: string, userId: string) {
  await connectDB();

  const comment = await Comment.findOneAndDelete({ _id: commentId, userId });
  return comment;
}