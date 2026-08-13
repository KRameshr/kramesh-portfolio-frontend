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

  // Safer name splitting: first word = first name, rest = last name
  const nameParts = (about?.name || "Kuruba Ramesh").trim().split(" ");
  const firstName = nameParts[0] || "Kuruba";
  const lastName = nameParts.slice(1).join(" ") || "Ramesh";

  return (
    <section className="min-h-[80vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-16 relative overflow-hidden bg-transparent text-gray-900">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mt-6 md:mt-12 relative z-10">
        {/* Left Content (Mobile: order-2 -> Second, Desktop: order-1 -> Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-1"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-white border border-gray-200/80 rounded-full px-4 py-2 mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase">
              Available for Work
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-gray-900 uppercase mb-4 leading-none"
          >
            {firstName} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {lastName}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-5 justify-center md:justify-start"
          >
            <div className="h-[1px] w-8 bg-blue-600/50" />
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-blue-600">
              {about?.title || "Full Stack Developer"}
            </p>
            <div className="h-[1px] w-8 bg-blue-600/50 md:hidden" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-sm leading-relaxed mb-8 font-medium max-w-md"
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/projects"
                className="flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 no-underline shadow-md shadow-blue-500/20 hover:shadow-orange-500/20"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 px-6 py-3.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-sm"
              >
                Contact Me <Mail className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-3 justify-center md:justify-start"
          >
            {about?.github && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={about.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 shadow-sm"
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
              </motion.a>
            )}
            {about?.linkedin && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={about.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 shadow-sm"
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
              </motion.a>
            )}
            {about?.email && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${about.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Right — Photo Section with Hover Scale Animation */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center items-center order-1 md:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-3xl scale-105" />
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-96 lg:h-[28rem] xl:w-[400px] xl:h-[500px] rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white">
              <img
                src={about?.image_url || profileBg}
                alt="Kuruba Ramesh"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Badge 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-lg pointer-events-none"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
                IIT Roorkee
              </p>
              <p className="text-xs font-black uppercase tracking-tight text-gray-900">
                PG Certified
              </p>
            </motion.div>

            {/* Badge 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white border border-blue-100 rounded-2xl px-4 py-3 shadow-lg pointer-events-none"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-600">
                Full Stack
              </p>
              <p className="text-xs font-black uppercase tracking-tight text-gray-900">
                Developer
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 animate-bounce z-20">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
          Scroll
        </span>
        <div className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center shadow-sm">
          <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
