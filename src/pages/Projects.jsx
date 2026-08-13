import { useEffect, useState } from "react";
import { ExternalLink, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLiveClick = (url) => {
    if (!url || url === "null") {
      toast.error("This project is not live yet!", {
        style: {
          background: "#1e293b",
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

  if (loading) return <Loader />;

  return (
    // బ్యాక్‌గ్రౌండ్ గ్రేడియంట్‌ని ఇక్కడ అప్లై చేశాను — corner-glow style (Home page నుండి visually distinct)
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/90 text-gray-900 font-sans relative overflow-hidden">
      {/* Decorative corner glows — diagonal, distinct from Home's scattered blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-blue-500/[0.12] rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[34rem] h-[34rem] bg-orange-400/[0.14] rounded-full blur-3xl" />
      </div>

      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              My Projects
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase text-gray-900 mb-6">
            All <span className="text-blue-600">Projects</span>
          </h1>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
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
                className="group bg-slate-100/70 border border-gray-200/90 hover:border-orange-300 rounded-3xl p-6 transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 flex flex-col"
              >
                {/* Top Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex gap-2">
                    {/* GitHub Link - Orange Hover */}
                    {project.github_url && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-colors duration-300 shadow-sm"
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
                    {/* Live Link - Orange Hover */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLiveClick(project.live_url)}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-blue-600 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-colors duration-300 shadow-sm cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-gray-900 font-black uppercase text-sm tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
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
                    <div
                      onClick={() => handleLiveClick(project.live_url)}
                      className="absolute inset-3 rounded-xl bg-gray-900/0 group-hover:bg-gray-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 bg-white text-gray-900 text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                        View Project <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
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
                        className="text-[9px] font-black uppercase tracking-[0.08em] bg-white border border-gray-200 text-blue-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors px-2.5 py-1 rounded-full cursor-default"
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
    </div>
  );
};

export default Projects;
