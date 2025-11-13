"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/AuthDialog";
import type { User } from "@supabase/supabase-js";

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  if (isLoading) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!user) {
    return (
      <>
        <Button
          variant="default"
          className="bg-card text-card-foreground hover:bg-accent/10 rounded-lg border border-border cursor-pointer font-semibold"
          size="default"
          onClick={() => setIsLoginDialogOpen(true)}
        >
          Sign in
        </Button>
        <AuthDialog
          open={isLoginDialogOpen}
          onOpenChange={setIsLoginDialogOpen}
          initialMode="login"
        />
      </>
    );
  }

  // Get user initials for avatar fallback
  const getInitials = (email: string | undefined) => {
    if (!email) return "U";
    const parts = email.split("@")[0].split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        Sign out
      </Button>
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback className="font-mono font-semibold text-muted-foreground bg-muted/20">
          {getInitials(user.email)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
