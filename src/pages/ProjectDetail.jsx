import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Loader from "../components/Loader";
import { getExternalUrl } from "../utils/links";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [result, setResult] = useState({ projectId: null, project: null, loading: true, loadError: false });

  useEffect(() => {
    let active = true;

    API.get("/projects")
      .then((res) => {
        if (active) {
          const selectedProject = res.data.find((item) => item._id === projectId);
          setResult({ projectId, project: selectedProject || null, loading: false, loadError: false });
        }
      })
      .catch(() => {
        if (active) setResult({ projectId, project: null, loading: false, loadError: true });
      });

    return () => {
      active = false;
    };
  }, [projectId]);

  const loading = result.projectId !== projectId || result.loading;
  const project = result.projectId === projectId ? result.project : null;
  const loadError = result.projectId === projectId && result.loadError;

  if (loading) return <Loader />;

  if (loadError) {
    return (
      <main className="public-page min-h-[70vh] bg-white px-4 py-16 text-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link to="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-800 no-underline hover:text-orange-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Projects
          </Link>
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            Project details could not be loaded. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="public-page min-h-[70vh] bg-white px-4 py-16 text-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link to="/projects" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-orange-800 no-underline hover:text-orange-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Projects
          </Link>
          <div className="rounded-2xl bg-[#f4f4f2] px-6 py-14 text-center sm:px-10">
            <Terminal className="mx-auto mb-4 h-9 w-9 text-orange-800/70" aria-hidden="true" />
            <h1 className="mx-auto mb-4 text-3xl font-bold text-gray-950">Project not found</h1>
            <p className="mx-auto max-w-lg text-sm leading-7 text-gray-600">
              This project may have been removed or the link may be incorrect.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const githubUrl = getExternalUrl(project.github_url);
  const liveUrl = getExternalUrl(project.live_url);
  const technologies = project.tech_stack
    ?.split(",")
    .map((technology) => technology.trim())
    .filter(Boolean) || [];
  const descriptionLines = project.description
    ?.split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean) || [];
  const hasStructuredOverview = descriptionLines.length > 1 && descriptionLines.every((line) => /^\s*(?:[-*•]|\d+[.)])\s+/.test(line));
  const sentenceOverviewItems = typeof Intl.Segmenter === "function"
    ? Array.from(
      new Intl.Segmenter(undefined, { granularity: "sentence" }).segment(project.description || ""),
      ({ segment }) => segment.trim(),
    ).filter(Boolean)
    : [];
  const overviewItems = hasStructuredOverview
    ? descriptionLines.map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, ""))
    : sentenceOverviewItems.length > 1
      ? sentenceOverviewItems
      : [];

  return (
    <main className="public-page min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <Link to="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 no-underline transition-colors hover:text-orange-800">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Projects
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-800">Project</p>
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-gray-950 sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
          </div>

          {(liveUrl || githubUrl) && (
            <div className="flex flex-wrap gap-3 sm:shrink-0">
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="portfolio-button-primary inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-semibold no-underline">
                  Live Demo <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[.65rem] border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 no-underline transition-colors hover:border-orange-300 hover:text-orange-800">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </motion.header>

        {project.image_url ? (
          <div className="mb-10 flex min-h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#eeece8] p-4 shadow-sm sm:min-h-80 sm:p-8 lg:min-h-[28rem]">
            <img src={project.image_url} alt={project.title} className="max-h-[36rem] w-full rounded-xl object-contain" />
          </div>
        ) : (
          <div className="mb-10 flex min-h-56 items-center justify-center rounded-2xl bg-[#f4f4f2] sm:min-h-80">
            <Terminal className="h-12 w-12 text-gray-300" aria-hidden="true" />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:gap-12">
          <section aria-labelledby="project-overview-title" className="min-w-0">
            <h2 id="project-overview-title" className="portfolio-section-heading mb-5 text-2xl font-bold text-gray-950">Overview</h2>
            {overviewItems.length > 0 ? (
              <ul className="space-y-3 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                {overviewItems.map((item, index) => (
                  <li key={`${index}-${item}`} className="flex gap-3">
                    <span className="mt-[0.8em] h-2 w-2 shrink-0 rounded-full bg-orange-700" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                {project.description}
              </p>
            )}
          </section>

          {technologies.length > 0 && (
            <aside className="min-w-0 rounded-2xl bg-[#f4f4f2] p-5 sm:p-6">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Technology stack</h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    tabIndex={0}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:border-orange-400 focus-visible:bg-orange-50 focus-visible:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
