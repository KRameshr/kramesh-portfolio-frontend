import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Loader from "../components/Loader";
import BlogNotFound from "../components/BlogNotFound";

// Detects URLs in a block of text and turns them into styled, clickable links
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const renderTextWithLinks = (text) => {
  // split() with a capturing group places matched URLs at odd indices —
  // using index parity avoids the lastIndex bug that comes from calling
  // .test() repeatedly on a regex with the global flag
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-orange-500 underline decoration-blue-300 hover:decoration-orange-300 underline-offset-2 transition-colors duration-200 break-words"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const [blogRes, allBlogsRes] = await Promise.all([
          API.get(`/blogs/${slug}`),
          API.get("/blogs"),
        ]);
        setBlog(blogRes.data);
        setAllBlogs(allBlogsRes.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  // Track scroll progress for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  // Find prev and next blog
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  if (loading) {
    return <Loader />;
  }

  if (error || !blog) {
    return <BlogNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/90 text-gray-900 font-sans relative overflow-x-hidden">
      {/* Decorative gradient blobs — top-only, kept subtle so they don't distract from reading */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[26rem] h-[26rem] bg-blue-500/[0.08] rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-72 h-72 bg-orange-400/[0.08] rounded-full blur-3xl" />
      </div>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/60 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-orange-500 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Fixed Left Trigger: Previous Post */}
      {prevBlog && (
        <Link
          to={`/blog/${prevBlog.slug}`}
          title={`Previous: ${prevBlog.title}`}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 group hidden md:flex items-center justify-center w-12 h-24 bg-white border border-gray-200 hover:border-orange-300 rounded-xl transition-all duration-300 no-underline shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-500 group-hover:text-orange-500 transition-transform group-hover:-translate-x-1" />
        </Link>
      )}

      {/* Fixed Right Trigger: Next Post */}
      {nextBlog && (
        <Link
          to={`/blog/${nextBlog.slug}`}
          title={`Next: ${nextBlog.title}`}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 group hidden md:flex items-center justify-center w-12 h-24 bg-white border border-gray-200 hover:border-orange-300 rounded-xl transition-all duration-300 no-underline shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-orange-500 transition-transform group-hover:translate-x-1" />
        </Link>
      )}

      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Top Breadcrumb Back button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 hover:text-blue-600 transition-colors no-underline mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blogs
          </Link>

          {/* Cover image */}
          {blog.cover_image_url && (
            <div className="w-full max-h-[60vh] flex items-center justify-center bg-white rounded-2xl overflow-hidden border border-gray-200/90 mb-8 p-4 shadow-sm">
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="w-full h-auto max-h-[55vh] object-contain rounded-xl"
              />
            </div>
          )}

          {/* Header Metadata & Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400">
                {Math.max(
                  1,
                  Math.round((blog.content?.split(" ").length || 200) / 200),
                )}{" "}
                min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase text-gray-900 tracking-tight mb-4">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed border-l-2 border-blue-500/50 pl-4">
                {blog.excerpt}
              </p>
            )}
          </div>

          {/* Content Top Divider */}
          <div className="h-[1px] bg-gray-200 mb-8" />

          {/* Main Article Body */}
          <div className="flex flex-col gap-5">
            {blog.content
              .split(/\n\s*\n/)
              .filter((para) => para.trim())
              .map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-gray-700 text-[15px] sm:text-base leading-[1.9] whitespace-pre-wrap"
                >
                  {renderTextWithLinks(para)}
                </motion.p>
              ))}
          </div>

          {/* Content Bottom Divider */}
          <div className="h-[1px] bg-gray-200 mt-12 mb-8" />

          {/* MOBILE FALLBACK NAVIGATION (Only shows on mobile screens instead of fixed edges) */}
          <div className="grid grid-cols-2 gap-4 md:hidden mb-8">
            {prevBlog ? (
              <Link
                to={`/blog/${prevBlog.slug}`}
                className="flex items-center justify-start gap-2 bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500 p-4 rounded-xl text-[11px] font-black uppercase tracking-[0.05em] no-underline shadow-sm transition-colors duration-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev
              </Link>
            ) : (
              <div />
            )}

            {nextBlog ? (
              <Link
                to={`/blog/${nextBlog.slug}`}
                className="flex items-center justify-end gap-2 bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500 p-4 rounded-xl text-[11px] font-black uppercase tracking-[0.05em] no-underline text-right shadow-sm transition-colors duration-300"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Central Return Hub Action */}
          <div className="flex justify-center mt-12">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white px-6 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 no-underline shadow-md shadow-blue-600/20 hover:shadow-orange-500/20"
              >
                <BookOpen className="w-4 h-4" /> Back to All Blogs
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
