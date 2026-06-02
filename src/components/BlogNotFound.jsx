import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

const BlogNotFound = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4 px-4">
      <BookOpen className="w-12 h-12 text-slate-700" />

      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
        Blog not found
      </p>

      <Link
        to="/blog"
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-indigo-400 hover:text-indigo-300 no-underline"
      >
        <ArrowLeft className="w-3 h-3" />
        Back to Blogs
      </Link>
    </div>
  );
};

export default BlogNotFound;
