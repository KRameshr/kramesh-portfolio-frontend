import { useEffect, useState } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const empty = { name: "", category: "frontend", proficiency: 80 };
const categories = [
  "frontend",
  "backend",
  "database",
  "tools",
  "programming",
  "other",
];

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await API.get("/skills");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/skills/${editId}`, form);
        toast.success("Skill updated!");
      } else {
        await API.post("/skills", form);
        toast.success("Skill created!");
      }
      setForm(empty);
      setEditId(null);
      setShowForm(false);
      fetchSkills();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await API.delete(`/skills/${id}`);
      toast.success("Skill deleted!");
      fetchSkills();
    } catch (err) {
      toast.error("Failed to delete skill.");
    }
  };

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto w-full">
        {/* Responsive Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
            Skills
          </h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(empty);
              setEditId(null);
            }}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-50 text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none w-max shadow-lg shadow-indigo-600/10"
          >
            <Plus className="w-5 h-8 sm:w-5 sm:h-6" /> Add Skill
          </button>
        </div>

        {/* Form Container */}
        {showForm && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-6 mb-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">
              {editId ? "Edit Skill" : "New Skill"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="React.js"
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50 w-full cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-slate-900">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 justify-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Proficiency: {form.proficiency}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={form.proficiency}
                    onChange={(e) =>
                      setForm({ ...form, proficiency: Number(e.target.value) })
                    }
                    className="accent-indigo-500 mt-2 cursor-pointer w-full"
                  />
                </div>
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

        {/* Skills by Category List */}
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-3 pl-1">
              {cat}
            </p>
            <div className="flex flex-col gap-2.5">
              {items.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="text-xs sm:text-sm font-black uppercase text-white truncate tracking-wide">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-black text-slate-500 flex-shrink-0">
                        {skill.proficiency}%
                      </span>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>

                  {/* Responsive Touch-Friendly Action Controls */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        setForm({
                          name: skill.name,
                          category: skill.category,
                          proficiency: skill.proficiency,
                        });
                        setEditId(skill._id);
                        setShowForm(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageSkills;
