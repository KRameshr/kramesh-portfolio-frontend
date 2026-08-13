import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import navLinks from "../data/navLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── FLOATING ROUNDED NAVBAR WITH SMOOTH WHOLE BOX HOVER ── */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-6 z-50 px-4 sm:px-6"
      >
        <motion.nav
          whileHover={{ scale: 1.025 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="max-w-7xl mx-auto bg-slate-100/85 backdrop-blur-md border border-gray-200/90 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-blue-300 px-4 sm:px-6 h-20 md:h-24 flex items-center justify-between gap-6 transition-all duration-300"
        >
          {/* ── LOGO WITH HOVER SCALE ── */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <div className="flex gap-1 items-center">
                <div className="w-4 h-4 rounded border-2 border-red-500 bg-red-500/10 transform rotate-3 transition-transform duration-300 group-hover:rotate-12"></div>
                <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-500/15 transform -rotate-6 transition-transform duration-300 group-hover:-rotate-[18deg]"></div>
                <div className="w-4 h-4 rounded border-2 border-yellow-500 bg-yellow-500/10 transform rotate-12 transition-transform duration-300 group-hover:rotate-45"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider uppercase text-black">
                  K.<span className="text-blue-600">Ramesh</span>
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ── DESKTOP NAV LINKS WITH HOVER SCALE ── */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-700">
            {navLinks.map(({ name, path }) => {
              const active = isActive(path);
              return (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={path}
                    className={`transition-all duration-200 no-underline py-1 relative inline-block ${
                      active
                        ? "text-blue-600 font-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-600"
                        : "hover:text-blue-600"
                    }`}
                  >
                    {name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ── DESKTOP CTA BUTTON WITH HOVER SCALE ── */}
          <div className="hidden md:flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-orange-500/20 no-underline inline-block"
              >
                Let's Talk
              </Link>
            </motion.div>
          </div>

          {/* ── MOBILE HAMBURGER BUTTON ── */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
            className="flex md:hidden w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-800 items-center justify-center transition hover:bg-gray-100 cursor-pointer shadow-sm shrink-0"
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
              className="fixed top-0 right-0 bottom-0 z-[9999] w-[80vw] max-w-[280px] bg-slate-50 border-l border-gray-200 flex flex-col shadow-2xl"
            >
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-end p-5 border-b border-gray-200">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-700 border border-gray-200 cursor-pointer hover:bg-gray-100 transition shadow-sm"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mobile Navigation Links & CTA */}
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
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
                        className={`flex items-center px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider no-underline transition ${
                          active
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-700 bg-white border border-gray-200/60 hover:bg-gray-100"
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
                    className="flex items-center justify-center w-full bg-blue-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-full shadow-md transition-all duration-300 no-underline"
                  >
                    Let's Talk
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
