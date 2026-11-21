import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'PsyCodes Studio · Code. Create. Automate.',
  description = 'High-velocity software architecture, fluid 60fps game mechanics, and autonomous AI systems. Founded by Bilawal Feroze.',
  image = '/assets/branding/psycodes_social_banner.jpg',
  url = 'https://www.psycodestudio.tech'
}) => {
  useEffect(() => {
    // Update Document Title
    const formattedTitle = title.includes('PsyCodes Studio')
      ? title
      : `${title} | PsyCodes Studio`;
    document.title = formattedTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', formattedTitle);
    setMeta('og:description', description);
    setMeta('og:image', image);
    setMeta('og:url', url);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', formattedTitle);
    setMeta('twitter:description', description);
  }, [title, description, image, url]);

  return null;
};
export default SEO;

