import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import API from "../../api/axios";
import FadeInSection from "./FadeInSection";

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    API.get("/blogs")
      .then((response) => setBlogs(Array.isArray(response.data) ? response.data.slice(0, 3) : []))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FadeInSection>
      <section className="portfolio-section portfolio-section-paper px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <h2 className="portfolio-section-heading text-xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Latest Writing
              </h2>
            </div>
            <Link to="/blog" className="portfolio-button-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold no-underline">
              All articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {loading ? (
            <p role="status" className="text-sm text-gray-600">Loading articles...</p>
          ) : loadError ? (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Articles could not be loaded.
            </p>
          ) : blogs.length === 0 ? (
            <p className="text-sm text-gray-600">No articles are available yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <motion.article key={blog._id} whileHover={{ y: -4 }} className="h-full">
                  <Link to={`/blog/${blog.slug}`} className="portfolio-card group flex h-full flex-col overflow-hidden no-underline">
                    <div className="aspect-[16/9] overflow-hidden bg-gray-200">
                      {blog.cover_image_url ? (
                        <img src={blog.cover_image_url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-500">
                          <BookOpen className="h-8 w-8" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        {blog.category && <span className="font-semibold text-orange-700">{blog.category}</span>}
                        {blog.createdAt && (
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                            <time dateTime={blog.createdAt}>{new Date(blog.createdAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</time>
                          </span>
                        )}
                      </div>
                      <h3 className="mb-3 text-lg font-bold leading-snug text-gray-950 transition-colors group-hover:text-orange-700">
                        {blog.title}
                      </h3>
                      <p className="mb-5 line-clamp-3 flex-1 text-sm text-gray-600">
                        {blog.excerpt || blog.content?.slice(0, 160) || ""}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </FadeInSection>
  );
};

export default BlogPreview;
