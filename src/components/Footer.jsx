import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="relative z-10 w-full border-t border-gray-200/90 bg-slate-100/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-0 sm:h-[98px] flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
        {/* Same Navbar Logo */}
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

        {/* Copyright */}
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-600 text-center sm:text-left">
          © {currentYear} Ramesh.Dev. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
