import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import navLinks from "../data/navLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const menuButton = menuButtonRef.current;
    closeButtonRef.current?.focus();
    const handleMenuKeydown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleMenuKeydown);
    return () => {
      window.removeEventListener("keydown", handleMenuKeydown);
      menuButton?.focus();
    };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── FLOATING ROUNDED NAVBAR WITH SMOOTH WHOLE BOX HOVER ── */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="portfolio-nav-shell sticky top-0 z-50 px-4 sm:px-6"
      >
        <motion.nav
          className="portfolio-nav max-w-7xl mx-auto bg-white/95 backdrop-blur border-b border-gray-200 px-4 sm:px-6 h-16 md:h-[4.5rem] flex items-center justify-between gap-6"
        >
          {/* ── LOGO WITH HOVER SCALE ── */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <span className="text-base font-semibold tracking-tight text-gray-950">
                <span className="text-white">K.</span><span className="text-orange-400">Ramesh</span>
              </span>
            </Link>
          </motion.div>

          {/* ── DESKTOP NAV LINKS WITH HOVER SCALE ── */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-medium text-gray-700">
            {navLinks.map(({ name, path }) => {
              const active = isActive(path);
              return (
                <motion.div key={name}>
                  <Link
                    to={path}
                    aria-current={active ? "page" : undefined}
                    className={`transition-colors duration-200 no-underline py-2 relative inline-block ${
                      active
                        ? "text-blue-700 font-semibold"
                        : "hover:text-blue-700"
                    }`}
                  >
                    {name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* ── DESKTOP CTA BUTTON WITH HOVER SCALE ── */}
          <div className="hidden md:flex items-center">
            <motion.div>
              <Link
                to="/contact"
                className="portfolio-button-primary text-sm font-semibold px-5 py-2.5 transition-colors no-underline inline-block"
              >
                Let's Talk
              </Link>
            </motion.div>
          </div>

          {/* ── MOBILE HAMBURGER BUTTON ── */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="flex lg:hidden w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-800 items-center justify-center transition hover:bg-gray-100 cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        </motion.nav>
      </motion.div>

      {/* ── MOBILE BACKDROP & SLIDE-IN SIDEBAR (WITH FRAMER MOTION) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            />

            {/* Slide-In Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="portfolio-mobile-panel fixed top-0 right-0 bottom-0 z-[9999] w-[80vw] max-w-[300px] border-l flex flex-col shadow-2xl"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-end p-5 border-b border-gray-200">
                <button
                  ref={closeButtonRef}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-700 border border-gray-200 cursor-pointer hover:bg-gray-100 transition shadow-sm"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mobile Navigation Links & CTA */}
              <nav id="mobile-navigation" aria-label="Mobile navigation links" className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {navLinks.map(({ name, path }, index) => {
                  const active = isActive(path);
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        to={path}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold tracking-normal no-underline transition ${
                          active
                          ? "bg-orange-500 text-gray-950"
                          : "text-gray-100 bg-gray-800 border border-gray-700 hover:bg-gray-700"
                        }`}
                      >
                        {name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 mt-auto"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="portfolio-button-primary flex items-center justify-center w-full py-3 text-sm font-semibold transition-colors no-underline"
                  >
                    Let's Talk
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
