import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, Globe } from "lucide-react";
import API from "../api/axios";
import heroBg from "../assets/hero-bg6.jpg";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Fire the request
      const response = await API.post("/contact", form);
      console.log(" Server Response:", response.data);

      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      // 2. Log the exact failure object to your browser console window
      console.error(" Full Frontend Error Object:", err);
      console.error(" Response Server Error Context:", err.response?.data);

      // 3. Render the precise backend reason to the user screen if available
      const backendErrorMessage =
        err.response?.data?.message || err.response?.data?.error;
      setError(
        backendErrorMessage || "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden">
      {/* Background Shapes */}
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                Get In Touch
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white mb-4">
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Me
              </span>
            </h1>
            <p className="text-slate-500 text-sm max-w-xl">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Left — Contact Info Cards ── */}
            <div className="flex flex-col gap-4">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Email
                  </p>
                </div>
                <a
                  href="mailto:krameshr348@gmail.com"
                  className="text-sm font-bold text-white hover:text-indigo-400 transition-colors no-underline"
                >
                  krameshr348@gmail.com
                </a>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Phone
                  </p>
                </div>
                <a
                  href="tel:+918919003200"
                  className="text-sm font-bold text-white hover:text-indigo-400 transition-colors no-underline"
                >
                  +91 8919003200
                </a>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Location
                  </p>
                </div>
                <p className="text-sm font-bold text-white m-0">
                  Near Bagalur, Bengaluru, India
                </p>
              </div>

              {/* Status Indicator */}
              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    Available for Work
                  </span>
                </div>
                <p className="text-sm text-slate-400 m-0">
                  Currently open to freelance projects and full-time
                  opportunities.
                </p>
              </div>
            </div>

            {/* ── Right — Contact Form + Map Block ── */}
            <div className="lg:col-span-2">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-center">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                    <h3 className="text-white font-black uppercase text-lg tracking-tight">
                      Message Sent!
                    </h3>
                    <p className="text-slate-500 text-sm text-center">
                      Thanks for reaching out. I'll get back to you soon!
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer border-none"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="bg-white/[0.04] border border-white/[0.07] focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="bg-white/[0.04] border border-white/[0.07] focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        className="bg-white/[0.04] border border-white/[0.07] focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell me about your project..."
                        className="bg-white/[0.04] border border-white/[0.07] focus:border-indigo-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Centered Small Dynamic Submit Button */}
                    <div className="flex justify-center w-full mt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                      >
                        {loading ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* ── Interactive Location Map Section (Repositioned After Input Fields) ── */}
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex flex-col gap-3 mt-2">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                          Interactive Location Map — Near Bagalur, Bengaluru
                        </span>
                      </div>
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-white/[0.05] grayscale contrast-[1.1] invert-[0.93]">
                        <iframe
                          title="Bagalur Region Map"
                          src="https://www.openstreetmap.org/export/embed.html?bbox=77.6300%2C13.1000%2C77.7100%2C13.1600&amp;layer=mapnik&amp;marker=13.1333%2C77.6750"
                          className="w-full h-full border-none pointer-events-auto"
                        />
                      </div>
                    </div>

                    {/* Error Handling */}
                    {error && (
                      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-red-400 m-0">
                        {error}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
