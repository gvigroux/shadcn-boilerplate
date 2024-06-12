"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type Props = {
  className?: string;
};

export function Social({ className }: Props) {
  return (
    <div className={cn("flex w-full items-center gap-x-2", className)}>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
