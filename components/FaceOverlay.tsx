"use client";

type FeedbackType = "idle" | "checking" | "warning" | "success" | "error";

interface FaceOverlayProps {
  message: string;
  type: FeedbackType;
}

const typeConfig: Record<FeedbackType, { borderColor: string; bgGlow: string }> = {
  idle: { borderColor: "border-white/70", bgGlow: "" },
  checking: { borderColor: "border-accent", bgGlow: "" },
  warning: { borderColor: "border-amber-400", bgGlow: "" },
  success: { borderColor: "border-success", bgGlow: "shadow-[0_0_40px_rgba(16,185,129,0.3)]" },
  error: { borderColor: "border-danger", bgGlow: "" },
};

export default function FaceOverlay({ message, type }: FaceOverlayProps) {
  const config = typeConfig[type];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
      {/* Dimmed edges */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Face guide frame */}
      <div className={`relative w-56 h-72 sm:w-64 sm:h-80 ${config.bgGlow}`}>
        {/* Rounded rectangle border with dashed inner */}
        <div
          className={`absolute inset-0 rounded-[2rem] border-[3px] ${config.borderColor} transition-colors duration-500 ${type === "idle" || type === "checking" ? "face-guide-pulse" : ""}`}
        />
        <div
          className={`absolute inset-3 rounded-[1.5rem] border border-dashed ${config.borderColor}/40 transition-colors duration-500`}
        />

        {/* Corner brackets */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 320">
          <g
            fill="none"
            stroke={
              type === "success"
                ? "#10b981"
                : type === "warning"
                  ? "#fbbf24"
                  : type === "error"
                    ? "#ef4444"
                    : "white"
            }
            strokeWidth="4"
            strokeLinecap="round"
          >
            {/* Top-left */}
            <path d="M8 50 L8 8 L50 8" />
            {/* Top-right */}
            <path d="M206 8 L248 8 L248 50" />
            {/* Bottom-left */}
            <path d="M8 270 L8 312 L50 312" />
            {/* Bottom-right */}
            <path d="M206 312 L248 312 L248 270" />
          </g>
        </svg>

        {/* Scanning line animation (during checking) */}
        {type === "checking" && (
          <div className="absolute inset-x-4 overflow-hidden rounded-[1.5rem] h-full">
            <div className="scan-line absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />
          </div>
        )}
      </div>

      {/* Feedback message pill */}
      <div className="relative mt-5 z-10">
        <div
          className={`px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md transition-all duration-300 ${
            type === "success"
              ? "bg-success/90 text-white"
              : type === "error"
                ? "bg-danger/90 text-white"
                : type === "warning"
                  ? "bg-amber-500/90 text-white"
                  : type === "checking"
                    ? "bg-white/20 text-white"
                    : "bg-white/15 text-white/90"
          }`}
        >
          <span className="flex items-center gap-2">
            {type === "checking" && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
            )}
            {type === "success" && <span>&#10003;</span>}
            {type === "error" && <span>&#10007;</span>}
            {type === "warning" && <span>&#9888;</span>}
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}
