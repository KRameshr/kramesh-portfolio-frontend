import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const metadata = {
  "/": ["Kuruba Ramesh | Developer Portfolio", "Portfolio of Kuruba Ramesh, a software developer."],
  "/projects": ["Projects | Kuruba Ramesh", "Selected projects by Kuruba Ramesh."],
  "/skills": ["Skills | Kuruba Ramesh", "Technical skills and tools managed in the portfolio."],
  "/blog": ["Blog | Kuruba Ramesh", "Articles and writing by Kuruba Ramesh."],
  "/contact": ["Contact | Kuruba Ramesh", "Contact Kuruba Ramesh."],
  "/resume": ["Resume | Kuruba Ramesh", "Resume of Kuruba Ramesh."],
  "/privacy-policy": ["Privacy Policy | Kuruba Ramesh", "Privacy policy for this website."],
  "/data-deletion": ["Data Deletion | Kuruba Ramesh", "Information about data deletion requests."],
  "/terms-of-service": ["Terms of Service | Kuruba Ramesh", "Terms of service for this website."],
};

const PageMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const [title, description] = metadata[pathname] ||
      (pathname.startsWith("/blog/")
        ? ["Blog Article | Kuruba Ramesh", "Article by Kuruba Ramesh."]
        : pathname.startsWith("/projects/")
          ? ["Project | Kuruba Ramesh", "Project details from Kuruba Ramesh's portfolio."]
        : ["Page not found | Kuruba Ramesh", "The requested page could not be found."]);
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute("content", title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  }, [pathname]);

  return null;
};

export default PageMetadata;
