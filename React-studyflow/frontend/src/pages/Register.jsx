import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { Sparkles, Lock, Mail, User } from "../components/ui/Icons";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
      });
      // After registration, redirect to login
      navigate("/login?registered=true");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.username?.[0] ||
          err.response?.data?.email?.[0] ||
          "Registration failed. Please try again.",
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
            <h1 className="text-2xl font-extrabold text-white">
              Create your account
            </h1>
            <p className="text-slate-400 mt-2">
              Join StudyFlow and start learning smarter
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
              label="Full Name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              leftIcon={<User size={18} />}
              required
              autoComplete="name"
              fullWidth
            />

            <Input
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              leftIcon={<User size={18} />}
              required
              autoComplete="username"
              fullWidth
            />

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
              placeholder="Create a password (min 8 chars)"
              leftIcon={<Lock size={18} />}
              required
              autoComplete="new-password"
              fullWidth
              showPasswordToggle
              hint="At least 8 characters"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              leftIcon={<Lock size={18} />}
              required
              autoComplete="new-password"
              fullWidth
              showPasswordToggle
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-slate-400 text-sm">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Sign in
            </NavLink>
          </p>
        </Card>
      </div>
    </div>
  );
}
