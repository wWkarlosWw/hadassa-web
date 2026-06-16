export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  DONAR: "/dashboard/donar",
  DESCUENTOS: "/dashboard/descuentos",
  ACTIVIDADES: "/dashboard/actividades",
} as const;

export const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_data",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
