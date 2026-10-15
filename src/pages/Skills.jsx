import { useEffect, useState } from "react";
import { Braces } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Loader from "../components/Loader";
import { getUniqueSkills } from "../utils/skills";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills");
        setSkills(getUniqueSkills(res.data));
      } catch {
        setLoadError(true);
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
    <main className="public-page min-h-screen bg-white text-gray-900">
      <div className="pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Braces className="w-5 h-5 text-orange-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-800">
              What I Know
            </span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-950">
              Skills
            </h1>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <span className="text-lg font-black text-orange-800">
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

        {loadError && <p role="alert" className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">Skills could not be loaded. Please try again later.</p>}

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
              aria-pressed={activeFilter === "all"}
              className={`text-sm font-medium px-4 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                activeFilter === "all"
                  ? "bg-orange-700 border-orange-700 text-white shadow-md shadow-orange-700/20"
                  : "bg-white border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-800"
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                className={`text-sm font-medium px-4 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                  activeFilter === cat
                  ? "bg-orange-700 border-orange-700 text-white shadow-md shadow-orange-700/20"
                  : "bg-white border-gray-200 text-gray-600 hover:border-orange-400 hover:text-orange-800"
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Skills by Category */}
        {!loadError && skills.length === 0 ? <p className="text-sm text-gray-600">No skills are available yet.</p> : <div className="flex flex-col gap-12">
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
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-800">
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
                    <motion.button
                      key={skill._id ?? skill.name}
                      type="button"
                      aria-pressed={selectedSkillId === (skill._id ?? skill.name)}
                      onClick={() => setSelectedSkillId((selectedId) => (
                        selectedId === (skill._id ?? skill.name) ? null : (skill._id ?? skill.name)
                      ))}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
                      whileTap={{ scale: 0.99 }}
                      className={`portfolio-card group flex w-full flex-col items-center gap-4 p-5 text-center transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 ${
                        selectedSkillId === (skill._id ?? skill.name)
                          ? "border-[#f2a184] bg-[#fff7f2] shadow-[0_8px_22px_rgba(184,68,32,0.12)]"
                          : "hover:border-[#f2a184] hover:bg-[#fffaf7]"
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors duration-200 ${
                        selectedSkillId === (skill._id ?? skill.name)
                          ? "border-orange-200 bg-orange-100"
                          : "border-gray-200 bg-[#f4f4f2] group-hover:border-orange-200 group-hover:bg-orange-50"
                      }`}>
                        <span className={`font-semibold text-xl uppercase ${selectedSkillId === (skill._id ?? skill.name) ? "text-orange-800" : "text-gray-700 group-hover:text-orange-800"}`}>
                          {skill.name.charAt(0)}
                        </span>
                      </div>

                      <span className={`text-sm font-semibold transition-colors duration-200 ${selectedSkillId === (skill._id ?? skill.name) ? "text-orange-900" : "text-gray-900 group-hover:text-orange-900"}`}>
                        {skill.name}
                      </span>

                      {/* Proficiency bar */}
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency || 80}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full bg-orange-700 rounded-full transition-colors duration-200"
                        />
                      </div>

                      {/* Level badge */}
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                        {getLevel(skill.proficiency)}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>}
      </div>
    </main>
  );
};

export default Skills;
