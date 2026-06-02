import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Braces } from "lucide-react";
import navLinks from "../data/navLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── MAIN NAVBAR ── */}

      <nav className="w-full sticky top-0 z-50 bg-[#07090f] border-b border-white/[0.05]">
        {/* top accent line */}

        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent " />

        <div className="max-w-6xl mx-auto px-4 h-[98px] flex items-center justify-between gap-4 ">
          {/* ── LOGO ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group no-underline flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center group-hover:bg-indigo-600/25 transition-all duration-300">
              <Braces className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-black tracking-tight text-white uppercase">
                K.<span className="text-indigo-400">Ramesh</span>
              </span>
              <span className="text-[7px] font-semibold tracking-[0.25em] text-slate-500 uppercase mt-[2px]">
                Full Stack Developer
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.2] rounded-full px-1.5 py-1.5">
            {navLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline ${
                  isActive(path)
                    ? "bg-indigo-600 text-white shadow-[0_2px_16px_rgba(99,102,241,0.35)]"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex md:hidden w-8 h-8 rounded-lg border border-white/[0.2] bg-white/[0.03] text-slate-300 items-center justify-center transition-all hover:bg-white/[0.07]"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE BACKDROP ── */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* ── MOBILE SIDEBAR ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          width: "260px",
          backgroundColor: "#07090f",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(to right,transparent,rgba(99,102,241,0.5),transparent)",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.13)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#fff",
            }}
          >
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              border: "none",
              background: "rgba(255,255,255,0.04)",
              color: "#94a3b8",
              cursor: "pointer",
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav Links */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {navLinks.map(({ name, path }) => {
            const active = isActive(path);
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  fontSize: "11px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  color: active ? "#fff" : "#94a3b8",
                  backgroundColor: active ? "#4f46e5" : "transparent",
                  boxShadow: active
                    ? "0 2px 14px rgba(99,102,241,0.3)"
                    : "none",
                  transition: "all 0.18s",
                }}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
