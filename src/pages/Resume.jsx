import { useEffect, useState } from "react";
import { Download, FileText, ExternalLink } from "lucide-react";
import API from "../api/axios";
import Loader from "../components/Loader";
import heroBg from "../assets/hero-bg5.jpg";
const Resume = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get("/about");
        setAbout(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const getFileId = (url) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  if (loading) {
    return <Loader />;
  }

  const fileId = getFileId(about?.resume_url);
  const previewUrl = fileId
    ? `https://drive.google.com/file/d/${fileId}/preview`
    : null;
  const downloadUrl = fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : null;
  const openUrl = fileId
    ? `https://drive.google.com/file/d/${fileId}/view`
    : null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      {/* Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* ── Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                  My Resume
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase text-white">
                Curriculum{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Vitae
                </span>
              </h1>
            </div>

            {/* ── Only TWO buttons ── */}
            {fileId && (
              <div className="flex gap-3">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-slate-300 px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open
                </a>
              </div>
            )}
          </div>

          {/* ── PDF Preview ── */}
          {previewUrl ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
              {/* Top bar — mac style */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                  {about?.name || "Resume"} — CV
                </span>
                <div className="w-16" />
              </div>

              {/* iframe */}
              <iframe
                src={previewUrl}
                title="Resume"
                className="w-full"
                style={{ height: "85vh", border: "none" }}
                allow="autoplay"
              />
            </div>
          ) : (
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-16 flex flex-col items-center justify-center gap-4">
              <FileText className="w-12 h-12 text-slate-700" />
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
                Resume not available yet
              </p>
            </div>
          )}

          {/* ── Bottom bar — mobile friendly ── */}
          {fileId && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl px-5 py-4">
              <p className="text-xs text-slate-500 text-center sm:text-left">
                Having trouble viewing? Download directly.
              </p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
