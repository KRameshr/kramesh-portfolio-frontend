import { useEffect, useState } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const empty = {
  institution: "",
  location: "",
  degree: "",
  branch: "",
  start_date: "",
  end_date: "",
  progress: "Completed",
  is_current: false,
  display_order: 0,
};

const ManageEducation = () => {
  const [educations, setEducations] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchEducations = async () => {
    try {
      const res = await API.get("/education");
      setEducations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/education/${editId}`, form);
        toast.success("Education updated!");
      } else {
        await API.post("/education", form);
        toast.success("Education added!");
      }
      setForm(empty);
      setEditId(null);
      setShowForm(false);
      fetchEducations();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu) => {
    setForm({
      institution: edu.institution,
      location: edu.location || "",
      degree: edu.degree,
      branch: edu.branch || "",
      start_date: edu.start_date,
      end_date: edu.end_date || "",
      progress: edu.progress || "Completed",
      is_current: edu.is_current || false,
      display_order: edu.display_order || 0,
    });
    setEditId(edu._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this education?")) return;
    try {
      await API.delete(`/education/${id}`);
      toast.success("Deleted!");
      fetchEducations();
    } catch (err) {
      toast.error("Failed to delete education data.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto w-full">
        {/* Responsive Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
            Education
          </h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(empty);
              setEditId(null);
            }}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-50 text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none w-max shadow-lg shadow-indigo-600/10"
          >
            <Plus className="w-5 h-7 sm:w-5 sm:h-7" /> Add
          </button>
        </div>

        {/* Dynamic Input Form */}
        {showForm && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-6 mb-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">
              {editId ? "Edit" : "New"} Education
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    key: "institution",
                    label: "Institution *",
                    placeholder: "MITS Angallu",
                  },
                  {
                    key: "location",
                    label: "Location",
                    placeholder: "Andhra Pradesh",
                  },
                  { key: "degree", label: "Degree *", placeholder: "B.Tech" },
                  { key: "branch", label: "Branch", placeholder: "EEE" },
                  {
                    key: "start_date",
                    label: "Start Date *",
                    placeholder: "July 2019",
                  },
                  {
                    key: "end_date",
                    label: "End Date",
                    placeholder: "May 2023",
                  },
                  {
                    key: "progress",
                    label: "Progress",
                    placeholder: "Completed",
                  },
                  {
                    key: "display_order",
                    label: "Display Order",
                    placeholder: "1",
                  },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                      {label}
                    </label>
                    <input
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      placeholder={placeholder}
                      className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 w-full"
                    />
                  </div>
                ))}
              </div>

              {/* Checkbox Wrapper */}
              <div className="flex items-center gap-2.5 py-1">
                <input
                  type="checkbox"
                  id="is_current"
                  checked={form.is_current}
                  onChange={(e) =>
                    setForm({ ...form, is_current: e.target.checked })
                  }
                  className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                />
                <label
                  htmlFor="is_current"
                  className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 cursor-pointer select-none"
                >
                  Currently Studying
                </label>
              </div>

              {/* Action Triggers */}
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

        {/* Education Records List */}
        <div className="flex flex-col gap-3">
          {educations.map((edu) => (
            <div
              key={edu._id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-white font-black uppercase text-sm mb-1 tracking-wide truncate">
                  {edu.degree} {edu.branch ? `— ${edu.branch}` : ""}
                </h3>
                <p className="text-slate-500 text-xs truncate">
                  {edu.institution} {edu.location ? `· ${edu.location}` : ""}
                </p>
                <p className="text-indigo-400/80 text-[10px] font-bold uppercase tracking-wider mt-1">
                  {edu.start_date} –{" "}
                  {edu.is_current ? "Present" : edu.end_date || "Completed"}
                </p>
              </div>

              {/* Touch-Friendly Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-white/[0.04] sm:border-none pt-3 sm:pt-0 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={() => handleEdit(edu)}
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-7 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageEducation;
