import { useEffect, useState } from "react";
import { Braces } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Loader from "../components/Loader";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

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

  const getLevel = (proficiency = 80) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 75) return "Advanced";
    if (proficiency >= 60) return "Intermediate";
    return "Beginner";
  };

  const categories = Object.keys(grouped);
  const visibleCategories =
    activeFilter === "all" ? categories : [activeFilter];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/90 text-gray-900 font-sans relative overflow-hidden">
      {/* Subtle decorative gradient blobs — repositioned to top-right / bottom-left */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] bg-blue-500/[0.12] rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-orange-400/[0.13] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Braces className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              What I Know
            </span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <h1 className="text-4xl lg:text-6xl font-black uppercase text-gray-900">
              My <span className="text-blue-600">Skills</span>
            </h1>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <span className="text-lg font-black text-blue-600">
                {skills.length}
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                Total Skills
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm max-w-xl">
            Technologies and tools I use to build modern web applications.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            <button
              onClick={() => setActiveFilter("all")}
              className={`text-[10px] font-black uppercase tracking-[0.1em] px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                activeFilter === "all"
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] font-black uppercase tracking-[0.1em] px-4 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Skills by Category */}
        <div className="flex flex-col gap-12">
          {visibleCategories.map((category, catIndex) => {
            const items = grouped[category];
            if (!items) return null;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                {/* Category label */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                    {categoryLabels[category] || category}
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-200" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    {items.length} skills
                  </span>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group bg-slate-100/70 border border-gray-200/90 hover:border-orange-300 rounded-2xl p-6 transition-colors duration-300 shadow-sm hover:shadow-lg hover:shadow-orange-500/10 flex flex-col items-center gap-4 cursor-default"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-orange-300 transition-colors duration-300">
                        <span className="text-blue-600 group-hover:text-orange-500 font-black text-xl uppercase transition-colors duration-300">
                          {skill.name.charAt(0)}
                        </span>
                      </div>

                      <span className="text-sm font-black uppercase tracking-[0.08em] text-gray-800 text-center group-hover:text-blue-600 transition-colors">
                        {skill.name}
                      </span>

                      {/* Proficiency bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency || 80}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 group-hover:from-orange-500 group-hover:to-orange-400 rounded-full transition-colors duration-300"
                        />
                      </div>

                      {/* Level badge */}
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                        {getLevel(skill.proficiency)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
