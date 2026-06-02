import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data.slice(0, 3)))
      .catch(console.error);
  }, []);

  const handleLiveClick = (url) => {
    if (!url || url === "null") {
      toast.error("This project is not live yet!", {
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "12px",
          fontWeight: "bold",
        },
      });
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <FadeInSection>
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 hover:text-indigo-400 transition-colors no-underline whitespace-nowrap"
            >
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] flex flex-col"
              >
                {project.image_url ? (
                  <div className="w-full h-44 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-44 bg-indigo-600/10 border-b border-white/[0.05] flex items-center justify-center">
                    <Terminal className="w-8 h-8 text-indigo-500/30" />
                  </div>
                )}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-colors"
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
                      <button
                        onClick={() => handleLiveClick(project.live_url)}
                        className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack?.split(",").map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-black uppercase tracking-[0.08em] bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full"
                      >
                        {tech.trim()}
                      </span>
                    ))}
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
