import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";

export async function paginatePosts(page: number = 1, limit: number = 5) {
  await connectDB();

  const skip = (page - 1) * limit;
  const total = await Post.countDocuments();
  const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

  const enriched = await Promise.all(
    posts.map(async (post) => {
      const author = await User.findById(post.userId).lean() as any;
      return {
        ...post,
        authorName: author?.name ?? "Unknown",
      };
    })
  );

  return {
    posts: enriched,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getAllPostsExcluding(userId: string) {
  await connectDB();

  const posts = await Post.find({ userId: { $ne: userId } })
    .sort({ createdAt: -1 })
    .lean();

  const enriched = await Promise.all(
    posts.map(async (post) => {
      const author = await User.findById(post.userId).lean() as any;
      return {
        ...post,
        authorName: author?.name ?? "Unknown",
      };
    })
  );

  return enriched;
}

export async function getMyPosts(userId: string) {
  await connectDB();

  const posts = await Post.find({ userId }).sort({ createdAt: -1 }).lean();
  return posts;
}

export async function createPost(
  userId: string,
  data: { title: string; description: string }
) {
  await connectDB();

  const post = await Post.create({ userId, ...data });
  return post;
}

export async function deletePost(postId: string, userId: string) {
  await connectDB();

  const post = await Post.findOneAndDelete({ _id: postId, userId });
  return post;
}

export async function getPostById(postId: string) {
  await connectDB();

  const post = await Post.findById(postId).lean() as any;
  if (!post) return null;

  const author = await User.findById(post.userId).lean() as any;
  return {
    ...post,
    authorName: author?.name ?? "Unknown",
  };
}