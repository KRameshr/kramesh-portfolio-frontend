import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Braces } from "lucide-react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";

const TechStack = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    API.get("/skills")
      .then((res) => setSkills(res.data.slice(0, 8)))
      .catch(console.error);
  }, []);

  return (
    <FadeInSection>
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Braces className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 whitespace-nowrap">
              Tech Stack
            </h2>
            <div className="flex-1 h-[1px] bg-white/[0.05]" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
            {skills.map((skill, i) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-600/10 rounded-full px-3 sm:px-4 py-2 transition-all duration-200 cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] text-slate-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
            <Link
              to="/skills"
              className="flex items-center gap-2 border border-dashed border-white/[0.1] hover:border-indigo-500/30 rounded-full px-3 sm:px-4 py-2 transition-all duration-200 no-underline"
            >
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] text-slate-500 hover:text-indigo-400">
                View All
              </span>
            </Link>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default TechStack;
