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
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  if (certifications.length === 0) return null;

  return (
    <FadeInSection>
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-12">
            <Award className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Certification
            </h2>
            <div className="flex-1 h-[1px] bg-white/[0.05]" />
            {certifications.length > 1 && (
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                {currentIndex + 1} / {certifications.length}
              </span>
            )}
          </div>

          {/* Carousel */}
          {/* Carousel */}
          <div className="relative">
            {/* Desktop Navigation */}
            {certifications.length > 1 && (
              <>
                <button
                  onClick={prevCert}
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.07] items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextCert}
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.07] items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/30 transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            <div className="sm:px-14">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center bg-white/[0.03] border border-white/[0.03] rounded-2xl sm:rounded-3xl p-4 sm:p-8"
                >
                  {/* Image */}
                  <div className="lg:col-span-5 relative group">
                    <div className="absolute inset-0 bg-indigo-600/10 rounded-2xl blur-2xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0b0f19] shadow-2xl hover:border-indigo-500/30 transition-all duration-300">
                      {currentCert?.image_url ? (
                        <img
                          src={currentCert.image_url}
                          alt={currentCert.certificate_name}
                          className="w-full max-h-[220px] sm:max-h-[350px] object-contain block mx-auto group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center">
                          <Award className="w-12 h-12 text-indigo-500/30" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 break-words">
                            {currentCert?.institution_name}
                          </p>

                          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-400">
                              Verified · {currentCert?.end_date}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-white font-black uppercase text-lg sm:text-xl lg:text-2xl tracking-tight break-words mb-2">
                          {currentCert?.certificate_name}
                        </h3>

                        {currentCert?.start_date && (
                          <p className="text-indigo-300/80 font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
                            {currentCert.start_date} –{" "}
                            {currentCert.end_date || "Present"}
                          </p>
                        )}

                        {currentCert?.description && (
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            {currentCert.description}
                          </p>
                        )}

                        {currentCert?.certificate_id && (
                          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-600 break-all">
                            ID: {currentCert.certificate_id}
                          </p>
                        )}
                      </div>

                      {currentCert?.credential_url && (
                        <div className="pt-4 border-t border-white/[0.05] mt-4">
                          <a
                            href={currentCert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-fit bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                          >
                            View Credentials
                            <ArrowRight className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                    </div>

                    {currentCert?.skills && (
                      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-1 w-3 bg-indigo-500 rounded-full" />
                          <h4 className="text-slate-300 font-black uppercase text-[10px] tracking-[0.2em]">
                            Core Expertise
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {currentCert.skills.split(",").map((skill, index) => (
                            <span
                              key={index}
                              className="max-w-full break-words text-[10px] font-bold tracking-wide text-slate-300 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all duration-150"
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
            </div>

            {/* Mobile Navigation */}
            {certifications.length > 1 && (
              <div className="flex sm:hidden justify-center gap-4 mt-5">
                <button
                  onClick={prevCert}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextCert}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Dots */}
          {certifications.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-indigo-400 w-6" : "bg-white/[0.15] w-2"}`}
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
