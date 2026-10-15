import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div role="status" aria-live="polite" className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Simple rotating brand ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[3px] border-gray-300 border-t-blue-600"
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
