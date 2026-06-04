import { Suspense, lazy } from "react";
import Loader from "../components/Loader";

const Hero = lazy(() => import("../components/home/Hero"));
const TechStack = lazy(() => import("../components/home/TechStack"));
const FeaturedProjects = lazy(
  () => import("../components/home/FeaturedProjects"),
);
const Certifications = lazy(() => import("../components/home/Certifications"));
const Education = lazy(() => import("../components/home/Education"));
const Experience = lazy(() => import("../components/home/Experience"));
const CTA = lazy(() => import("../components/home/CTA"));

const Home = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* Background  */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(/src/assets/hero-bg2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#020617]/95 via-[#020617]/85 to-[#030712]/90" />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Suspense fallback={<Loader />}>
          <Hero />
          <TechStack />
          <FeaturedProjects />
          <Certifications />
          <Education />
          <Experience />
          <CTA />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
