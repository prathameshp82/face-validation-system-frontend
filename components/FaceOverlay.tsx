"use client";

type FeedbackType = "idle" | "checking" | "warning" | "success" | "error";

interface FaceOverlayProps {
  message: string;
  type: FeedbackType;
}

const typeConfig: Record<
  FeedbackType,
  { borderColor: string; cornerColor: string; glow: string; pillBg: string }
> = {
  idle: {
    borderColor: "border-white/50",
    cornerColor: "white",
    glow: "",
    pillBg: "bg-black/40 text-white/80",
  },
  checking: {
    borderColor: "border-[#4a90d9]",
    cornerColor: "#4a90d9",
    glow: "",
    pillBg: "bg-[#4a90d9]/80 text-white",
  },
  warning: {
    borderColor: "border-amber-400",
    cornerColor: "#fbbf24",
    glow: "",
    pillBg: "bg-amber-500/85 text-white",
  },
  success: {
    borderColor: "border-[#10b981]",
    cornerColor: "#10b981",
    glow: "shadow-[0_0_60px_rgba(16,185,129,0.35)]",
    pillBg: "bg-[#10b981]/90 text-white",
  },
  error: {
    borderColor: "border-[#ef4444]",
    cornerColor: "#ef4444",
    glow: "",
    pillBg: "bg-[#ef4444]/85 text-white",
  },
};

export default function FaceOverlay({ message, type }: FaceOverlayProps) {
  const cfg = typeConfig[type];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />

      {/* Face guide */}
      <div className={`relative w-[55%] h-[70%] ${cfg.glow} transition-all duration-500`}>
        {/* Main border */}
        <div
          className={`absolute inset-0 rounded-[2.5rem] border-2 ${cfg.borderColor} transition-colors duration-500 ${
            type === "idle" || type === "checking" ? "face-guide-pulse" : ""
          }`}
        />

        {/* Inner dashed ring */}
        <div
          className={`absolute inset-[10px] rounded-[2rem] border border-dashed ${cfg.borderColor} opacity-30 transition-colors duration-500`}
        />

        {/* Corner brackets — larger, bold */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 220 290"
          fill="none"
        >
          <g stroke={cfg.cornerColor} strokeWidth="5" strokeLinecap="round">
            {/* Top-left */}
            <path d="M10 55 L10 10 L55 10" />
            {/* Top-right */}
            <path d="M165 10 L210 10 L210 55" />
            {/* Bottom-left */}
            <path d="M10 235 L10 280 L55 280" />
            {/* Bottom-right */}
            <path d="M165 280 L210 280 L210 235" />
          </g>
        </svg>

        {/* Scanning line */}
        {type === "checking" && (
          <div className="absolute inset-x-3 inset-y-0 overflow-hidden rounded-[2rem]">
            <div className="scan-line absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4a90d9] to-transparent opacity-90" />
          </div>
        )}

        {/* Success checkmark overlay */}
        {type === "success" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/20 flex items-center justify-center animate-fade-in">
              <svg className="w-8 h-8 text-[#10b981]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Message pill */}
      <div className="relative mt-5 z-10">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-300 ${cfg.pillBg}`}
        >
          {type === "checking" && (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin-slow flex-shrink-0" />
          )}
          {type === "success" && (
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          {type === "error" && (
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {type === "warning" && (
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )}
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
