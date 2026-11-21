import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowLeft, Gamepad2, Layers, Briefcase, Mail, ShieldAlert } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { ScrollReveal } from '../../components/common/ScrollReveal';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <SEO
        title="Sector Not Found · 404"
        description="The requested sector does not exist or has been decommissioned from the PsyCodes Studio grid."
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/10 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <ScrollReveal direction="up" delay={0.1} duration={0.6}>
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-container/80 border border-red-500/20 backdrop-blur-xl shadow-2xl relative">
            {/* Header indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 mb-6">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ERR_404_SECTOR_NOT_FOUND</span>
            </div>

            <h1 className="text-6xl sm:text-7xl font-black font-display text-white tracking-tighter mb-4">
              4<span className="text-red-400">0</span>4
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              Grid Sector Unresolved
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-8 max-w-lg mx-auto">
              The target coordinates you transmitted do not resolve to an active PsyCodes Studio subsystem.
              The route may have been refactored or decommissioned.
            </p>

            {/* Quick Terminal Navigation Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <Link
                to="/"
                className="p-3 rounded-xl bg-surface-deep border border-border-glass hover:border-cyan-400 text-xs font-mono text-text-muted hover:text-white flex flex-col items-center gap-1.5 transition-all"
              >
                <Home className="w-4 h-4 text-cyan-400" />
                <span>HOME</span>
              </Link>

              <Link
                to="/projects"
                className="p-3 rounded-xl bg-surface-deep border border-border-glass hover:border-blue-400 text-xs font-mono text-text-muted hover:text-white flex flex-col items-center gap-1.5 transition-all"
              >
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>PROJECTS</span>
              </Link>

              <Link
                to="/services"
                className="p-3 rounded-xl bg-surface-deep border border-border-glass hover:border-cyan-400 text-xs font-mono text-text-muted hover:text-text-primary flex flex-col items-center gap-1.5 transition-all"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>SERVICES</span>
              </Link>

              <Link
                to="/arcade"
                className="p-3 rounded-xl bg-surface-deep border border-border-glass hover:border-green-400 text-xs font-mono text-text-muted hover:text-white flex flex-col items-center gap-1.5 transition-all"
              >
                <Gamepad2 className="w-4 h-4 text-green-400" />
                <span>ARCADE</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-cyan-400/30 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Main Grid</span>
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-surface-deep border border-border-glass hover:border-cyan-400 text-text-muted hover:text-white font-mono text-xs transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Report Anomalous Route</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
export default NotFoundPage;

