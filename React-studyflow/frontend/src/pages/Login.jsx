import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Lock, Mail } from "../components/ui/Icons";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const registered = params.get("registered");
    const email = params.get("email");

    if (registered === "true") {
      setSuccess("Registration successful. Please sign in to continue.");
    }

    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await login(formData.email.trim(), formData.password);
      navigate("/");
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.non_field_errors?.[0];
      setError(detail || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-brand bg-fixed">
      <div className="w-full max-w-md">
        <Card variant="strong" padding="lg" className="animate-slide-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-4 bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_18px_rgba(1,169,254,0.3)]">
              <img src="/icons/logo.png" alt="StudyFlow logo" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
            <p className="text-slate-400 mt-2">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm flex items-center gap-2">
                <Lock size={16} aria-hidden="true" />
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-300 text-sm flex items-center gap-2">
                <Mail size={16} aria-hidden="true" />
                {success}
              </div>
            )}

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              leftIcon={<Mail size={18} />}
              required
              autoComplete="email"
              fullWidth
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              leftIcon={<Lock size={18} />}
              required
              autoComplete="current-password"
              fullWidth
              showPasswordToggle
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-sm text-slate-300">Remember me</span>
              </label>
              <NavLink
                to="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Forgot password?
              </NavLink>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Create one
            </NavLink>
          </p>
        </Card>
      </div>
    </div>
  );
}
