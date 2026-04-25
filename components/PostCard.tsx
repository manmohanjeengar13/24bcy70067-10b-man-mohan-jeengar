"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { toast } from "sonner";

interface Post {
  _id: string;
  title: string;
  description: string;
  userId: string;
  authorName?: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onDelete?: () => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuthStore();
  const isOwner = user?.id === post.userId;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`);
      toast.success("Post deleted");
      onDelete?.();
    } catch {
      toast.error("Failed to delete post");
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">
            <Link href={`/posts/${post._id}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          {isOwner && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.authorName && <Badge variant="secondary">{post.authorName}</Badge>}
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>
      </CardContent>
    </Card>
  );
}