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
      <div className="flex-1 flex flex-col overflow-hidden bg-primary-dark" style={{ height: "100dvh" }}>
        <Navbar />

        <main className="flex-1 flex items-center justify-center overflow-hidden px-4 py-4 min-h-0">
          <div className="w-full max-w-4xl animate-fade-in flex gap-6 items-stretch h-full">

            {/* Camera panel */}
            <div className="flex-shrink-0 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{ aspectRatio: "3/4", maxHeight: "100%", width: "auto" }}>
              <FaceCamera onValidated={() => setDone(true)} />
            </div>

            {/* Side panel */}
            <div className="flex-1 flex flex-col justify-between min-w-0">

              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                    Live Verification
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight">
                  Face<br />Validation
                </h1>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {done
                    ? "Your identity has been verified successfully."
                    : "Hold steady while we scan your face automatically."}
                </p>
              </div>

              {/* Status card */}
              <div className={`rounded-xl border p-4 transition-all duration-500 ${
                done
                  ? "bg-success/10 border-success/30"
                  : "bg-white/5 border-white/10"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    done ? "bg-success/20" : "bg-accent/20"
                  }`}>
                    {done ? (
                      <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${done ? "text-success" : "text-white"}`}>
                      {done ? "Verification Complete" : "Scanning in progress"}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {done ? "You can now continue" : "Auto-capture every 1.5s"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              {!done && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tips for best results</p>
                  <ul className="space-y-2">
                    {[
                      { icon: "◎", text: "Center your face in the frame" },
                      { icon: "☀", text: "Ensure even, well-lit environment" },
                      { icon: "◉", text: "Remove glasses or face coverings" },
                      { icon: "—", text: "Keep still with a neutral expression" },
                    ].map((tip) => (
                      <li key={tip.text} className="flex items-start gap-2.5 text-xs text-slate-400">
                        <span className="text-accent mt-0.5 text-base leading-none w-4 flex-shrink-0">{tip.icon}</span>
                        {tip.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Security badges */}
              <div className="flex flex-wrap gap-2">
                {["256-bit encrypted", "No data stored", "GDPR compliant"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {done && (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-3.5 rounded-xl bg-success text-white font-semibold shadow-lg hover:bg-success/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Continue to Dashboard
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
