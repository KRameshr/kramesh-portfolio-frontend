import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  FolderOpen,
  GraduationCap,
  MessageSquare,
  User,
  Wrench,
} from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const cards = [
  { label: "Projects", icon: FolderOpen, path: "/admin/projects", key: "projects" },
  { label: "Skills", icon: Wrench, path: "/admin/skills", key: "skills" },
  { label: "Blog posts", icon: BookOpen, path: "/admin/blogs", key: "blogs" },
  { label: "Certifications", icon: Award, path: "/admin/certifications", key: "certifications" },
  { label: "Education", icon: GraduationCap, path: "/admin/education", key: "education" },
  { label: "Experience", icon: Briefcase, path: "/admin/experience", key: "experience" },
  { label: "Messages", icon: MessageSquare, path: "/admin/messages", key: "messages" },
];

const endpoints = [
  { key: "projects", label: "Projects", path: "/projects" },
  { key: "skills", label: "Skills", path: "/skills" },
  { key: "blogs", label: "Blog posts", path: "/blogs/all" },
  { key: "certifications", label: "Certifications", path: "/certifications" },
  { key: "education", label: "Education", path: "/education" },
  { key: "experience", label: "Experience", path: "/experience" },
  { key: "messages", label: "Messages", path: "/contact/messages" },
];

const getFailureMessage = (reason, path) => {
  const status = reason?.response?.status;
  if (status === 401 || status === 403) {
    return "Your admin session is not authorized. Sign in again and retry.";
  }
  if (status === 404) return `The API route ${path} was not found.`;
  if (!reason?.response) {
    return "The API could not be reached. Check the server and API URL.";
  }
  return `The API returned HTTP ${status}.`;
};

const Dashboard = () => {
  const [counts, setCounts] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestedKeys, setRequestedKeys] = useState(() =>
    endpoints.map(({ key }) => key),
  );

  useEffect(() => {
    let mounted = true;
    const requestedEndpoints = endpoints.filter(({ key }) =>
      requestedKeys.includes(key),
    );

    const loadCounts = async () => {
      const results = await Promise.allSettled(
        requestedEndpoints.map(({ path }) => API.get(path)),
      );
      if (!mounted) return;

      const nextCounts = {};
      const nextErrors = {};
      results.forEach((result, index) => {
        const { key, label, path } = requestedEndpoints[index];
        if (result.status === "fulfilled" && Array.isArray(result.value.data)) {
          nextCounts[key] = result.value.data.length;
        } else {
          nextErrors[key] = {
            label,
            path,
            message:
              result.status === "fulfilled"
                ? "The endpoint returned an unexpected response format."
                : getFailureMessage(result.reason, path),
          };
        }
      });

      setCounts((current) => ({ ...current, ...nextCounts }));
      setErrors((current) => {
        const remaining = { ...current };
        requestedKeys.forEach((key) => delete remaining[key]);
        return { ...remaining, ...nextErrors };
      });
      setLoading(false);
    };

    loadCounts();
    return () => {
      mounted = false;
    };
  }, [requestedKeys]);

  const failedKeys = Object.keys(errors);

  return (
    <AdminLayout>
      <div className="admin-dashboard w-full max-w-6xl mx-auto">
        <header className="admin-page-heading mb-8 md:mb-10">
          <p className="admin-eyebrow">Portfolio workspace</p>
          <h1>Dashboard</h1>
          <p>Review your content and jump to a section to make updates.</p>
        </header>

        <Link to="/admin/about" className="admin-profile-link group">
          <span className="admin-profile-link__icon" aria-hidden="true">
            <User size={21} />
          </span>
          <span className="admin-profile-link__copy">
            <span>Profile settings</span>
            <strong>About &amp; Profile</strong>
          </span>
          <ArrowUpRight className="admin-profile-link__arrow" size={18} aria-hidden="true" />
        </Link>

        <div className="admin-dashboard__section-heading">
          <h2>Content overview</h2>
          <span>
            {loading
              ? "Loading from portfolio API"
              : failedKeys.length > 0
                ? "Some totals unavailable"
                : "Current portfolio totals"}
          </span>
        </div>

        {failedKeys.length > 0 && (
          <div className="admin-dashboard__error" role="alert">
            <ul>
              {failedKeys.map((key) => (
                <li key={key}>
                  <strong>{errors[key].label}:</strong> {errors[key].message}
                </li>
              ))}
            </ul>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setRequestedKeys(failedKeys);
              }}
            >
              {loading ? "Retrying…" : "Retry failed requests"}
            </button>
          </div>
        )}

        <div className="admin-dashboard__grid" aria-busy={loading}>
          {cards.map(({ label, icon: Icon, path, key }) => (
            <Link key={path} to={path} className="admin-stat-card group">
              <span className="admin-stat-card__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="admin-stat-card__count">
                {counts[key] ?? (errors[key] ? "Unavailable" : "—")}
              </span>
              <span className="admin-stat-card__label">{label}</span>
              <ArrowUpRight className="admin-stat-card__arrow" size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
