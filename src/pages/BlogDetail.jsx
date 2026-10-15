import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import API from "../api/axios";
import Loader from "../components/Loader";
import BlogNotFound from "../components/BlogNotFound";
import { getExternalUrl } from "../utils/links";

const parseArticleContent = (content = "") => {
  const lines = content.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = null;
  let codeLines = null;
  let quoteLines = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join("\n") });
    paragraph = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };
  const flushQuote = () => {
    if (quoteLines.length) blocks.push({ type: "quote", text: quoteLines.join("\n") });
    quoteLines = [];
  };

  for (const line of lines) {
    if (codeLines) {
      if (/^\s*```/.test(line)) {
        blocks.push({ type: "code", text: codeLines.join("\n") });
        codeLines = null;
      } else {
        codeLines.push(line);
      }
      continue;
    }

    if (/^\s*```/.test(line)) {
      flushParagraph();
      flushList();
      flushQuote();
      codeLines = [];
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    const heading = line.match(/^\s*(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push({ type: "heading", level: Math.min(heading[1].length, 3), text: heading[2] });
      continue;
    }

    const image = line.match(/^\s*!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)\s*$/);
    if (image && getExternalUrl(image[2])) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push({ type: "image", alt: image[1], src: getExternalUrl(image[2]) });
      continue;
    }

    const quote = line.match(/^\s*>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      quoteLines.push(quote[1]);
      continue;
    }
    flushQuote();

    const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const type = unordered ? "unordered-list" : "ordered-list";
      if (list?.type !== type) flushList();
      if (!list) list = { type, items: [] };
      list.items.push(unordered?.[1] || ordered[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  if (codeLines) blocks.push({ type: "code", text: codeLines.join("\n") });
  flushParagraph();
  flushList();
  flushQuote();
  return blocks;
};

const renderInlineContent = (text, keyPrefix) => {
  const tokenPattern = /`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  const nodes = [];
  let cursor = 0;
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    if (match[1]) {
      nodes.push(<code key={`${keyPrefix}-code-${match.index}`} className="blog-inline-code">{match[1]}</code>);
    } else {
      const label = match[2] || match[4];
      const href = getExternalUrl(match[3] || match[4]);
      nodes.push(href ? (
        <a key={`${keyPrefix}-link-${match.index}`} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : label);
    }
    cursor = tokenPattern.lastIndex;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [failedCoverUrl, setFailedCoverUrl] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(false);
      try {
        const [blogRes, allBlogsRes] = await Promise.all([
          API.get(`/blogs/${slug}`),
          API.get("/blogs"),
        ]);
        setBlog(blogRes.data);
        setAllBlogs(allBlogsRes.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const currentIndex = allBlogs.findIndex((item) => item.slug === slug);
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex >= 0 && currentIndex < allBlogs.length - 1
    ? allBlogs[currentIndex + 1]
    : null;

  if (loading) return <Loader />;
  if (error || !blog) return <BlogNotFound />;

  const coverUrl = getExternalUrl(blog.cover_image_url);
  const hasCover = coverUrl && failedCoverUrl !== coverUrl;
  const content = typeof blog.content === "string" ? blog.content : "";
  const blocks = parseArticleContent(content);
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = wordCount ? Math.max(1, Math.ceil(wordCount / 220)) : null;
  const publishedDate = blog.createdAt ? new Date(blog.createdAt) : null;
  const validPublishedDate = publishedDate && !Number.isNaN(publishedDate.getTime());
  const relatedBlogs = blog.category
    ? allBlogs.filter((item) => item.slug !== slug && item.category === blog.category).slice(0, 3)
    : [];

  return (
    <main className="public-page min-h-screen overflow-x-hidden bg-white text-gray-900">
      <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-gray-200/70" aria-hidden="true">
        <div className="h-full bg-orange-700 transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {prevBlog && (
        <Link to={`/blog/${prevBlog.slug}`} title={`Previous: ${prevBlog.title}`} aria-label={`Previous article: ${prevBlog.title}`} className="group fixed left-4 top-1/2 z-50 hidden h-24 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white no-underline transition-colors hover:border-orange-300 focus-visible:outline-orange-700 md:flex">
          <ChevronLeft className="h-6 w-6 text-gray-500 transition-transform group-hover:-translate-x-1 group-hover:text-orange-800" aria-hidden="true" />
        </Link>
      )}
      {nextBlog && (
        <Link to={`/blog/${nextBlog.slug}`} title={`Next: ${nextBlog.title}`} aria-label={`Next article: ${nextBlog.title}`} className="group fixed right-4 top-1/2 z-50 hidden h-24 w-12 -translate-y-1/2 items-center justify-center rounded-xl border border-gray-200 bg-white no-underline transition-colors hover:border-orange-300 focus-visible:outline-orange-700 md:flex">
          <ChevronRight className="h-6 w-6 text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-orange-800" aria-hidden="true" />
        </Link>
      )}

      <div className="px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <article className="mx-auto w-full max-w-[1000px]">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 no-underline transition-colors hover:text-orange-800">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Blog
          </Link>

          <header className="mx-auto mb-8 max-w-[760px] border-b border-gray-200 pb-7 sm:mb-9 sm:pb-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-orange-800">
              {blog.category || "Article"}
            </p>
            <h1 className="blog-article-title mb-5 text-[30px] font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-[42px]">
              {blog.title}
            </h1>

            {(validPublishedDate || blog.author || readingTime) && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                {validPublishedDate && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-700" aria-hidden="true" />
                    <time dateTime={publishedDate.toISOString()}>
                      {publishedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </time>
                  </span>
                )}
                {blog.author && <span>By {blog.author}</span>}
                {readingTime && <span>{readingTime} min read</span>}
              </div>
            )}

            {blog.excerpt && <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">{blog.excerpt}</p>}
          </header>

          {hasCover && (
            <figure className="mx-auto mb-10 w-full max-w-[900px] overflow-hidden rounded-2xl bg-[#eeece8] shadow-sm sm:mb-12">
              <img
                src={coverUrl}
                alt={blog.title || "Article cover"}
                onError={() => setFailedCoverUrl(coverUrl)}
                className="aspect-video w-full object-cover"
              />
            </figure>
          )}

          <div className="blog-article-body mx-auto w-full max-w-[760px]">
            {blocks.map((block, index) => {
              const keyPrefix = `content-${index}`;
              if (block.type === "heading") {
                const Heading = block.level === 1 ? "h2" : block.level === 2 ? "h2" : "h3";
                return <Heading key={keyPrefix} className="blog-content-heading">{renderInlineContent(block.text, keyPrefix)}</Heading>;
              }
              if (block.type === "unordered-list" || block.type === "ordered-list") {
                const List = block.type === "unordered-list" ? "ul" : "ol";
                return (
                  <List key={keyPrefix} className={`blog-content-list ${block.type === "unordered-list" ? "blog-unordered-list" : "blog-ordered-list"}`}>
                    {block.items.map((item, itemIndex) => <li key={`${keyPrefix}-${itemIndex}`}>{renderInlineContent(item, `${keyPrefix}-${itemIndex}`)}</li>)}
                  </List>
                );
              }
              if (block.type === "quote") {
                return <blockquote key={keyPrefix} className="blog-content-quote">{renderInlineContent(block.text, keyPrefix)}</blockquote>;
              }
              if (block.type === "code") {
                return <pre key={keyPrefix} className="blog-code-block"><code>{block.text}</code></pre>;
              }
              if (block.type === "image") {
                return <figure key={keyPrefix} className="blog-inline-image"><img src={block.src} alt={block.alt} loading="lazy" /></figure>;
              }
              return <p key={keyPrefix}>{renderInlineContent(block.text, keyPrefix)}</p>;
            })}
          </div>

          <div className="mx-auto mt-12 w-full max-w-[760px] border-t border-gray-200 pt-8">
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {prevBlog ? (
                <Link to={`/blog/${prevBlog.slug}`} aria-label={`Previous article: ${prevBlog.title}`} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 no-underline transition-colors hover:border-orange-300 hover:text-orange-800">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous
                </Link>
              ) : <span />}
              {nextBlog ? (
                <Link to={`/blog/${nextBlog.slug}`} aria-label={`Next article: ${nextBlog.title}`} className="flex items-center justify-end gap-2 rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700 no-underline transition-colors hover:border-orange-300 hover:text-orange-800">
                  Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : <span />}
            </div>
          </div>

          {relatedBlogs.length > 0 && (
            <section className="mx-auto mt-14 w-full max-w-[900px] border-t border-gray-200 pt-9" aria-labelledby="related-articles-title">
              <h2 id="related-articles-title" className="mb-6 text-2xl font-bold text-gray-950">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBlogs.map((item) => (
                  <Link key={item._id} to={`/blog/${item.slug}`} className="rounded-xl border border-gray-200 bg-white p-5 text-gray-900 no-underline transition-colors hover:border-orange-300 hover:bg-orange-50/50 focus-visible:outline-orange-700">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-orange-800">{item.category}</span>
                    <span className="font-semibold leading-snug">{item.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex justify-center">
            <Link to="/blog" className="portfolio-button-primary inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-semibold no-underline">
              <BookOpen className="h-4 w-4" aria-hidden="true" /> Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
};

export default BlogDetail;
