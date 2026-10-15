import { useEffect, useState } from "react";
import { Award, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFailedFor, setImageFailedFor] = useState(null);

  useEffect(() => {
    API.get("/certifications")
      .then((res) => setCertifications(res.data))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  const prevCert = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i === 0 ? certifications.length - 1 : i - 1));
  };

  const nextCert = () => {
    setDirection(1);
    setCurrentIndex((i) => (i === certifications.length - 1 ? 0 : i + 1));
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30 }),
  };

  if (loading) return <p role="status" className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500">Loading certifications…</p>;
  if (loadError) {
    return <p role="alert" className="mx-auto max-w-6xl px-4 py-8 text-sm text-red-800">Certifications could not be loaded.</p>;
  }
  if (certifications.length === 0) return null;

  const currentCert = certifications[currentIndex];

  return (
    <FadeInSection>
      <section className="portfolio-section portfolio-section-light relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-800">
              <Award className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="portfolio-section-heading text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Certifications
            </h2>
            <div className="h-px flex-1 bg-gray-300/80" />
            {certifications.length > 1 && (
              <span className="text-xs font-semibold tracking-wide text-gray-500 tabular-nums">
                {currentIndex + 1} / {certifications.length}
              </span>
            )}
          </div>

          <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_18px_55px_rgba(37,38,43,0.08)] ring-1 ring-black/[0.04]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="certification-slide grid w-full min-w-0 grid-cols-1 lg:min-h-[520px]"
              >
                <div className="group flex min-w-0 items-center justify-center bg-[#eeece8] p-4 sm:p-6 lg:p-8">
                  <div className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-white p-3 shadow-[0_12px_32px_rgba(37,38,43,0.12)] sm:p-5">
                    {currentCert?.image_url && imageFailedFor !== currentIndex ? (
                      <img
                        src={currentCert.image_url}
                        alt={currentCert.certificate_name}
                        onError={() => setImageFailedFor(currentIndex)}
                        className="block h-[220px] w-full object-contain sm:h-[300px] lg:h-[380px]"
                      />
                    ) : (
                      <div className="flex h-[220px] w-full flex-col items-center justify-center gap-3 text-center sm:h-[300px] lg:h-[380px]">
                        <Award className="h-14 w-14 text-orange-800/25" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-500">Certificate preview unavailable</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex w-full min-w-0 flex-col justify-center px-5 py-7 sm:px-7 sm:py-9 lg:px-8 lg:py-10">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    {currentCert?.institution_name && (
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-orange-800">
                        {currentCert.institution_name}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-800 ring-1 ring-emerald-700/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Verified
                    </span>
                  </div>

                  <h3 className="mb-4 min-w-0 text-2xl font-bold leading-tight tracking-[-0.035em] text-gray-950 sm:text-3xl">
                    {currentCert?.certificate_name}
                  </h3>

                  {currentCert?.start_date && (
                    <p className="mb-5 text-sm font-medium text-gray-500">
                      {currentCert.start_date} – {currentCert.end_date || "Present"}
                    </p>
                  )}

                  {currentCert?.description && (
                    <p className="mb-6 text-sm leading-7 text-gray-600 sm:text-base">
                      {currentCert.description}
                    </p>
                  )}

                  {currentCert?.certificate_id && (
                    <p className="mb-7 min-w-0 text-xs text-gray-500">
                      <span className="mr-2 font-semibold uppercase tracking-[0.12em] text-gray-400">Credential ID</span>
                      <span className="break-all font-mono text-gray-700">{currentCert.certificate_id}</span>
                    </p>
                  )}

                  {currentCert?.skills && (
                    <div className="mb-7">
                      <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">Core expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentCert.skills.split(",").map((skill, index) => (
                          <span key={index} className="rounded-full bg-[#f4f4f2] px-3 py-1.5 text-xs font-medium text-gray-700 ring-1 ring-gray-900/[0.06]">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentCert?.credential_url && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={currentCert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-button-primary inline-flex w-fit max-w-full flex-none items-center justify-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-semibold no-underline"
                    >
                      View Credentials
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {certifications.length > 1 && (
              <div className="flex items-center justify-between gap-4 border-t border-gray-100 px-4 py-4 sm:px-7">
                <button
                  onClick={prevCert}
                  aria-label="Previous certificate"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-orange-300 hover:text-orange-800 focus-visible:outline-orange-700"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex items-center justify-center gap-2" aria-label="Certification pagination">
                  {certifications.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === currentIndex ? "true" : undefined}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-orange-700 ${
                        i === currentIndex
                          ? "w-8 bg-orange-800"
                          : "w-2.5 bg-gray-300 hover:bg-orange-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextCert}
                  aria-label="Next certificate"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-orange-300 hover:text-orange-800 focus-visible:outline-orange-700"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default Certifications;
