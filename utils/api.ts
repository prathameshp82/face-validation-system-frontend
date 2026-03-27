import type {
  TokenResponse,
  LoginCredentials,
  SignupCredentials,
  SignupResponse,
  ApiError,
} from "@/types";
import { getToken, setToken, setRefreshToken, clearToken } from "@/utils/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function parseErrorResponse(res: Response): Promise<string> {
  try {
    const data: ApiError = await res.json();
    if (data.detail) return data.detail;
    if (data.message) return data.message;
    if (data.non_field_errors) return data.non_field_errors.join(", ");
    if (data.username) return `Username: ${data.username.join(", ")}`;
    if (data.email) return `Email: ${data.email.join(", ")}`;
    if (data.password) return `Password: ${data.password.join(", ")}`;
    return `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

export async function login(
  credentials: LoginCredentials
): Promise<TokenResponse> {
  const res = await fetch(`${API_BASE}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const message = await parseErrorResponse(res);
    throw new Error(message);
  }

  const data: TokenResponse = await res.json();
  setToken(data.access);
  if (data.refresh) {
    setRefreshToken(data.refresh);
  }
  return data;
}

export async function register(
  credentials: SignupCredentials
): Promise<SignupResponse> {
  const res = await fetch(`${API_BASE}/api/face/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const message = await parseErrorResponse(res);
    throw new Error(message);
  }

  return res.json();
}

export async function uploadFaceImage(imageBlob: Blob): Promise<Response> {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const formData = new FormData();
  formData.append("image", imageBlob, "capture.jpg");

  const res = await fetch(`${API_BASE}/api/face/upload/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Session expired. Please log in again.");
  }

  return res;
}
