import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";

const Experience = () => {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    API.get("/experience")
      .then((res) => setExperience(res.data))
      .catch(console.error);
  }, []);

  return (
    <FadeInSection>
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
              Experience
            </h2>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          {/* Experience List Container */}
          <div className="flex flex-col gap-6">
            {experience.length > 0 ? (
              experience.map((exp) => (
                <div
                  key={exp._id}
                  className="border border-gray-200/90 hover:border-blue-300 rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-gray-200/50 transition-all duration-300 bg-slate-100/70"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
                        {exp.company}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                      <h3 className="text-gray-900 font-black uppercase text-base sm:text-lg tracking-tight mb-1">
                        {exp.role}
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 inline-block">
                        {exp.type}
                      </span>
                    </div>

                    {/* Fixed date and active badge responsiveness for mobile */}
                    <div className="flex flex-col items-start sm:items-end gap-1.5 w-fit sm:w-auto">
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-full border border-gray-200 whitespace-nowrap">
                        {exp.start_date} –{" "}
                        {exp.is_current ? "Present" : exp.end_date}
                      </span>

                      {exp.is_current && (
                        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700">
                            Active
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>
                  )}

                  {exp.skills && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200/60">
                      {exp.skills.split(",").map((skill) => {
                        const trimmedSkill = skill.trim();
                        return (
                          <span
                            key={trimmedSkill}
                            className="text-[10px] font-bold tracking-wide text-blue-600 bg-blue-50/80 border border-blue-200 rounded-xl px-3 py-1.5 hover:bg-blue-600 hover:text-white transition-all duration-200"
                          >
                            {trimmedSkill}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">
                No experience records found.
              </p>
            )}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default Experience;
