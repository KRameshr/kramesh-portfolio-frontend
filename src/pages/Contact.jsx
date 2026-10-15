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
    if (loading) return;

    const submission = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()]),
    );
    if (!submission.name || !submission.email || !submission.message) {
      setError("Please complete your name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.post("/contact", submission);
      if (response.status !== 201) {
        throw new Error("Contact request was not accepted");
      }
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const status = err.response?.status;
      const serverMessage = err.response?.data?.message;
      setError(
        status === 400 || status === 429 || status === 503
          ? serverMessage || "Please check your details and try again."
          : "We couldn't send your message right now. Please try again later or use the email link.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "bg-white border border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors duration-200 shadow-sm";

  return (
    <main className="public-page min-h-screen bg-white text-gray-900">
      <div className="pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-950 mb-4">
            Contact
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
            <div className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-colors">
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

            <div className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-colors">
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

            <div className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-5 transition-colors">
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
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-8 h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 gap-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-gray-900 font-black uppercase text-lg tracking-tight">
                      Message Accepted
                    </h3>
                    <p className="text-gray-500 text-sm text-center">
                      Your message was accepted for delivery. Thanks for reaching out!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSuccess(false)}
                      className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer border-none"
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
                        <label htmlFor="contact-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          maxLength={120}
                          placeholder="Your name"
                          className={inputClasses}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          maxLength={254}
                          placeholder="your@email.com"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        maxLength={200}
                        placeholder="What is this about?"
                        className={inputClasses}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        maxLength={10000}
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
                        className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors no-underline disabled:opacity-70 disabled:cursor-not-allowed"
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
                      <p role="alert" className="text-sm text-red-700 m-0">
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
    </main>
  );
};

export default Contact;
