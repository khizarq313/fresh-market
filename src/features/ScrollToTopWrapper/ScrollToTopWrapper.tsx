import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopWrapper = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollableContainer = document.body;
    if (scrollableContainer) {
      setTimeout(() => {
        scrollableContainer.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },300)
    }
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTopWrapper;
