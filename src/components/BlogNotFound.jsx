import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const BlogNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/90 flex flex-col items-center justify-center gap-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
          <BookOpen className="w-7 h-7 text-blue-400" />
        </div>

        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          Blog not found
        </p>

        <motion.div whileHover={{ x: -2 }}>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-blue-600 hover:text-orange-500 no-underline transition-colors duration-300"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Blogs
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogNotFound;
