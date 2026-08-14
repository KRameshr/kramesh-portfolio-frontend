import { Suspense, lazy } from "react";
import Hero from "../components/home/Hero"; // Direct import = 0 delay on landing

const TechStack = lazy(() => import("../components/home/TechStack"));
const FeaturedProjects = lazy(
  () => import("../components/home/FeaturedProjects"),
);
const Certifications = lazy(() => import("../components/home/Certifications"));
const Education = lazy(() => import("../components/home/Education"));
const Experience = lazy(() => import("../components/home/Experience"));
const CTA = lazy(() => import("../components/home/CTA"));

const SectionSkeleton = () => (
  <div className="py-12 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-16 w-[26rem] h-[26rem] bg-orange-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-blue-400/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Instant Hero Render */}
        <Hero />

        <Suspense fallback={<SectionSkeleton />}>
          <TechStack />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedProjects />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Education />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
