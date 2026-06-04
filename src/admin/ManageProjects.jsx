import { useEffect, useState } from "react";
import { Trash2, Plus, ExternalLink, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const empty = {
  title: "",
  description: "",
  tech_stack: "",
  live_url: "",
  github_url: "",
  is_featured: false,
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append("image", image);

      if (editId) {
        await API.put(`/projects/${editId}`, formData);
        toast.success("Project updated!");
      } else {
        await API.post("/projects", formData);
        toast.success("Project created!");
      }
      setForm(empty);
      setImage(null);
      setEditId(null);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack,
      live_url: project.live_url || "",
      github_url: project.github_url || "",
      is_featured: project.is_featured,
    });
    setEditId(project._id);
    setShowForm(true);
    // Smooth scroll up to the entry form layout on mobile viewports
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      toast.success("Project deleted!");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto w-full">
        {/* Header (Stack elements cleanly on small phones) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
            Projects
          </h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(empty);
              setEditId(null);
            }}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-50 text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none w-max shadow-lg shadow-indigo-600/10"
          >
            <Plus className="w-6 h-7 sm:w-6 sm:h-6" /> Add Project
          </button>
        </div>

        {/* Form Container */}
        {showForm && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-6 mb-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">
              {editId ? "Edit Project" : "New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Title *
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    required
                    placeholder="Project title"
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Tech Stack *
                  </label>
                  <input
                    value={form.tech_stack}
                    onChange={(e) =>
                      setForm({ ...form, tech_stack: e.target.value })
                    }
                    required
                    placeholder="React, Node.js, MongoDB"
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  rows={3}
                  placeholder="Project description"
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 resize-none w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Live URL
                  </label>
                  <input
                    value={form.live_url}
                    onChange={(e) =>
                      setForm({ ...form, live_url: e.target.value })
                    }
                    placeholder="https://yourapp.com"
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    GitHub URL
                  </label>
                  <input
                    value={form.github_url}
                    onChange={(e) =>
                      setForm({ ...form, github_url: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-slate-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-indigo-600/20 file:text-indigo-400 file:cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.is_featured}
                  onChange={(e) =>
                    setForm({ ...form, is_featured: e.target.checked })
                  }
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 cursor-pointer select-none"
                >
                  Featured Project
                </label>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 sm:py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none disabled:opacity-50"
                >
                  {loading ? "Saving..." : editId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setForm(empty);
                  }}
                  className="flex-1 sm:flex-none bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 px-6 py-3 sm:py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border border-white/[0.07]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List Container */}
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative"
            >
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full sm:w-16 h-40 sm:h-16 rounded-xl object-cover flex-shrink-0"
                />
              )}

              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-white font-black uppercase text-sm mb-1 tracking-wide">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-xs line-clamp-2 sm:line-clamp-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech_stack
                    ?.split(",")
                    .slice(0, 4)
                    .map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-black uppercase bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full"
                      >
                        {t.trim()}
                      </span>
                    ))}
                </div>
              </div>

              {/* Action Buttons Row (Fills full width on mobile viewports) */}
              <div className="flex items-center justify-end gap-2 border-t border-white/[0.04] sm:border-none pt-3 sm:pt-0 w-full sm:w-auto flex-shrink-0">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(project)}
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageProjects;
