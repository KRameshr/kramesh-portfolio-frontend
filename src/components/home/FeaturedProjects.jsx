import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";
import { getExternalUrl } from "../../utils/links";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data.slice(0, 3)))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FadeInSection>
      <section className="portfolio-section portfolio-section-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-y-4 mb-10">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <h2 className="portfolio-section-heading text-xl sm:text-3xl font-bold tracking-tight text-white">
                Featured Projects
              </h2>
            </div>

            {/* "ALL" Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/projects"
                className="portfolio-button-primary portfolio-projects-cta flex items-center gap-2 px-4 py-2.5 transition-colors no-underline whitespace-nowrap"
              >
                <span className="text-sm font-medium text-white flex items-center gap-1.5">
                  All <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p role="status" className="sm:col-span-2 lg:col-span-3 text-sm text-gray-500">Loading projects…</p>
            ) : loadError ? (
              <p role="alert" className="sm:col-span-2 lg:col-span-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-xl p-4">
                Featured projects could not be loaded.
              </p>
            ) : projects.length === 0 ? (
              <p className="sm:col-span-2 lg:col-span-3 text-sm text-gray-600">No featured projects are available.</p>
            ) : projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="portfolio-card group p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Number & Links */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                          className="portfolio-projects-cta w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      )}
                      {getExternalUrl(project.live_url) && (
                        <a
                          href={getExternalUrl(project.live_url)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit ${project.title} live site (opens in a new tab)`}
                          className="portfolio-projects-cta w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-gray-900 font-black uppercase text-sm tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-xs leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Inner Container Box for Image with a nice subtle background */}
                  {project.image_url ? (
                    <div className="w-full h-44 rounded-2xl bg-white border border-gray-200/80 p-3 mb-6 overflow-hidden flex items-center justify-center shadow-inner">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-44 rounded-2xl bg-white border border-gray-200/80 p-3 mb-6 flex items-center justify-center">
                      <Terminal className="w-8 h-8 text-blue-500/40" />
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack?.split(",").map((tech) => {
                      const trimmedTech = tech.trim();
                      return (
                        <span
                          key={trimmedTech}
                          className="text-xs font-medium bg-blue-50 border border-blue-100 text-blue-800 px-2.5 py-1 rounded-full cursor-default"
                        >
                          {trimmedTech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default FeaturedProjects;
