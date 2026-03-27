"use client";

import { Suspense, useState, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { login } from "@/utils/api";
import { isAuthenticated } from "@/utils/auth";
import InputField from "@/components/InputField";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "1";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ username, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      {/* Logo / Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <svg
            className="w-9 h-9 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-primary-dark">FaceVerify</h1>
        <p className="text-sm text-slate-500 mt-1">
          Sign in to access face validation
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          {justRegistered && !error && (
            <div className="bg-emerald-50 text-success text-sm px-4 py-3 rounded-lg border border-emerald-200 animate-fade-in">
              Account created successfully! Please sign in.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-danger text-sm px-4 py-3 rounded-lg border border-red-200 animate-fade-in">
              {error}
            </div>
          )}

          <InputField
            id="username"
            label="Username"
            value={username}
            onChange={setUsername}
            placeholder="Enter your username"
            autoComplete="username"
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-base shadow-md hover:bg-primary-light active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-accent font-medium hover:underline"
          >
            Create one
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        Secure identity verification system
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin-slow" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
