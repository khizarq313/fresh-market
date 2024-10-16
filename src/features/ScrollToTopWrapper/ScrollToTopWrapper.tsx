import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopWrapper = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollableContainer = document.querySelector(".App");
    if (scrollableContainer) {
      setTimeout(() => {
        scrollableContainer.scrollTo(0, 0);
      },300)
    }
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTopWrapper;
