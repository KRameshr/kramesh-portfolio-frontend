import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInSection from "./FadeInSection";

const CTA = () => (
  <FadeInSection>
    <section className="portfolio-section portfolio-section-dark px-4 sm:px-6 lg:px-8">
      <div className="portfolio-cta-panel">
        <p className="cta-eyebrow text-sm font-semibold mb-4">Let's Work Together</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Have a <span className="text-orange-400">Project</span> in Mind?
        </h2>
        <p className="text-gray-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
          If you have a project or opportunity to discuss, get in touch.
        </p>
        <Link
          to="/contact"
          className="portfolio-button-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors no-underline"
        >
          Get In Touch <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </FadeInSection>
);

export default CTA;
