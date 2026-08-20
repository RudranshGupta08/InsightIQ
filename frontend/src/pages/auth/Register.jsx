import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../../components/common/AuthLayout";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // Store user and JWT
      login(data);

      toast.success("Account created successfully!");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <h2 className="text-4xl font-bold mb-2">
          Create Account
        </h2>

        <p className="text-zinc-500 mb-8">
          Create your account to get started with InsightIQ
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>

            <label className="block mb-2 text-sm">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="name"
              className="
                w-full
                p-4
                bg-zinc-950
                border
                border-zinc-800
                rounded-xl
                outline-none
                focus:border-violet-600
                transition
              "
            />

          </div>

          {/* Email */}

          <div>

            <label className="block mb-2 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              className="
                w-full
                p-4
                bg-zinc-950
                border
                border-zinc-800
                rounded-xl
                outline-none
                focus:border-violet-600
                transition
              "
            />

          </div>

          {/* Password */}

          <div>

            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
              className="
                w-full
                p-4
                bg-zinc-950
                border
                border-zinc-800
                rounded-xl
                outline-none
                focus:border-violet-600
                transition
              "
            />

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block mb-2 text-sm">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              autoComplete="new-password"
              className="
                w-full
                p-4
                bg-zinc-950
                border
                border-zinc-800
                rounded-xl
                outline-none
                focus:border-violet-600
                transition
              "
            />

          </div>

          {/* Error */}

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              p-4
              rounded-xl
              bg-violet-700
              hover:bg-violet-600
              transition
              font-medium
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login Link */}

        <p className="text-zinc-500 mt-8">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-violet-400 hover:text-violet-300 transition"
          >
            Sign In
          </Link>

        </p>

      </div>

    </AuthLayout>
  );
}

export default Register;