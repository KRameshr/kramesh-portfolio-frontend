import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const ManageAbout = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    github: "",
    linkedin: "",
    email: "",
    resume_url: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/about").then((res) => {
      if (res.data) {
        setForm({
          name: res.data.name || "",
          title: res.data.title || "",
          bio: res.data.bio || "",
          github: res.data.github || "",
          linkedin: res.data.linkedin || "",
          email: res.data.email || "",
          resume_url: res.data.resume_url || "",
        });
        if (res.data.image_url) setPreview(res.data.image_url);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append("image", image);
      await API.put("/about", formData);
      toast.success("About updated!");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black uppercase text-white mb-8">
          About & Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Profile Image */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">
              Profile Photo
            </p>
            <div className="flex items-center gap-6">
              {preview && (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover border border-white/[0.1]"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                className="text-sm text-slate-400"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">
              Basic Info
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  key: "name",
                  label: "Full Name",
                  placeholder: "Kuruba Ramesh",
                },
                {
                  key: "title",
                  label: "Title",
                  placeholder: "Full Stack Developer",
                },
                { key: "email", label: "Email", placeholder: "you@gmail.com" },
                {
                  key: "github",
                  label: "GitHub URL",
                  placeholder: "https://github.com/...",
                },
                {
                  key: "linkedin",
                  label: "LinkedIn URL",
                  placeholder: "https://linkedin.com/...",
                },
                {
                  key: "resume_url",
                  label: "Resume URL (Google Drive)",
                  placeholder: "https://drive.google.com/...",
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
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">
              Bio
            </p>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              placeholder="Write about yourself..."
              className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-4 px-6 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none disabled:opacity-50 shadow-[0_0_20px_rgba(99,102,241,0.3)] w-max mx-auto sm:mx-0"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ManageAbout;
