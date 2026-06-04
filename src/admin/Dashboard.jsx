import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderOpen,
  Wrench,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase,
  MessageSquare,
  User,
} from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

// Color dictionary mapping to safe Tailwind CSS classes
const colorClasses = {
  indigo: {
    bg: "bg-indigo-600/10",
    border: "border-indigo-500/20",
    hover: "hover:border-indigo-500/40",
    text: "text-indigo-400",
    iconBg: "bg-indigo-600/20",
  },
  purple: {
    bg: "bg-purple-600/10",
    border: "border-purple-500/20",
    hover: "hover:border-purple-500/40",
    text: "text-purple-400",
    iconBg: "bg-purple-600/20",
  },
  blue: {
    bg: "bg-blue-600/10",
    border: "border-blue-500/20",
    hover: "hover:border-blue-500/40",
    text: "text-blue-400",
    iconBg: "bg-blue-600/20",
  },
  emerald: {
    bg: "bg-emerald-600/10",
    border: "border-emerald-500/20",
    hover: "hover:border-emerald-500/40",
    text: "text-emerald-400",
    iconBg: "bg-emerald-600/20",
  },
  amber: {
    bg: "bg-amber-600/10",
    border: "border-amber-500/20",
    hover: "hover:border-amber-500/40",
    text: "text-amber-400",
    iconBg: "bg-amber-600/20",
  },
  rose: {
    bg: "bg-rose-600/10",
    border: "border-rose-500/20",
    hover: "hover:border-rose-500/40",
    text: "text-rose-400",
    iconBg: "bg-rose-600/20",
  },
  cyan: {
    bg: "bg-cyan-600/10",
    border: "border-cyan-500/20",
    hover: "hover:border-cyan-500/40",
    text: "text-cyan-400",
    iconBg: "bg-cyan-600/20",
  },
};

const cards = [
  {
    label: "Projects",
    icon: FolderOpen,
    path: "/admin/projects",
    key: "projects",
    color: "indigo",
  },
  {
    label: "Skills",
    icon: Wrench,
    path: "/admin/skills",
    key: "skills",
    color: "purple",
  },
  {
    label: "Blogs",
    icon: BookOpen,
    path: "/admin/blogs",
    key: "blogs",
    color: "blue",
  },
  {
    label: "Certifications",
    icon: Award,
    path: "/admin/certifications",
    key: "certifications",
    color: "emerald",
  },
  {
    label: "Education",
    icon: GraduationCap,
    path: "/admin/education",
    key: "education",
    color: "amber",
  },
  {
    label: "Experience",
    icon: Briefcase,
    path: "/admin/experience",
    key: "experience",
    color: "rose",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    path: "/admin/messages",
    key: "messages",
    color: "cyan",
  },
];
import heroBg from "../assets/hero-bg6.jpg";

const Dashboard = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projects, skills, blogs, certs, edu, exp, msgs] =
          await Promise.all([
            API.get("/projects"),
            API.get("/skills"),
            API.get("/blogs/all"),
            API.get("/certifications"),
            API.get("/education"),
            API.get("/experience"),
            API.get("/admin/messages"),
          ]);
        setCounts({
          projects: projects.data.length,
          skills: skills.data.length,
          blogs: blogs.data.length,
          certifications: certs.data.length,
          education: edu.data.length,
          experience: exp.data.length,
          messages: msgs.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto w-full">
        {/* Background Image */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15,
          }}
        />
        <div className="mb-8 md:mb-10 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 tracking-wide">
            Dashboard
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Welcome back, Ramesh! Manage your portfolio content.
          </p>
        </div>

        {/* About card */}
        <Link
          to="/admin/about"
          className="flex items-center gap-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-5 sm:p-6 mb-6 no-underline hover:border-indigo-500/40 transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">
              Manage
            </p>
            <h3 className="text-white font-black uppercase text-base sm:text-lg tracking-wide group-hover:text-indigo-300 transition-colors">
              About & Profile
            </h3>
          </div>
        </Link>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ label, icon: Icon, path, key, color }) => {
            const theme = colorClasses[color] || colorClasses.indigo;
            return (
              <Link
                key={path}
                to={path}
                className={`group bg-white/[0.02] border border-white/[0.06] ${theme.hover} rounded-2xl p-5 sm:p-6 no-underline transition-all duration-200 hover:bg-white/[0.04]`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${theme.text}`} />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {counts[key] ?? "—"}
                  </span>
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:${theme.text} transition-colors`}
                >
                  {label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
