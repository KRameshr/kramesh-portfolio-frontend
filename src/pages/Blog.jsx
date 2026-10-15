import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Loader from "../components/Loader";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        setBlogs(res.data);
      } catch {
        setLoadError(true);
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
    <main className="public-page min-h-screen bg-white text-gray-900">
      <div className="pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              My Writing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-950 mb-4">
            Writing
          </h1>
          <p className="text-gray-600 text-sm max-w-xl">
            Thoughts, tutorials, and insights about web development, full-stack
            engineering, UI design, and modern technologies.
          </p>
        </motion.div>

        {/* Blog Grid / Empty State */}
        {loadError ? (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">Articles could not be loaded. Please try again later.</p>
        ) : blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 border border-gray-200 rounded-2xl bg-gray-50"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400">
              No Blogs Yet
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link
                  to={`/blog/${blog.slug}`}
                  className="portfolio-card group relative flex flex-col h-full overflow-hidden no-underline"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden bg-white">
                    {blog.cover_image_url ? (
                      <img
                        src={blog.cover_image_url}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-blue-400/40" />
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300">
                      <span className="flex items-center gap-1.5 bg-white text-gray-900 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                        Read Article <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Date & Reading Time */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <span className="text-gray-300">·</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                        {Math.max(
                          1,
                          Math.round(
                            (blog.content?.split(" ").length || 200) / 200,
                          ),
                        )}{" "}
                        min read
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold leading-snug text-gray-950 mb-3 transition-colors group-hover:text-blue-700">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm leading-relaxed text-gray-600 line-clamp-3 flex-1">
                      {blog.excerpt || blog.content?.slice(0, 140) + "..."}
                    </p>

                    {/* Footer */}
                    <div className="pt-6">
                      <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition-all duration-300 group-hover:gap-3">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Blog;
