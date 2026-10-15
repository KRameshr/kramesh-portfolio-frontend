import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Braces, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";
import { getUniqueSkills } from "../../utils/skills";

const TechStack = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    API.get("/skills")
      .then((res) => setSkills(getUniqueSkills(res.data).slice(0, 8)))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FadeInSection>
      <section className="portfolio-section portfolio-section-light px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header with "View All" on the Right */}
          <div className="flex flex-wrap items-center justify-between gap-y-4 mb-10">
            <div className="flex items-center gap-4">
              <Braces className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <h2 className="portfolio-section-heading text-xl sm:text-3xl font-bold tracking-tight text-gray-950 whitespace-nowrap">
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
                className="portfolio-button-primary flex items-center gap-2 px-4 py-2.5 transition-colors no-underline whitespace-nowrap"
              >
                <span className="text-sm font-medium text-white flex items-center gap-1.5">
                  View All <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
            {loading ? (
              <p role="status" className="text-sm text-gray-500">Loading skills…</p>
            ) : loadError ? (
              <p role="alert" className="text-sm text-red-800">Skills could not be loaded.</p>
            ) : skills.length === 0 ? (
              <p className="text-sm text-gray-600">No skills are available.</p>
            ) : skills.map((skill, i) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-2 bg-white border border-gray-200 hover:border-orange-300 rounded-lg px-4 py-2.5 transition-colors cursor-default shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-800">
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
