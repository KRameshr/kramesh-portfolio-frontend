import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin pages

import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ManageAbout from "./admin/ManageAbout";
import ManageProjects from "./admin/ManageProjects";
import ManageSkills from "./admin/ManageSkills";
import ManageBlogs from "./admin/ManageBlogs";
import ManageCertifications from "./admin/ManageCertifications";
import ManageEducation from "./admin/ManageEducation";
import ManageExperience from "./admin/ManageExperience";
import ManageMessages from "./admin/ManageMessages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
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
        {/* admin routs */}

        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/about" element={<ManageAbout />} />
        <Route path="/admin/projects" element={<ManageProjects />} />
        <Route path="/admin/skills" element={<ManageSkills />} />
        <Route path="/admin/blogs" element={<ManageBlogs />} />
        <Route
          path="/admin/certifications"
          element={<ManageCertifications />}
        />
        <Route path="/admin/education" element={<ManageEducation />} />
        <Route path="/admin/experience" element={<ManageExperience />} />
        <Route path="/admin/messages" element={<ManageMessages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
