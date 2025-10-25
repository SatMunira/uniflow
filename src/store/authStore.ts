import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, RegisterDTO, LoginDTO } from "@/types/auth";
import { authApi } from "@/api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (data: RegisterDTO) => Promise<void>;
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      register: async (data: RegisterDTO) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authApi.register(data);
          set({
            user,
            isLoading: false,
            error: null
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Registration failed";
          set({
            error: errorMessage,
            isLoading: false,
            user: null
          });
          throw error;
        }
      },

      login: async (data: LoginDTO) => {
        set({ isLoading: true, error: null });
        try {
          const responseToken = await authApi.login(data);
          set({
            token: responseToken.token,
            isLoading: false,
            error: null
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Login failed";
          set({
            error: errorMessage,
            isLoading: false,
            user: null
          });
          throw error;
        }
      },

      logout: () => {
        // Clear all cookies
        // clearAllCookies();

        // Clear localStorage (handled by persist middleware)
        set({
          user: null,
          token: null,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User | null) => {
        set({ user });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token
      }),
    }
  )
);
