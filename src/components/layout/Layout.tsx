import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLenisScroll } from '../../hooks/useLenisScroll';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Initialize buttery smooth momentum inertia scrolling
  useLenisScroll();

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
