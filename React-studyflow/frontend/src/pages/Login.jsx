import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Sparkles, Lock, Mail, User } from "../components/ui/Icons";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData.username, formData.password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Invalid credentials. Please try again.",
      );
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
            <div className="inline-flex items-center justify-center w-16 h-16  rounded-2xl mx-auto mb-4 ">
              <img src="/icons/logo.png" alt="" />
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

        {/* <p className="mt-6 text-center text-slate-500 text-sm">
          Demo credentials:{" "}
          <code className="text-slate-300 bg-slate-800/50 px-2 py-0.5 rounded">
            admin2
          </code>{" "}
          /{" "}
          <code className="text-slate-300 bg-slate-800/50 px-2 py-0.5 rounded">
            admin123
          </code>
        </p> */}
      </div>
    </div>
  );
}
