import { AnimatedBackground } from "@/components/ui/AnimatedBackground/AnimatedBackground";
import { AuthFormCard } from "@/components/ui/AuthFormCard/AuthFormCard";
import { FormInput } from "@/components/ui/FormInput/FormInput";
import { FormButton } from "@/components/ui/FormButton/FormButton";
import { FormDivider } from "@/components/ui/FormDivider/FormDivider";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error: storeError, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [validationError, setValidationError] = useState("");

  const error = validationError || storeError;

  useEffect(() => {
    // Clear errors when component mounts
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");
    clearError();

    // Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setValidationError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (!acceptedTerms) {
      setValidationError("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      // Error is handled by the store
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="w-full h-screen flex bg-[#FEFFEF] justify-center items-center relative overflow-hidden">
      <AnimatedBackground />

      <AuthFormCard
        title="Create Account"
        description="Join UniFlow to manage your educational journey"
      >
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-0">
          <FormInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />

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

          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          <div className="w-full flex flex-row items-start gap-2 mb-3">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-1"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-xs">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md mb-3 text-sm">
              {error}
            </div>
          )}

          <FormButton type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </FormButton>
        </form>

        <FormDivider />

        <div className="text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-accent font-semibold cursor-pointer hover:underline">
            Sign In
          </Link>
        </div>
      </AuthFormCard>
    </div>
  );
}
