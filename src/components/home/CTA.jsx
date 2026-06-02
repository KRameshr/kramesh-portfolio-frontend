import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInSection from "./FadeInSection";

const CTA = () => (
  <FadeInSection>
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5" />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4">
              Let's Work Together
            </p>
            <h2 className="text-3xl sm:text-3xl font-black uppercase text-white mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-slate-300 text-sm mb-8">
              I'm currently available for freelance work and full-time
              positions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-5 rounded-full text-[15px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              Get In Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </FadeInSection>
);

export default CTA;
