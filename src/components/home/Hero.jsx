import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, ChevronDown } from "lucide-react";
import profileBg from "../../assets/profile.jpg";
import API from "../../api/axios";
import { getContactEmail } from "../../utils/contactEmail";

const Hero = () => {
  const [about, setAbout] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const revealOpacity = useTransform(scrollYProgress, [0, 0.55], [0.12, 0.38]);

  useEffect(() => {
    API.get("/about")
      .then((res) => {
        if (res.data) setAbout(res.data);
        else setLoadError(true);
      })
      .catch(() => setLoadError(true));
  }, []);

  const email = getContactEmail(about?.email);

  return (
    <section ref={heroRef} className="portfolio-hero min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
      <div className="hero-visual-layer" aria-hidden="true">
        <div className="hero-visual-card hero-code-card hero-float-left">
          <div className="hero-visual-topbar"><span /><span /><span /><b>app.jsx</b></div>
          <div className="hero-code-line"><i>01</i><span><em>const</em> app = <strong>() =&gt;</strong> &#123;</span></div>
          <div className="hero-code-line"><i>02</i><span>&nbsp;&nbsp;<em>return</em> <strong>&lt;Portfolio /&gt;</strong></span></div>
          <div className="hero-code-line"><i>03</i><span>&#125;</span></div>
        </div>

        <div className="hero-visual-card hero-ui-card hero-float-right">
          <div className="hero-ui-head"><span>Responsive UI</span><span>↗</span></div>
          <div className="hero-ui-layout"><i /><div><b /><b /><b /></div></div>
          <div className="hero-ui-foot"><i /><i /><i /></div>
        </div>

        <div className="hero-visual-card hero-api-card hero-float-right">
          <div className="hero-api-icon">&#123; &#125;</div>
          <div><span>API / DATABASE</span><b>Connected</b></div>
          <i className="hero-api-status" />
          <div className="hero-api-path">GET&nbsp; /api/projects</div>
        </div>

        <motion.div className="hero-visual-card hero-stack-card hero-float-left" style={{ opacity: prefersReducedMotion ? 0.24 : revealOpacity }}>
          <span className="hero-visual-label">TECH STACK</span>
          <div className="hero-stack-chips"><b>React</b><b>Node.js</b><b>MongoDB</b></div>
        </motion.div>

        <motion.div className="hero-visual-card hero-analytics-card hero-float-right" style={{ opacity: prefersReducedMotion ? 0.24 : revealOpacity }}>
          <div className="hero-analytics-head"><span>Product insights</span><b>+24%</b></div>
          <div className="hero-analytics-chart"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="hero-analytics-foot"><span>Performance</span><b>98.6</b></div>
        </motion.div>
      </div>
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        {/* Left Content (Mobile: order-2 -> Second, Desktop: order-1 -> Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-1"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-5"
          >
            {about?.name || (loadError ? "Profile unavailable" : "Loading profile")}
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hero-role flex items-center gap-3 mb-5 justify-center md:justify-start"
          >
            <div className="h-px w-8 bg-blue-300/40" />
            <p className="font-semibold uppercase">
              {about?.title || (loadError ? "Profile unavailable" : "")}
            </p>
            <div className="h-px w-8 bg-blue-300/40 md:hidden" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hero-bio mb-8"
          >
            {about?.bio || (loadError ? "Profile information could not be loaded." : "")}
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
                className="portfolio-button-primary flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors no-underline"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.a
                href={`mailto:${email}`}
                aria-label="Contact me by email"
                className="portfolio-button-secondary flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors no-underline"
              >
                Contact Me <Mail className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="hero-social flex items-center gap-3 justify-center md:justify-start"
          >
            {about?.github && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={about.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-orange-800 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 shadow-sm"
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
                aria-label="LinkedIn profile (opens in a new tab)"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-orange-800 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 shadow-sm"
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
            {email && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`mailto:${email}`}
                aria-label="Send email"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-orange-800 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 shadow-sm"
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
          <motion.div className="relative">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-96 lg:h-[28rem] xl:w-[400px] xl:h-[500px] hero-portrait overflow-hidden bg-slate-800">
              <img
                src={about?.image_url || profileBg}
                alt={about?.name ? `Portrait of ${about.name}` : "Portfolio portrait"}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 animate-bounce z-20">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Scroll
        </span>
        <div className="w-7 h-7 rounded-full border border-white/25 bg-white/5 flex items-center justify-center">
          <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
