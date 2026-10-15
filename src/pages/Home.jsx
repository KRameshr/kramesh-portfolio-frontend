import { Suspense, lazy } from "react";
import Hero from "../components/home/Hero"; // Direct import = 0 delay on landing

const TechStack = lazy(() => import("../components/home/TechStack"));
const FeaturedProjects = lazy(
  () => import("../components/home/FeaturedProjects"),
);
const Certifications = lazy(() => import("../components/home/Certifications"));
const Education = lazy(() => import("../components/home/Education"));
const Experience = lazy(() => import("../components/home/Experience"));
const BlogPreview = lazy(() => import("../components/home/BlogPreview"));
const CTA = lazy(() => import("../components/home/CTA"));

const SectionSkeleton = () => (
  <div className="py-12 flex justify-center items-center">
    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const Home = () => {
  return (
    <main className="public-page min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <div>
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
          <BlogPreview />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
