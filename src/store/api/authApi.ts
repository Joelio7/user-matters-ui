import { apiClient } from "./apiClient";
import {
  AuthResponse,
  LoginCredentials,
  SignupData,
} from "../../types/auth";
import { User } from "../../types/user";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  signup: async (userData: SignupData): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/signup", userData);
  },

  getProfile: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me");
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return apiClient.put<User>("/auth/profile", userData);
  },
};
