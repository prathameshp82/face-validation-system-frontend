"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 font-semibold text-lg tracking-tight hover:opacity-90 transition-opacity"
        >
          <svg
            className="w-7 h-7"
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
          FaceVerify
        </button>
        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
