import { useEffect, useState } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const empty = {
  institution_name: "",
  certificate_name: "",
  certificate_id: "",
  description: "",
  skills: "",
  start_date: "",
  end_date: "",
  credential_url: "",
  display_order: 0,
};

const ManageCertifications = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchCerts = async () => {
    try {
      const res = await API.get("/certifications");
      setCerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append("image", image);

      if (editId) {
        await API.put(`/certifications/${editId}`, formData);
        toast.success("Certification updated!");
      } else {
        await API.post("/certifications", formData);
        toast.success("Certification added!");
      }
      setForm(empty);
      setImage(null);
      setEditId(null);
      setShowForm(false);
      fetchCerts();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert) => {
    setForm({
      institution_name: cert.institution_name,
      certificate_name: cert.certificate_name,
      certificate_id: cert.certificate_id || "",
      description: cert.description || "",
      skills: cert.skills || "",
      start_date: cert.start_date || "",
      end_date: cert.end_date || "",
      credential_url: cert.credential_url || "",
      display_order: cert.display_order || 0,
    });
    setEditId(cert._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this certification?")) return;
    try {
      await API.delete(`/certifications/${id}`);
      toast.success("Deleted!");
      fetchCerts();
    } catch (err) {
      toast.error("Failed to delete certification.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto w-full">
        {/* Responsive Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">
            Certifications
          </h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(empty);
              setEditId(null);
            }}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-50 text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none w-max shadow-lg shadow-indigo-600/10"
          >
            <Plus className="w-6 h-7 sm:w-5 sm:h-7" /> Add
          </button>
        </div>

        {/* Form Layout Wrapper */}
        {showForm && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-6 mb-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">
              {editId ? "Edit" : "New"} Certification
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    key: "institution_name",
                    label: "Institution *",
                    placeholder: "IIT Roorkee",
                  },
                  {
                    key: "certificate_name",
                    label: "Certificate Name *",
                    placeholder: "Full Stack Dev",
                  },
                  {
                    key: "certificate_id",
                    label: "Certificate ID",
                    placeholder: "CERT001",
                  },
                  {
                    key: "start_date",
                    label: "Start Date",
                    placeholder: "Dec 2023",
                  },
                  {
                    key: "end_date",
                    label: "End Date",
                    placeholder: "Sep 2025",
                  },
                  {
                    key: "credential_url",
                    label: "Credential URL",
                    placeholder: "https://...",
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

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Description..."
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 resize-none w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Skills (comma separated)
                </label>
                <input
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  placeholder="React.js, Node.js, MongoDB"
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Certificate Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-slate-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-indigo-600/20 file:text-indigo-400 file:cursor-pointer"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 sm:py-3 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none disabled:opacity-50"
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
                  className="flex-1 sm:flex-none bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 px-7 py-4 sm:py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border border-white/[0.07]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Certifications Dynamic Display List */}
        <div className="flex flex-col gap-3">
          {certs.map((cert) => (
            <div
              key={cert._id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative"
            >
              {cert.image_url && (
                <img
                  src={cert.image_url}
                  alt={cert.certificate_name}
                  className="w-full sm:w-16 h-40 sm:h-16 rounded-xl object-cover flex-shrink-0"
                />
              )}

              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-white font-black uppercase text-sm mb-1 tracking-wide truncate">
                  {cert.certificate_name}
                </h3>
                <p className="text-slate-500 text-xs truncate">
                  {cert.institution_name} · {cert.end_date}
                </p>
              </div>

              {/* Touch-optimized actions block */}
              <div className="flex items-center justify-end gap-2 border-t border-white/[0.04] sm:border-none pt-3 sm:pt-0 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={() => handleEdit(cert)}
                  className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cert._id)}
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

export default ManageCertifications;
