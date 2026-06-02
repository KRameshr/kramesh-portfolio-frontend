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
import API from "../api/axios";
import Loader from "../components/Loader";
import BlogNotFound from "../components/BlogNotFound";
import heroBg from "../assets/hero-bg.png";
const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden">
      {/* Background Shapes */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-82 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Fixed Left Trigger: Previous Post */}
      {prevBlog && (
        <Link
          to={`/blog/${prevBlog.slug}`}
          title={`Previous: ${prevBlog.title}`}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 group hidden md:flex items-center justify-center w-12 h-24 bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/50 rounded-xl transition-all duration-300 no-underline hover:bg-[#070b1e]/80 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-transform group-hover:-translate-x-1" />
        </Link>
      )}

      {/* Fixed Right Trigger: Next Post */}
      {nextBlog && (
        <Link
          to={`/blog/${nextBlog.slug}`}
          title={`Next: ${nextBlog.title}`}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 group hidden md:flex items-center justify-center w-12 h-24 bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/50 rounded-xl transition-all duration-300 no-underline hover:bg-[#070b1e]/80 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
        </Link>
      )}

      <div className="relative z-10 pt-6 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Breadcrumb Back button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 hover:text-indigo-400 transition-colors no-underline mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blogs
          </Link>

          {/* Cover image */}
          {blog.cover_image_url && (
            <div className="w-full max-h-[60vh] flex items-center justify-center bg-black/20 rounded-2xl overflow-hidden border border-white/[0.07] mb-8 p-4">
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="w-full h-auto max-h-[60vh] object-contain p-4"
              />
            </div>
          )}

          {/* Header Metadata & Title */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-3 h-3 text-slate-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-600">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black uppercase text-white tracking-tight mb-4">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed border-l-2 border-indigo-500/50 pl-4">
                {blog.excerpt}
              </p>
            )}
          </div>

          {/* Content Top Divider */}
          <div className="h-[1px] bg-white/[0.05] mb-8" />

          {/* Main Article Body */}
          <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap min-h-[200px]">
            {blog.content}
          </div>

          {/* Content Bottom Divider */}
          <div className="h-[1px] bg-white/[0.05] mt-12 mb-8" />

          {/* ── MOBILE FALLBACK NAVIGATION (Only shows on mobile screens instead of fixed edges) ── */}
          <div className="grid grid-cols-2 gap-4 md:hidden mb-8">
            {prevBlog ? (
              <Link
                to={`/blog/${prevBlog.slug}`}
                className="flex items-center justify-start gap-2 bg-white/[0.02] border border-white/[0.05] text-slate-400 p-4 rounded-xl text-[11px] font-black uppercase tracking-[0.05em] no-underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev
              </Link>
            ) : (
              <div />
            )}

            {nextBlog ? (
              <Link
                to={`/blog/${nextBlog.slug}`}
                className="flex items-center justify-end gap-2 bg-white/[0.02] border border-white/[0.05] text-slate-400 p-4 rounded-xl text-[11px] font-black uppercase tracking-[0.05em] no-underline text-right"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Central Return Hub Action */}
          <div className="flex justify-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-slate-300 hover:text-white px-6 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-200 no-underline hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" /> Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
