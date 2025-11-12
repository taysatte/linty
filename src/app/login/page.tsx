"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/puzzle";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError: setFormError,
  } = form;

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push(redirectTo);
        router.refresh();
      }
    };

    checkAuth();
  }, [router, redirectTo]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        // Set error on the form
        setFormError("root", {
          type: "manual",
          message: signInError.message,
        });
        return;
      }

      // Redirect to the intended page or puzzle page
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setFormError("root", {
        type: "manual",
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    }
  };

  const rootError = form.formState.errors.root;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/svgs/linty-logo.svg"
            alt="Linty Logo"
            width={48}
            height={48}
            priority
          />
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Welcome back
            </CardTitle>
            <CardDescription>
              Sign in to your account to continue solving puzzles
            </CardDescription>
          </CardHeader>
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {rootError && (
                <div
                  className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  role="alert"
                >
                  {rootError.message}
                </div>
              )}

              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-invalid={fieldState.invalid}
                        disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="login-password">Password</FieldLabel>
                      <Input
                        {...field}
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        aria-invalid={fieldState.invalid}
                        disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 mt-6">
              <Button
                type="submit"
                form="login-form"
                className="cursor-pointer font-semibold w-full text-background"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href={`/signup${
                    redirectTo !== "/puzzle"
                      ? `?redirectTo=${encodeURIComponent(redirectTo)}`
                      : ""
                  }`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
