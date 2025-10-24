export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}