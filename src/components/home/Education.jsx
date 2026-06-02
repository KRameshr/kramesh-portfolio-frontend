import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import FadeInSection from "./FadeInSection";
import API from "../../api/axios";

const Education = () => {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    API.get("/education")
      .then((res) => setEducations(res.data))
      .catch(console.error);
  }, []);

  return (
    <FadeInSection>
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <GraduationCap className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Education
            </h2>
            <div className="flex-1 h-[1px] bg-white/[0.05]" />
          </div>
          <div className="flex flex-col gap-4">
            {educations.length > 0 ? (
              educations.map((edu) => (
                <div
                  key={edu._id}
                  className="bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl p-5 sm:p-6 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">
                        {edu.institution}
                        {edu.location && ` · ${edu.location}`}
                      </p>
                      <h3 className="text-white font-black uppercase text-sm tracking-tight">
                        {edu.degree}
                        {edu.branch && ` — ${edu.branch}`}
                      </h3>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 whitespace-nowrap">
                      {edu.start_date} – {edu.end_date || "Present"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${edu.is_current ? "bg-emerald-400" : "bg-indigo-400"}`}
                    />
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.1em] ${edu.is_current ? "text-emerald-400" : "text-slate-400"}`}
                    >
                      {edu.progress || "Completed"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">
                No education records found.
              </p>
            )}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default Education;
