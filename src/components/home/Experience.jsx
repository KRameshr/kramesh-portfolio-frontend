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
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Briefcase className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Experience
            </h2>
            <div className="flex-1 h-[1px] bg-white/[0.05]" />
          </div>
          <div className="flex flex-col gap-4">
            {experience.length > 0 ? (
              experience.map((exp) => (
                <div
                  key={exp._id}
                  className="bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">
                        {exp.company}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                      <h3 className="text-white font-black uppercase text-sm tracking-tight mb-1">
                        {exp.role}
                      </h3>
                      <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-600">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 whitespace-nowrap">
                        {exp.start_date} –{" "}
                        {exp.is_current ? "Present" : exp.end_date}
                      </span>
                      {exp.is_current && (
                        <span className="flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-400">
                            Active
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">
                      {exp.description}
                    </p>
                  )}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.split(",").map((skill) => (
                        <span
                          key={skill}
                          className="text-[9px] font-black uppercase tracking-[0.08em] bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">
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
