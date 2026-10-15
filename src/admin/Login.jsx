import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Braces, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import API from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const email = form.email.trim();
    if (!email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await API.post("/auth/login", {
        email,
        password: form.password,
      });
      if (!response.data?.token) {
        setError("Sign in could not be completed. Please try again.");
        return;
      }
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard");
    } catch {
      setError("We couldn't sign you in with those details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login min-h-screen flex items-center justify-center px-4 py-10 sm:px-6">
      <div className="admin-login__glow" aria-hidden="true" />
      <div className="admin-login__content w-full max-w-md">
        <Link to="/" className="admin-login__back">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to portfolio
        </Link>

        <section className="admin-login__card" aria-labelledby="admin-login-title">
          <div className="admin-login__brand">
            <div className="admin-login__mark" aria-hidden="true">
              <Braces size={23} strokeWidth={2.2} />
            </div>
            <p className="admin-login__eyebrow">K. Ramesh · Portfolio</p>
            <h1 id="admin-login-title">Admin sign in</h1>
            <p className="admin-login__description">
              Sign in to manage your portfolio content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login__form">
            <div className="admin-login__field">
              <label htmlFor="admin-email">Email address</label>
              <div className="admin-login__input-wrap">
                <Mail size={17} aria-hidden="true" />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={form.email}
                  onChange={(event) => {
                    setForm({ ...form, email: event.target.value });
                    setError("");
                  }}
                  required
                  maxLength={254}
                  placeholder="Enter your email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "admin-login-error" : undefined}
                />
              </div>
            </div>

            <div className="admin-login__field">
              <label htmlFor="admin-password">Password</label>
              <div className="admin-login__input-wrap">
                <LockKeyhole size={17} aria-hidden="true" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(event) => {
                    setForm({ ...form, password: event.target.value });
                    setError("");
                  }}
                  required
                  placeholder="Enter your password"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "admin-login-error" : undefined}
                />
                <button
                  type="button"
                  className="admin-login__visibility"
                  onClick={() => setShowPass((visible) => !visible)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  aria-pressed={showPass}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p id="admin-login-error" className="admin-login__error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="admin-login__submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading && <span className="admin-login__spinner" aria-hidden="true" />}
              {loading ? "Signing in…" : "Sign in to admin"}
            </button>
          </form>

          <p className="admin-login__secure">
            <LockKeyhole size={14} aria-hidden="true" />
            Restricted to authorized administrators
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
