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
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
              Education
            </h2>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          {/* Education List Container */}
          <div className="flex flex-col gap-6">
            {educations.length > 0 ? (
              educations.map((edu) => (
                <div
                  key={edu._id}
                  className="border border-gray-200/90 hover:border-blue-300 rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-gray-200/50 transition-all duration-300 bg-slate-100/70"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
                        {edu.institution}
                        {edu.location && ` · ${edu.location}`}
                      </p>
                      <h3 className="text-gray-900 font-black uppercase text-base sm:text-lg tracking-tight">
                        {edu.degree}
                        {edu.branch && ` — ${edu.branch}`}
                      </h3>
                    </div>

                    {/* Fixed date badge responsiveness */}
                    <div className="w-fit sm:w-auto text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-full border border-gray-200 whitespace-nowrap">
                      {edu.start_date} – {edu.end_date || "Present"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${edu.is_current ? "bg-emerald-500 animate-pulse" : "bg-blue-600"}`}
                    />
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.1em] ${edu.is_current ? "text-emerald-700" : "text-blue-600"}`}
                    >
                      {edu.progress || "Completed"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">
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
