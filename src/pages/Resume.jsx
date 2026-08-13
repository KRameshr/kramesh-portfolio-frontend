import { useEffect, useState } from "react";
import { Download, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import API from "../api/axios";
import Loader from "../components/Loader";

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/90 text-gray-900 font-sans relative overflow-hidden">
      {/* Decorative gradient blobs — top corners only, kept light near the PDF viewer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-28 -right-28 w-[26rem] h-[26rem] bg-blue-500/[0.10] rounded-full blur-3xl" />
        <div className="absolute -top-10 -left-16 w-72 h-72 bg-orange-400/[0.09] rounded-full blur-3xl" />
      </div>

      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                My Resume
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-gray-900">
              Curriculum <span className="text-blue-600">Vitae</span>
            </h1>
          </div>

          {/* Only TWO buttons */}
          {fileId && (
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-colors duration-300 no-underline shadow-md shadow-blue-600/20 hover:shadow-orange-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={openUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-colors duration-300 no-underline shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open
              </motion.a>
            </div>
          )}
        </motion.div>

        {/* PDF Preview */}
        {previewUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="bg-slate-100/70 border border-gray-200/90 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50"
          >
            {/* Top bar — mac style */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200/80 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
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
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-slate-100/70 border border-gray-200/90 rounded-2xl p-16 flex flex-col items-center justify-center gap-4 shadow-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
              Resume not available yet
            </p>
          </motion.div>
        )}

        {/* Bottom bar — mobile friendly */}
        {fileId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-100/70 border border-gray-200/90 rounded-2xl px-5 py-4 shadow-sm"
          >
            <p className="text-xs text-gray-500 text-center sm:text-left">
              Having trouble viewing? Download directly.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-orange-500 text-white px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-colors duration-300 no-underline shadow-md shadow-blue-600/20 hover:shadow-orange-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resume;
