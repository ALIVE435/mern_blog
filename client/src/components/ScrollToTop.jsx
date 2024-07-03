import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//every time the url-pathname changes, window scroll us to the top

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;