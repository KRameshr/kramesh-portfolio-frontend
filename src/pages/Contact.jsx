import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

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
      const response = await API.post("/contact", form);
      console.log(" Server Response:", response.data);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(" Full Frontend Error Object:", err);
      console.error(" Response Server Error Context:", err.response?.data);
      const backendErrorMessage =
        err.response?.data?.message || err.response?.data?.error;
      setError(
        backendErrorMessage || "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "bg-white border border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors duration-200 shadow-sm";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/90 text-gray-900 font-sans relative overflow-x-hidden">
      {/* Decorative gradient blobs — bottom-left and top-right, distinct from other pages */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] bg-orange-400/[0.11] rounded-full blur-3xl" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-500/[0.10] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-gray-900 mb-4">
            Contact <span className="text-blue-600">Me</span>
          </h1>
          <p className="text-gray-600 text-sm max-w-xl">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-slate-100/70 border border-gray-200/90 hover:border-orange-300 rounded-2xl p-6 transition-colors duration-300 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Email
                </p>
              </div>
              <a
                href="mailto:krameshr348@gmail.com"
                className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors no-underline"
              >
                krameshr348@gmail.com
              </a>
            </div>

            <div className="bg-slate-100/70 border border-gray-200/90 hover:border-orange-300 rounded-2xl p-6 transition-colors duration-300 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Phone
                </p>
              </div>
              <a
                href="tel:+918919003200"
                className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors no-underline"
              >
                +91 8919003200
              </a>
            </div>

            <div className="bg-slate-100/70 border border-gray-200/90 hover:border-orange-300 rounded-2xl p-6 transition-colors duration-300 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Location
                </p>
              </div>
              <p className="text-sm font-bold text-gray-900 m-0">
                Near Bagalur, Bengaluru, India
              </p>
            </div>

            {/* Status Indicator */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-emerald-700">
                  Available for Work
                </span>
              </div>
              <p className="text-sm text-emerald-800/80 m-0">
                Currently open to freelance projects and full-time
                opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right — Contact Form + Map Block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-100/70 border border-gray-200/90 rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-center shadow-sm">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 gap-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-gray-900 font-black uppercase text-lg tracking-tight">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 text-sm text-center">
                      Thanks for reaching out. I'll get back to you soon!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSuccess(false)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-colors duration-300 cursor-pointer border-none shadow-md shadow-blue-600/20 hover:shadow-orange-500/20"
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className={inputClasses}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        className={inputClasses}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell me about your project..."
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    {/* Centered Submit Button */}
                    <div className="flex justify-center w-full mt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-colors duration-300 no-underline shadow-md shadow-blue-600/20 hover:shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
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
                      </motion.button>
                    </div>

                    {/* Interactive Location Map Section */}
                    <div className="bg-white border border-gray-200/90 rounded-xl p-4 flex flex-col gap-3 mt-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-500">
                          Interactive Location Map — Near Bagalur, Bengaluru
                        </span>
                      </div>
                      <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                        <iframe
                          title="Bagalur Region Map"
                          src="https://www.openstreetmap.org/export/embed.html?bbox=77.6300%2C13.1000%2C77.7100%2C13.1600&amp;layer=mapnik&amp;marker=13.1333%2C77.6750"
                          className="w-full h-full border-none pointer-events-auto"
                        />
                      </div>
                    </div>

                    {/* Error Handling */}
                    {error && (
                      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-red-500 m-0">
                        {error}
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
