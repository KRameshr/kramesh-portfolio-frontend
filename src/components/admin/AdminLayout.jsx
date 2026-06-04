import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FolderOpen,
  Wrench,
  BookOpen,
  Award,
  GraduationCap,
  Briefcase,
  MessageSquare,
  LogOut,
  Braces,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import heroBg from "../../assets/hero-bg6.jpg";

const links = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/about", label: "About", icon: User },
  { path: "/admin/projects", label: "Projects", icon: FolderOpen },
  { path: "/admin/skills", label: "Skills", icon: Wrench },
  { path: "/admin/blogs", label: "Blogs", icon: BookOpen },
  { path: "/admin/certifications", label: "Certifications", icon: Award },
  { path: "/admin/education", label: "Education", icon: GraduationCap },
  { path: "/admin/experience", label: "Experience", icon: Briefcase },
  { path: "/admin/messages", label: "Messages", icon: MessageSquare },
];

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col md:flex-row relative">
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

      {/* Top Mobile Navbar (Hidden on Desktop) */}
      <div className="md:hidden z-20 flex items-center justify-between p-4 bg-[#020617]/90 backdrop-blur border-b border-white/[0.06] sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center">
            <Braces className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-[13px] font-black uppercase text-white leading-none">
              K.Ramesh
            </p>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-white bg-transparent border-none cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay (Closes menu when clicked outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Responsive Overlay on Mobile, Fixed Sidebar on Desktop) */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 bottom-0 z-30
          w-64 flex-shrink-0 bg-[#0d1527] md:bg-white/[0.02] border-r border-white/[0.06] 
          flex flex-col transform transition-transform duration-300 ease-in-out h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Desktop Logo Wrapper (Hidden on Mobile Header) */}
        <div className="hidden md:block p-6 border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center">
              <Braces className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-[13px] font-black uppercase text-white">
                K.Ramesh
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {links.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)} // Closes mobile drawer on link click
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] transition-all duration-200 no-underline ${
                pathname === path
                  ? "bg-indigo-600 text-white shadow-[0_2px_14px_rgba(99,102,241,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Icon className="w-5 h-6 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer border-none bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 z-10 w-full">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
