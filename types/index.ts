export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  id?: number;
  username?: string;
  email?: string;
  message?: string;
}

export interface FaceValidationResponse {
  status: boolean;
  message: string;
}

export interface ApiError {
  detail?: string;
  message?: string;
  non_field_errors?: string[];
  username?: string[];
  email?: string[];
  password?: string[];
}
