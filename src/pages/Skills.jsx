import { useEffect, useState } from "react";
import { Braces } from "lucide-react";
import API from "../api/axios";
import heroBg from "../assets/hero-bg2.jpg";
import Loader from "../components/Loader";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills");
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoryLabels = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools",
    programming: "Programming",
    other: "Other",
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* ── Background ── */}
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Header ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Braces className="w-5 h-5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                What I Know
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white mb-4">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Skills
              </span>
            </h1>
            <p className="text-slate-500 text-sm max-w-xl">
              Technologies and tools I use to build modern web applications.
            </p>
          </div>

          {/* ── Skills by Category ── */}
          <div className="flex flex-col gap-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                {/* Category label */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                    {categoryLabels[category] || category}
                  </span>
                  <div className="flex-1 h-[1px] bg-white/[0.05]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                    {items.length} skills
                  </span>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((skill) => (
                    <div
                      key={skill._id}
                      className="group bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.05] rounded-2xl p-6 transition-all duration-300 flex flex-col items-center gap-4 cursor-default"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400 font-black text-xl uppercase">
                          {skill.name.charAt(0)}
                        </span>
                      </div>

                      {/* Name */}
                      <span className="text-sm font-black uppercase tracking-[0.08em] text-slate-300 text-center group-hover:text-white transition-colors">
                        {skill.name}
                      </span>

                      {/* Proficiency bar */}
                      <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency || 80}%` }}
                        />
                      </div>

                      {/* Proficiency % */}
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {skill.proficiency || 80}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
