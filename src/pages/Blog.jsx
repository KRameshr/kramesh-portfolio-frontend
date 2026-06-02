import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import API from "../api/axios";
import heroBg from "../assets/hero-bg4.jpg";

import Loader from "../components/Loader";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* Background */}

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
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                My Writing
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white mb-4">
              Latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Blogs
              </span>
            </h1>
            <p className="text-slate-500 text-sm max-w-xl">
              Thoughts, tutorials, and insights about web development,full-stack
              engineering, UI design, and modern technologies.
            </p>
          </div>

          {/* ── Blog Grid ── */}
          {/* Empty State */}
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border border-white/[0.05] rounded-3xl bg-white/[0.03] backdrop-blur-xl">
              <BookOpen className="w-10 h-10 text-slate-700 mb-4" />
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">
                No Blogs Yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/30 hover:bg-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.25)] no-underline"
                >
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden">
                    {blog.cover_image_url ? (
                      <>
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-indigo-400/40" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-extrabold leading-snug text-white mb-3 transition-colors duration-300 group-hover:text-indigo-300">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm leading-relaxed text-slate-400 line-clamp-3 flex-1">
                      {blog.excerpt || blog.content?.slice(0, 140) + "..."}
                    </p>

                    {/* Footer */}
                    <div className="pt-6">
                      <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-indigo-400 transition-all duration-300 group-hover:gap-3">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Glow Dynamic Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
