import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Braces, ArrowRight } from "lucide-react";
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
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header with "View All" on the Right */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <Braces className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 whitespace-nowrap">
                Tech Stack
              </h2>
            </div>

            {/* View All Button with Hover & Tap Size/Color Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/skills"
                className="flex items-center gap-2 bg-blue-600 hover:bg-orange-500 border border-blue-600 hover:border-orange-500 rounded-full px-4 py-3 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-orange-500/20 no-underline whitespace-nowrap"
              >
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] text-white flex items-center gap-1.5">
                  View All <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
            {skills.map((skill, i) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 bg-blue-50/60 border border-blue-200/80 hover:bg-orange-50 hover:border-orange-300 rounded-full px-4 py-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:bg-orange-500 transition-colors duration-300 flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.08em] text-blue-900 group-hover:text-orange-600 transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default TechStack;
