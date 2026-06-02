import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";

// Admin pages
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ManageProjects from "./admin/ManageProjects";
import ManageSkills from "./admin/ManageSkills";
import ManageBlogs from "./admin/ManageBlogs";
import ManageAbout from "./admin/ManageAbout";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
              <Footer />
            </>
          }
        />
        <Route
          path="/skills"
          element={
            <>
              <Navbar />
              <Skills />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <Blog />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <>
              <Navbar />
              <BlogDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/resume"
          element={
            <>
              <Navbar />
              <Resume />
              <Footer />
            </>
          }
        />

        {/* Admin routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/projects" element={<ManageProjects />} />
        <Route path="/admin/skills" element={<ManageSkills />} />
        <Route path="/admin/blogs" element={<ManageBlogs />} />
        <Route path="/admin/about" element={<ManageAbout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
