import { useEffect, useState } from "react";
import { Trash2, Plus, Pencil, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const empty = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  is_published: false,
};

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchBlogs = async () => {
    const res = await API.get("/blogs/all");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Auto generate slug from title
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append("cover_image", image);

      if (editId) {
        await API.put(`/blogs/${editId}`, formData);
        toast.success("Blog updated!");
      } else {
        await API.post("/blogs", formData);
        toast.success("Blog created!");
      }
      setForm(empty);
      setImage(null);
      setEditId(null);
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt || "",
      is_published: blog.is_published,
    });
    setEditId(blog._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    await API.delete(`/blogs/${id}`);
    toast.success("Blog deleted!");
    fetchBlogs();
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black uppercase text-white">Blogs</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setForm(empty);
              setEditId(null);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none"
          >
            <Plus className="w-4 h-6" /> New Blog
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6">
              {editId ? "Edit Blog" : "New Blog"}
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
                      setForm({
                        ...form,
                        title: e.target.value,
                        slug: generateSlug(e.target.value),
                      })
                    }
                    required
                    placeholder="Blog title"
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Slug *
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                    placeholder="blog-title-url"
                    className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Excerpt
                </label>
                <input
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  placeholder="Short description"
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Content *
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  required
                  rows={8}
                  placeholder="Write your blog content here..."
                  className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 resize-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="text-sm text-slate-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.is_published}
                  onChange={(e) =>
                    setForm({ ...form, is_published: e.target.checked })
                  }
                  className="w-4 h-4 accent-indigo-500"
                />
                <label
                  htmlFor="published"
                  className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400"
                >
                  Publish Now
                </label>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border-none disabled:opacity-50"
                >
                  {loading ? "Saving..." : editId ? "Update" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                    setForm(empty);
                  }}
                  className="bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all cursor-pointer border border-white/[0.07]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blogs List */}
        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 flex items-center gap-4"
            >
              {blog.cover_image_url && (
                <img
                  src={blog.cover_image_url}
                  alt={blog.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-black uppercase text-sm">
                    {blog.title}
                  </h3>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      blog.is_published
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                    }`}
                  >
                    {blog.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-slate-500 text-xs">{blog.slug}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(blog)}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageBlogs;
