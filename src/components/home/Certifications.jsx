import { useEffect, useState } from "react";
import { Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    API.get("/certifications")
      .then((res) => setCertifications(res.data))
      .catch(console.error);
  }, []);

  const prevCert = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i === 0 ? certifications.length - 1 : i - 1));
  };

  const nextCert = () => {
    setDirection(1);
    setCurrentIndex((i) => (i === certifications.length - 1 ? 0 : i + 1));
  };

  const currentCert = certifications[currentIndex];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
  };

  if (certifications.length === 0) return null;

  return (
    <FadeInSection>
      <section className="min-h-[80vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative overflow-hidden bg-transparent text-gray-900">
        <div className="max-w-6xl w-full mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
              Certifications
            </h2>
            <div className="flex-1 h-[1px] bg-gray-200" />
            {certifications.length > 1 && (
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                {currentIndex + 1} / {certifications.length}
              </span>
            )}
          </div>

          {/* MAIN CONTAINER CARD */}
          <div className="relative bg-slate-100/70 border border-gray-200/90 rounded-[1.75rem] sm:rounded-[2.5rem] p-4 sm:p-10 shadow-xl shadow-gray-200/50">
            {/* Desktop Navigation Arrows */}
            {certifications.length > 1 && (
              <>
                <button
                  onClick={prevCert}
                  aria-label="Previous Certificate"
                  className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white border border-gray-200 items-center justify-center text-gray-700 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextCert}
                  aria-label="Next Certificate"
                  className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-white border border-gray-200 items-center justify-center text-gray-700 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Carousel Content */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center"
              >
                {/* Left: Certificate Image (Increased Height & Size) */}
                <div className="lg:col-span-6 relative group flex justify-center">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 bg-slate-900 shadow-md">
                    {currentCert?.image_url ? (
                      <div className="overflow-hidden p-2 flex items-center justify-center">
                        <img
                          src={currentCert.image_url}
                          alt={currentCert.certificate_name}
                          className="w-full max-h-[360px] sm:max-h-[460px] object-contain block mx-auto rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-80 flex items-center justify-center">
                        <Award className="w-12 h-12 text-blue-500/30" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Certificate Info (Two Separate Cards Layout restored) */}
                <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                  {/* Top Info Card */}
                  <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-7 flex flex-col justify-between">
                    <div>
                      {/* Institution & Verified Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                          {currentCert?.institution_name}
                        </span>

                        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700">
                            Verified{" "}
                            {currentCert?.end_date
                              ? `· ${currentCert.end_date}`
                              : ""}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Name */}
                      <h3 className="text-gray-900 font-black uppercase text-lg sm:text-2xl tracking-tight mb-2">
                        {currentCert?.certificate_name}
                      </h3>

                      {/* Dates */}
                      {currentCert?.start_date && (
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-3">
                          {currentCert.start_date} –{" "}
                          {currentCert.end_date || "Present"}
                        </p>
                      )}

                      {/* Description */}
                      {currentCert?.description && (
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                          {currentCert.description}
                        </p>
                      )}

                      {/* Certificate ID */}
                      {currentCert?.certificate_id && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          ID:{" "}
                          <span className="text-gray-700 font-mono">
                            {currentCert.certificate_id}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* View Credentials Button (Blue normal, Orange on Hover) */}
                    {currentCert?.credential_url && (
                      <div className="pt-5 sm:pt-8 border-t border-gray-200 mt-4 sm:mt-5">
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={currentCert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full sm:w-fit bg-blue-600 hover:bg-orange-500 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 no-underline shadow-md shadow-blue-600/20 hover:shadow-orange-500/20 cursor-pointer"
                        >
                          View Credentials
                          <ArrowRight className="w-3 h-3" />
                        </motion.a>
                      </div>
                    )}
                  </div>

                  {/* Bottom Core Expertise Card */}
                  {currentCert?.skills && (
                    <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-1.5 w-3 bg-blue-600 rounded-full" />
                        <h4 className="text-gray-800 font-black uppercase text-[10px] tracking-[0.2em]">
                          Core Expertise
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {currentCert.skills.split(",").map((skill, index) => (
                          <span
                            key={index}
                            className="text-[9px] sm:text-[10px] font-bold tracking-wide text-blue-600 bg-blue-50/60 border border-blue-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-5 sm:py-3 hover:bg-orange-500 hover:text-white transition-all duration-200"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Buttons */}
            {certifications.length > 1 && (
              <div className="flex sm:hidden justify-center gap-4 mt-6">
                <button
                  onClick={prevCert}
                  className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextCert}
                  className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Dots Pagination */}
          {certifications.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-2"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </FadeInSection>
  );
};

export default Certifications;
