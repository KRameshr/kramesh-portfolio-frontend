import { useEffect, useState } from "react";
import { ExternalLink, Terminal } from "lucide-react";
import API from "../api/axios";
import heroBg from "../assets/hero-bg.png";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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
          opacity: 0.1,
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                My Work
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white mb-4">
              All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Projects
              </span>
            </h1>
            <p className="text-slate-500 text-sm max-w-xl">
              A collection of projects I've built using modern web technologies.
            </p>
          </div>

          {/* ── Projects Grid ── */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Terminal className="w-8 h-8 text-slate-700" />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
                No projects yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <div
                  key={project._id}
                  className="group bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:bg-white/[0.05] flex flex-col"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2">
                      {/* GitHub button */}
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

                      {/* Live URL button — always show, handle null */}
                      <button
                        onClick={() => handleLiveClick(project.live_url)}
                        className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {/* Image */}

                  {project.image_url && (
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-white/[0.05]">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-white font-black uppercase text-sm tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
