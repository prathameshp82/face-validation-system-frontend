"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { uploadFaceImage } from "@/utils/api";
import type { FaceValidationResponse } from "@/types";
import FaceOverlay from "./FaceOverlay";

const VIDEO_CONSTRAINTS: MediaTrackConstraints = {
  width: 480,
  height: 640,
  facingMode: "user",
};

const CAPTURE_INTERVAL_MS = 1500;

type FeedbackType = "idle" | "checking" | "warning" | "success" | "error";

interface FaceCameraProps {
  onValidated?: () => void;
}

export default function FaceCamera({ onValidated }: FaceCameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const busyRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("idle");
  const [message, setMessage] = useState("Position your face inside the frame");
  const [validated, setValidated] = useState(false);

  const captureAndValidate = useCallback(async () => {
    if (busyRef.current || validated) return;
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    busyRef.current = true;
    setFeedbackType("checking");
    setMessage("Checking...");

    try {
      const blob = await fetch(imageSrc).then((r) => r.blob());
      const res = await uploadFaceImage(blob);
      const data: FaceValidationResponse = await res.json();

      if (data.status === true) {
        setFeedbackType("success");
        setMessage(data.message || "Face validated successfully!");
        setValidated(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onValidated?.();
      } else {
        const msg = data.message || "Validation failed";
        const isWarning =
          /move|closer|center|align|position|blurry|blur|dark|lighting|eye/i.test(msg);
        setFeedbackType(isWarning ? "warning" : "error");
        setMessage(msg);
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("Session expired")) {
        setFeedbackType("error");
        setMessage("Session expired. Redirecting...");
        return;
      }
      setFeedbackType("error");
      setMessage(
        err instanceof Error ? err.message : "Network error. Retrying..."
      );
    } finally {
      busyRef.current = false;
    }
  }, [validated, onValidated]);

  useEffect(() => {
    intervalRef.current = setInterval(captureAndValidate, CAPTURE_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [captureAndValidate]);

  return (
    <div className="relative aspect-[3/4] bg-slate-900 overflow-hidden">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.8}
        videoConstraints={VIDEO_CONSTRAINTS}
        className="w-full h-full object-cover"
        mirrored
      />
      <FaceOverlay message={message} type={feedbackType} />
    </div>
  );
}
