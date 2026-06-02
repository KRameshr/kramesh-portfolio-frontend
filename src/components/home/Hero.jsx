import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import profileBg from "../../assets/profile.jpg";
import API from "../../api/axios";

const Hero = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    API.get("/about")
      .then((res) => setAbout(res.data))
      .catch(console.error);
  }, []);

  return (
    <section className="min-h-[80vh] sm:min-h-screen flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-16 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mt-6 md:mt-12">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-1"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] rounded-full px-4 py-2 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              Available for Work
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase mb-4 leading-none"
          >
            {about?.name?.split(" ")[0] || "Kuruba"}{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {about?.name?.split(" ")[1] || "Ramesh"}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-5 justify-center md:justify-start"
          >
            <div className="h-[1px] w-8 bg-indigo-500/50" />
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-indigo-400">
              {about?.title || "Full Stack Developer"}
            </p>
            <div className="h-[1px] w-8 bg-indigo-500/50 md:hidden" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-sm leading-relaxed mb-8 font-medium max-w-md"
          >
            {about?.bio ||
              "Passionate developer building modern web applications with the MERN stack."}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 mb-8 justify-center md:justify-start"
          >
            <Link
              to="/projects"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              View Projects <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline"
            >
              Contact Me <Mail className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 justify-center md:justify-start"
          >
            {about?.github && (
              <a
                href={about.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}
            {about?.linkedin && (
              <a
                href={about.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
            {about?.email && (
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${about.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Right — Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center items-center order-1 md:order-2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-2xl scale-110" />
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-96 lg:h-[28rem] xl:w-[420px] xl:h-[520px] rounded-3xl overflow-hidden border border-white/[0.2]">
              <img
                src={about?.image_url || profileBg}
                alt="Kuruba Ramesh"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-[#0b0f19] border border-white/[0.07] rounded-xl px-3 py-2"
            >
              <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-500">
                IIT Roorkee
              </p>
              <p className="text-[10px] font-black uppercase tracking-tight text-white">
                PG Certified
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-indigo-600/20 border border-indigo-500/30 rounded-xl px-3 py-2"
            >
              <p className="text-[8px] font-black uppercase tracking-[0.25em] text-indigo-400">
                Full Stack
              </p>
              <p className="text-[10px] font-black uppercase tracking-tight text-white">
                Developer
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce z-20">
        <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500/80">
          Scroll
        </span>
        <div className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center backdrop-blur-sm">
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
