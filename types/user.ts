// User/Auth Types
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: Date;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  user?: User;
  error?: string;
};
