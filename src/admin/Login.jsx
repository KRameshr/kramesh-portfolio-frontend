import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, Braces } from "lucide-react";
import API from "../api/axios";
import heroBg from "../assets/hero-bg4.jpg";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Graphic Textures */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card Core Wrapper */}
      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center mb-3">
            <Braces className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-black uppercase text-white tracking-tight">
            Admin <span className="text-indigo-400">Panel</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">
            K.Ramesh Portfolio
          </p>
        </div>

        {/* Dynamic Interactive Card Container */}
        <div className="bg-white/[0.03] border border-white/[0.06] backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Form Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="admin@email.com"
                  className="w-full bg-white/[0.04] border border-white/[0.07] focus:border-indigo-500/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Form Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.07] focus:border-indigo-500/50 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5 rounded transition-colors cursor-pointer"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3">
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-red-400 text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Security Trigger Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-4 px-6 sm:py-5 sm:px-4 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer border-none shadow-[0_4px_20px_rgba(99,102,241,0.25)] mt-2 active:scale-[0.98] w-max mx-auto sm:w-full"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login to Admin"
              )}
            </button>
          </form>
        </div>

        {/* Access Footer Sub-text */}
        <p className="text-center text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 mt-6">
          Protected — Admin Only
        </p>
      </div>
    </div>
  );
};

export default Login;
