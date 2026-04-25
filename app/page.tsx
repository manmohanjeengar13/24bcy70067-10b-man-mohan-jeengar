"use client";

import { useAuthStore } from "@/store/useAuthStore";
import PostsList from "@/components/PostsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { user, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to PostApp</h1>
        <p className="text-muted-foreground max-w-md">
          A fullstack application with secure authentication, posts, and comments.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <PostsList />;
}