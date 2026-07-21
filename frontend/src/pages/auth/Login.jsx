import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../../components/common/AuthLayout";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { data } =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      login(data);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">

        <h2 className="text-4xl font-bold mb-2">
          Welcome Back
        </h2>

        <p className="text-zinc-500 mb-8">
          Sign in to continue to
          InsightIQ
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                bg-zinc-950
                border
                border-zinc-800
                rounded-xl
                outline-none
                focus:border-violet-600
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                p-4
                bg-zinc-950
                border
                border-zinc-800
                rounded-xl
                outline-none
                focus:border-violet-600
              "
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

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
            "
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <p className="text-zinc-500 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-400"
          >
            Create Account
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}

export default Login;