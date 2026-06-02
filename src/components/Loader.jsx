import React from "react";
import heroBg from "../assets/hero-bg5.jpg";

const Loader = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />

        <p className="text-[16px] font-black uppercase tracking-[0.2em] text-slate-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
