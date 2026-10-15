import { useEffect, useState } from "react";
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
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

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

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="admin-shell min-h-screen flex flex-col md:flex-row relative">
      {/* Top Mobile Navbar (Hidden on Desktop) */}
      <div className="admin-mobile-header md:hidden z-20 flex items-center justify-between p-4 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="admin-brand-mark w-8 h-8 rounded-lg flex items-center justify-center">
            <Braces className="w-5 h-5" />
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
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="admin-menu-toggle p-2 rounded-lg bg-transparent border-none cursor-pointer"
          aria-label={isOpen ? "Close admin navigation" : "Open admin navigation"}
          aria-expanded={isOpen}
          aria-controls="admin-sidebar"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay (Closes menu when clicked outside) */}
      {isOpen && (
        <button
          type="button"
          className="admin-mobile-backdrop fixed inset-0 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close admin navigation"
        />
      )}

      {/* Sidebar (Responsive Overlay on Mobile, Fixed Sidebar on Desktop) */}
      <aside
        id="admin-sidebar"
        className={`
          admin-sidebar fixed md:sticky top-0 left-0 bottom-0 z-30
          w-64 flex-shrink-0 border-r
          flex flex-col transform transition-transform duration-300 ease-in-out h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Desktop Logo Wrapper (Hidden on Mobile Header) */}
        <div className="admin-sidebar-brand hidden md:block p-6 border-b">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="admin-brand-mark w-9 h-9 rounded-xl flex items-center justify-center">
              <Braces className="w-5 h-5" />
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
        <nav className="admin-navigation flex-1 p-4 flex flex-col gap-1 overflow-y-auto" aria-label="Admin sections">
          {links.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)} // Closes mobile drawer on link click
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] transition-all duration-200 no-underline ${
                pathname === path
                  ? "admin-navigation__link--active text-white"
                  : "admin-navigation__link text-slate-400"
              }`}
              aria-current={pathname === path ? "page" : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="admin-sidebar-footer p-4 border-t">
          <button
            type="button"
            onClick={handleLogout}
            className="admin-logout w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.08em] transition-all duration-200 cursor-pointer border bg-transparent"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main flex-1 overflow-auto p-4 sm:p-6 md:p-8 z-10 w-full">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
