"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
    } else {
      setStatus({
        type: "success",
        message: "Check your email for the confirmation link!",
      });
    }
  };

  const handleGoogleSignup = async () => {
    setStatus({ type: "loading", message: "" });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Create your account
          </h1>
          <p className="text-[var(--foreground)]/60">
            Start tracking your cashflow in minutes
          </p>
        </div>

        <div className="bg-[var(--background-secondary)] rounded-xl p-8 border border-[var(--background-secondary)]">
          {/* Google OAuth */}
          <motion.button
            onClick={handleGoogleSignup}
            disabled={status.type === "loading"}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 mb-6"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--foreground)]/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[var(--background-secondary)] text-[var(--foreground)]/50">
                or sign up with email
              </span>
            </div>
          </div>

          {status.type === "success" ? (
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-[var(--accent-success)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--accent-success)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-[var(--foreground)]">{status.message}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--foreground)]/70 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--foreground)]/70 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--foreground)]/10 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:outline-none focus:border-[var(--primary)] transition-colors"
                  required
                />
              </div>

              {status.type === "error" && (
                <motion.p
                  className="text-sm text-[var(--accent-warning)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {status.message}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full px-4 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] font-semibold rounded-lg transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {status.type === "loading" ? "Creating account..." : "Sign up"}
              </motion.button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-[var(--foreground)]/60">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
