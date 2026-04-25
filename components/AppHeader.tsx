"use client";

import Link from "next/link";
import NavUser from "./NavUser";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AppHeader() {
  const { user, _hasHydrated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg">
            📝 PostApp
          </Link>
          {_hasHydrated && user && (
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="hover:underline">All Posts</Link>
              <Link href="/my-posts" className="hover:underline">My Posts</Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-3">
          {_hasHydrated && !user && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
          {_hasHydrated && user && <NavUser />}
        </div>
      </div>
      <Separator />
    </header>
  );
}