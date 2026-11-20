import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on every route transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-tertiary/20 selection:text-tertiary">
      <Navbar />
      <main className="w-full pt-20 lg:pt-24 bg-surface flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
