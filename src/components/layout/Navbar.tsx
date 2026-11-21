import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { StudioLogo } from '../brand/StudioLogo';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Close mobile menu on route change and restore visibility
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsVisible(true);
    lastScrollY.current = window.scrollY;
  }, [location.pathname]);

  // Scroll listener for auto-hiding on scroll-down and re-appearing on scroll-up across all pages
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top of page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Keep navbar locked open if mobile drawer is currently active
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Delta threshold to avoid sensitive micro-jitter
      const delta = currentScrollY - lastScrollY.current;

      if (delta > 8) {
        // Scrolling down -> glide up out of view
        setIsVisible(false);
      } else if (delta < -8) {
        // Scrolling up -> glide back into view
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Play Games', path: '/arcade' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={false}
      animate={{
        y: !shouldReduceMotion ? (isVisible ? 0 : '-100%') : 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface-glass backdrop-blur-xl border-b border-border-glass shadow-[0_1px_8px_rgba(0,0,0,0.25)] w-full"
    >
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-space-md min-w-0">
          <Link to="/" className="flex items-center group focus:outline-none min-w-0">
            <StudioLogo variant="horizontal" size="sm" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-lg font-button-text text-button-text transition-all duration-200 ${isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_16px_rgba(56,144,255,0.4)]'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Action CTA, Theme Toggle & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-space-md shrink-0">
          <ThemeToggle />

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-space-lg py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 font-button-text text-button-text text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)] hover:shadow-[0_0_28px_rgba(0,242,254,0.5)] hover:-translate-y-0.5 transition-all text-xs shrink-0"
          >
            <span>Let's Build Something</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="xl:hidden p-2 sm:p-2.5 rounded-xl bg-surface-container-high/90 text-on-surface hover:text-tertiary transition-colors flex items-center justify-center border border-border-glass cursor-pointer shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden flex flex-col w-full bg-surface-deep/95 backdrop-blur-2xl px-4 sm:px-6 py-space-lg shadow-2xl gap-space-md border-b border-border-glass animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-space-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-space-md py-space-sm rounded-lg font-button-text text-button-text transition-colors ${isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="pt-space-sm border-t border-border-glass flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Theme Mode</span>
              <ThemeToggle showLabel />
            </div>
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 px-space-md py-space-sm rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 font-button-text text-button-text text-slate-950 font-bold shadow-[0_0_20px_rgba(0,242,254,0.35)] text-xs"
            >
              <span>Let's Build Something</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
};

