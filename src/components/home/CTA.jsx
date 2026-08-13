import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInSection from "./FadeInSection";

const CTA = () => (
  <FadeInSection>
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-100/70 border border-gray-200/90 hover:border-orange-300 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-xl shadow-gray-200/50 transition-all duration-300">
          {/* Subtle orange/blue background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-white/5 to-orange-500/10 pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4">
              Let's Work Together
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-gray-900 mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-8 leading-relaxed">
              I'm currently available for freelance work and full-time
              positions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.1em] transition-all duration-300 no-underline shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-orange-500/40"
            >
              Get In Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </FadeInSection>
);

export default CTA;
