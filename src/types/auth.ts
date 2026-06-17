export type UserRole = "USER" | "ADMIN" | "SUPERVISOR" | "GUEST";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  points?: number;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
