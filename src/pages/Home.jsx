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
    <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-x-hidden">
      {/* Decorative gradient blobs — fixed behind all sections, subtle depth using brand colors */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-16 w-[26rem] h-[26rem] bg-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-blue-400/15 rounded-full blur-3xl" />
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
