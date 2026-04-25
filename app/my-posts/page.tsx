"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import PostCard from "@/components/PostCard";
import { Loader2 } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
}

export default function MyPostsPage() {
  const { user, _hasHydrated } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/posts/mine");
      setPosts(data);
    } catch {
      toast.error("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_hasHydrated && user) fetchMyPosts();
  }, [_hasHydrated, user]);

  if (!_hasHydrated || loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Posts</h2>
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">
          You haven't created any posts yet.
        </p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={fetchMyPosts} />
          ))}
        </div>
      )}
    </div>
  );
}