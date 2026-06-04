import { useEffect, useState } from "react";
import { Trash2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../components/admin/AdminLayout";
import API from "../api/axios";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/contact/messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await API.delete(`/contact/messages/${id}`);
      toast.success("Message deleted!");
      fetchMessages();
    } catch (err) {
      toast.error("Failed to delete the message.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto w-full">
        {/* Responsive Header Section */}
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-white mb-8 tracking-wide">
          Messages{" "}
          <span className="text-indigo-400 text-lg sm:text-xl ml-1">
            ({messages.length})
          </span>
        </h1>

        {messages.length === 0 ? (
          /* Empty State View */
          <div className="flex flex-col items-center justify-center py-20 gap-3 border border-dashed border-white/[0.05] rounded-2xl bg-white/[0.01]">
            <Mail className="w-10 h-10 text-slate-700" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
              No messages yet
            </p>
          </div>
        ) : (
          /* Message Cards Container */
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:border-white/[0.1]"
              >
                {/* Info and Actions Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-white font-black uppercase text-sm mb-0.5 tracking-wide truncate">
                      {msg.name}
                    </h3>
                    <p className="text-indigo-400 text-xs font-bold break-all">
                      {msg.email}
                    </p>
                  </div>

                  {/* Date Badge and Trash Interaction Alignment */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 border-t border-white/[0.04] sm:border-none pt-3 sm:pt-0">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Optional Message Field Subject Details */}
                {msg.subject && (
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-2 break-words">
                    Subject: {msg.subject}
                  </p>
                )}

                {/* Primary Message Field Segment */}
                <p className="text-slate-400 text-sm leading-relaxed break-words whitespace-pre-wrap">
                  {msg.message}
                </p>

                {/* Interactive Dynamic Action Footer */}
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <a
                    href={`mailto:${msg.email}`}
                    className="flex items-center justify-center sm:justify-start gap-2 bg-white/[0.02] sm:bg-transparent hover:bg-white/[0.05] sm:hover:bg-transparent border border-white/[0.05] sm:border-none py-2.5 sm:py-0 px-4 sm:px-0 rounded-xl sm:rounded-none text-[10px] font-black uppercase tracking-[0.1em] text-indigo-400 hover:text-indigo-300 no-underline w-full sm:w-fit transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Reply
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageMessages;
