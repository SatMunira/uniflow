import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { AuthFormCard } from "@/components/ui/AuthFormCard/AuthFormCard";
import { FormInput } from "@/components/ui/FormInput/FormInput";
import { FormButton } from "@/components/ui/FormButton/FormButton";
import { FormDivider } from "@/components/ui/FormDivider/FormDivider";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error: storeError, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [validationError, setValidationError] = useState("");

  const error = validationError || storeError;

  useEffect(() => {
  return () => {
    clearError();
  };
}, [clearError]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");
    clearError();

    // Validation
    if (!formData.email || !formData.password) {
      setValidationError("Please fill in all fields");
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate("/", { replace: true });
    } catch (err) {
      // Error is handled by the store
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="w-full h-screen flex bg-[#FEFFEF] justify-center items-center relative overflow-hidden">
      <AnimatedBackground />

      <AuthFormCard
        title="UniFlow"
        description="Manage your educational process: schedule, projects, materials & more"
      >
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-0">
          <FormInput
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className="w-full flex flex-row justify-between items-center mb-3">
            <div className="text-xs flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <span className="text-xs cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md mb-3 text-sm">
              {error}
            </div>
          )}

          <FormButton type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </FormButton>
        </form>

        <FormDivider />

        <div className="text-sm">
          <span className="text-gray-600">No Account? </span>
          <Link
            to="/register"
            className="text-accent font-semibold cursor-pointer hover:underline"
          >
            Registration
          </Link>
        </div>
      </AuthFormCard>
    </div>
  );
}
