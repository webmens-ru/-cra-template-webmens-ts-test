import { useEffect } from 'react';

const useBX24Window = () => {
  const resizeIframe = () => {
    if (window.BX24 && window.BX24.resizeWindow) {
      const size = BX24.getScrollSize()
      window.BX24.resizeWindow(size.scrollWidth, size.scrollHeight);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && window._APP_TYPE_ !== 'site') {
      resizeIframe();
    }

    window.addEventListener('resize', resizeIframe);

    return () => {
      window.removeEventListener('resize', resizeIframe);
    };
  }, []);
};

export default useBX24Window;