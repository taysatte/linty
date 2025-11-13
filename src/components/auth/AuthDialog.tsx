"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from "@/components/animate-ui/components/radix/tabs";
import { Sparkles, LogIn, UserPlus } from "lucide-react";
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

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

type AuthMode = "login" | "signup";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: AuthMode;
}

export function AuthDialog({
  open,
  onOpenChange,
  initialMode = "login",
}: AuthDialogProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit: handleLoginSubmit,
    formState: { isSubmitting: isLoginSubmitting },
    setError: setLoginError,
    reset: resetLogin,
  } = loginForm;

  const {
    handleSubmit: handleSignupSubmit,
    formState: { isSubmitting: isSignupSubmitting },
    setError: setSignupError,
    reset: resetSignup,
  } = signupForm;

  // Reset forms when dialog closes
  useEffect(() => {
    if (!open) {
      resetLogin();
      resetSignup();
      setMode(initialMode);
    }
  }, [open, initialMode, resetLogin, resetSignup]);

  const handleModeChange = (value: string) => {
    setMode(value as AuthMode);
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        setLoginError("root", {
          type: "manual",
          message: signInError.message,
        });
        return;
      }

      onOpenChange(false);
      router.refresh();
    } catch (err) {
      setLoginError("root", {
        type: "manual",
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/puzzle`,
        },
      });

      if (signUpError) {
        setSignupError("root", {
          type: "manual",
          message: signUpError.message,
        });
        return;
      }

      // Show success message and switch to login
      setMode("login");
      loginForm.setValue("email", data.email);
      setLoginError("root", {
        type: "manual",
        message:
          "Account created! Please check your email to verify your account, then sign in.",
      });
    } catch (err) {
      setSignupError("root", {
        type: "manual",
        message:
          err instanceof Error ? err.message : "An unexpected error occurred",
      });
    }
  };

  const loginRootError = loginForm.formState.errors.root;
  const signupRootError = signupForm.formState.errors.root;

  const isLogin = mode === "login";

  // Helper to determine error message styling
  const getErrorClassName = (message: string | undefined) => {
    const isSuccess =
      message?.includes("created") || message?.includes("verify");
    return isSuccess
      ? "border-primary/50 bg-primary/10 text-primary"
      : "border-destructive/50 bg-destructive/10 text-destructive";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image
              src="/svgs/linty-logo.svg"
              alt="Linty Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <DialogTitle className="text-2xl text-center">
            {isLogin ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {isLogin
              ? "Sign in to continue solving daily coding puzzles and track your progress"
              : "Join the community and start your coding journey with daily challenges"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={mode} onValueChange={handleModeChange} className="w-full">
          <TabsList className="w-full relative bg-card border border-border">
            <TabsTrigger value="login" className="flex-1 gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex-1 gap-2">
              <UserPlus className="w-4 h-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContents mode="auto-height" className="mt-4">
            <TabsContent value="login" className="mt-0">
              <form id="login-form" onSubmit={handleLoginSubmit(onLoginSubmit)}>
                <div className="space-y-5 py-4">
                  {loginRootError && (
                    <div
                      className={`rounded-lg border px-4 py-3 text-sm ${getErrorClassName(
                        loginRootError.message
                      )}`}
                      role="alert"
                    >
                      {loginRootError.message}
                    </div>
                  )}

                  <FieldGroup>
                    <Controller
                      name="email"
                      control={loginForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="login-email">
                            Email address
                          </FieldLabel>
                          <Input
                            {...field}
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            aria-invalid={fieldState.invalid}
                            disabled={isLoginSubmitting}
                            className="h-10"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="password"
                      control={loginForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="login-password">
                            Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            aria-invalid={fieldState.invalid}
                            disabled={isLoginSubmitting}
                            className="h-10"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>

                <DialogFooter className="flex flex-col gap-4 sm:flex-col">
                  <Button
                    type="submit"
                    form="login-form"
                    className="cursor-pointer font-semibold w-full text-background h-10"
                    disabled={isLoginSubmitting}
                  >
                    {isLoginSubmitting ? "Signing in..." : "Sign in"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground w-full">
                    <p>
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        onClick={() => handleModeChange("signup")}
                        disabled={isLoginSubmitting}
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </DialogFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <form
                id="signup-form"
                onSubmit={handleSignupSubmit(onSignupSubmit)}
              >
                <div className="space-y-5 py-4">
                  {signupRootError && (
                    <div
                      className={`rounded-lg border px-4 py-3 text-sm ${getErrorClassName(
                        signupRootError.message
                      )}`}
                      role="alert"
                    >
                      {signupRootError.message}
                    </div>
                  )}

                  <FieldGroup>
                    <Controller
                      name="email"
                      control={signupForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="signup-email">
                            Email address
                          </FieldLabel>
                          <Input
                            {...field}
                            id="signup-email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            aria-invalid={fieldState.invalid}
                            disabled={isSignupSubmitting}
                            className="h-10"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="password"
                      control={signupForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="signup-password">
                            Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            aria-invalid={fieldState.invalid}
                            disabled={isSignupSubmitting}
                            className="h-10"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            Must be at least 6 characters
                          </p>
                        </Field>
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={signupForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="signup-confirm-password">
                            Confirm password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="signup-confirm-password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            aria-invalid={fieldState.invalid}
                            disabled={isSignupSubmitting}
                            className="h-10"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>

                <DialogFooter className="flex flex-col gap-4 sm:flex-col">
                  <Button
                    type="submit"
                    form="signup-form"
                    className="cursor-pointer font-semibold w-full text-background h-10"
                    disabled={isSignupSubmitting}
                  >
                    {isSignupSubmitting
                      ? "Creating account..."
                      : "Create account"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground w-full">
                    <p>
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        onClick={() => handleModeChange("login")}
                        disabled={isSignupSubmitting}
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </DialogFooter>
              </form>
            </TabsContent>
          </TabsContents>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
