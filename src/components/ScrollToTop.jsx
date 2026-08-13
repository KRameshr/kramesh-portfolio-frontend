import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // useLayoutEffect runs before the browser paints — avoids any visible
  // flash/slide of the previous page's scroll position on route change
  useLayoutEffect(() => {
    // Directly set scrollTop instead of scrollTo to fully bypass any
    // CSS `scroll-behavior: smooth` set on html/body that can override
    // the JS "instant" behavior in some browsers (notably Firefox).
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Safari fallback
  }, [pathname]);

  return null;
};

export default ScrollToTop;
