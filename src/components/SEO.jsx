import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description }) {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = 'Vinfowise IT Solutions | Smart IT Solutions';
    document.title = title ? `${title} | Vinfowise IT Solutions` : baseTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname, title, description]);

  return null;
}
