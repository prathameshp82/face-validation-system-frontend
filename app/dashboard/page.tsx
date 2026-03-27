"use client";

import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <AuthGuard>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center animate-fade-in">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-primary-dark mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto">
            Verify your identity using our secure face validation system.
            Position your face in front of the camera for quick verification.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="grid gap-4">
              <button
                onClick={() => router.push("/face-capture")}
                className="w-full py-4 rounded-xl bg-primary text-white font-semibold text-base shadow-md hover:bg-primary-light active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                  />
                </svg>
                Start Face Validation
              </button>

              <div className="grid grid-cols-3 gap-3 mt-2">
                <div className="bg-surface rounded-xl p-4 text-center">
                  <div className="text-primary font-bold text-lg">Fast</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Under 5 seconds
                  </div>
                </div>
                <div className="bg-surface rounded-xl p-4 text-center">
                  <div className="text-primary font-bold text-lg">Secure</div>
                  <div className="text-xs text-slate-400 mt-1">
                    End-to-end encrypted
                  </div>
                </div>
                <div className="bg-surface rounded-xl p-4 text-center">
                  <div className="text-primary font-bold text-lg">Easy</div>
                  <div className="text-xs text-slate-400 mt-1">
                    One-click verify
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
