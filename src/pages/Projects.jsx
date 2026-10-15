import { useEffect, useState } from "react";
import { ExternalLink, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Loader from "../components/Loader";
import { getExternalUrl } from "../utils/links";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <Loader />;

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-950 mb-6">
            Projects
          </h1>
        </motion.div>

        {/* Projects Grid */}
        {loadError ? (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            Projects could not be loaded. Please try again later.
          </p>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Terminal className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium">
              No projects found.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="portfolio-card group relative flex flex-col p-5 sm:p-6"
              >
                <Link
                  to={`/projects/${project._id}`}
                  aria-label={`View details for ${project.title}`}
                  className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
                />
                {/* Top Header */}
                <div className="relative z-20 mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex gap-2">
                    {/* GitHub Link - Orange Hover */}
                    {getExternalUrl(project.github_url) && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                        className="portfolio-projects-cta flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
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
                      </motion.a>
                    )}
                    {getExternalUrl(project.live_url) && (
                      <a
                        href={getExternalUrl(project.live_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title} live site (opens in a new tab)`}
                        className="portfolio-projects-cta flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-gray-900 font-black uppercase text-sm tracking-tight mb-2 group-hover:text-orange-800 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Image */}
                {project.image_url ? (
                  <div className="relative w-full h-44 rounded-2xl bg-white border border-gray-200/80 p-3 mb-6 overflow-hidden flex items-center justify-center shadow-inner">
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

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Projects;
