import React from "react";
import { Link } from "react-router-dom";
import { Braces } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="relative z-10 w-full border-t border-white/[0.08] bg-black">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-0 sm:h-[98px] flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-500/20">
            <Braces className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-black uppercase tracking-tight text-white">
              K.<span className="text-indigo-400">Ramesh</span>
            </span>

            <span className="mt-[2px] text-[7px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Full Stack Developer
            </span>
          </div>
        </Link>

        {/* Copyright */}
        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-slate-500 text-center sm:text-left">
          © {currentYear} K.Ramesh. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
