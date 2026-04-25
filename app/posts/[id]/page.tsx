"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CommentsSection from "@/components/CommentsSection";
import { Loader2 } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  description: string;
  authorName: string;
  createdAt: string;
}

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`);
        setPost(data);
      } catch {
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!post) {
    return <p className="text-center text-muted-foreground py-20">Post not found.</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary">{post.authorName}</Badge>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <p className="text-base leading-relaxed">{post.description}</p>
      <Separator />
      <CommentsSection postId={post._id} />
    </div>
  );
}