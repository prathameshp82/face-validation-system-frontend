"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import FaceCamera from "@/components/FaceCamera";

export default function FaceCapturePage() {
  const router = useRouter();
  const [done, setDone] = useState(false);

  return (
    <AuthGuard>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary-dark">
              Face Validation
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {done
                ? "Verification complete"
                : "Hold steady — we're scanning automatically"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <FaceCamera onValidated={() => setDone(true)} />

            {/* Tips */}
            {!done && (
              <div className="px-6 py-4 bg-surface-dark border-t border-slate-100">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <svg
                    className="w-5 h-5 text-accent mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-slate-700">
                      Tips for best results:
                    </p>
                    <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
                      <li>Align your face inside the frame</li>
                      <li>Ensure good, even lighting</li>
                      <li>Remove sunglasses or face coverings</li>
                      <li>Keep a neutral expression and hold still</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Done action */}
            {done && (
              <div className="p-6">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-3.5 rounded-xl bg-success text-white font-semibold shadow-md hover:bg-success/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Continue to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
