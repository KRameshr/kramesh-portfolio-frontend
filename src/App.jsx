import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";

// Public pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataDeletion from "./pages/DataDeletion";
import TermsOfService from "./pages/TermsOfService";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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
import NotFound from "./pages/NotFound";
import PageMetadata from "./components/PageMetadata";

function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
      {/* Resets scroll position to top on every route change */}
      <ScrollToTop />
      <PageMetadata />

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
          path="/projects/:projectId"
          element={
            <>
              <Navbar />
              <ProjectDetail />
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

        {/* Meta-required pages */}
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />

        <Route path="/data-deletion" element={<><Navbar /><DataDeletion /><Footer /></>} />

        <Route path="/terms-of-service" element={<><Navbar /><TermsOfService /><Footer /></>} />

        {/* Admin routes */}
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

        <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
      </Routes>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
