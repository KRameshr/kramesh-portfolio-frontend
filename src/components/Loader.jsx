import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/90 flex items-center justify-center relative overflow-hidden">
      {/* Decorative gradient blobs — consistent with rest of site */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/[0.08] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-orange-400/[0.09] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Gradient conic ring with pulsing brand mark at center */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Rotating gradient ring (blue -> orange), masked to a thin ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #2563eb, #f97316, transparent)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
            }}
          />

          {/* Center brand mark — pulsing K. */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center"
          >
            <span className="text-sm font-black tracking-wider text-gray-900">
              K<span className="text-blue-600">.</span>
            </span>
          </motion.div>
        </div>

        {/* Loading label with animated dots */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
            Loading
          </span>
          <span className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 rounded-full bg-blue-600"
              />
            ))}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
