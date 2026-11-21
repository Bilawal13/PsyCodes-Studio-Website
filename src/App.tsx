import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';

// Dynamic route code splitting for optimized sub-second load times
const HomePage = React.lazy(() =>
  import('./pages/Home/HomePage').then((m) => ({ default: m.HomePage }))
);
const ProjectsPage = React.lazy(() =>
  import('./pages/Projects/ProjectsPage').then((m) => ({ default: m.ProjectsPage }))
);
const ProjectDetailsPage = React.lazy(() =>
  import('./pages/ProjectDetails/ProjectDetailsPage').then((m) => ({ default: m.ProjectDetailsPage }))
);
const ServicesPage = React.lazy(() =>
  import('./pages/Services/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const ArcadePage = React.lazy(() =>
  import('./pages/Arcade/ArcadePage').then((m) => ({ default: m.ArcadePage }))
);
const GameDetailsPage = React.lazy(() =>
  import('./pages/GameDetails/GameDetailsPage').then((m) => ({ default: m.GameDetailsPage }))
);
const AboutPage = React.lazy(() =>
  import('./pages/About/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = React.lazy(() =>
  import('./pages/Contact/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const AdminPage = React.lazy(() =>
  import('./pages/Admin/AdminPage').then((m) => ({ default: m.AdminPage }))
);
const NotFoundPage = React.lazy(() =>
  import('./pages/NotFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

/**
 * RouteLoadingFallback - Sleek cyber-luxe telemetry spinner shown during route chunk streaming.
 */
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(24,217,246,0.8)] animate-pulse" />
    </div>
    <span className="font-mono text-[11px] text-text-muted tracking-widest uppercase">
      INITIALIZING GRID SUBSYSTEM...
    </span>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_PATH || '/admin-vault';

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Layout>
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/arcade" element={<ArcadePage />} />
                <Route path="/arcade/:slug" element={<GameDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path={ADMIN_ROUTE} element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
