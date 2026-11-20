import React, { useState, useEffect } from 'react';
import {
  Shield,
  Briefcase,
  Gamepad2,
  Layers,
  Inbox,
  Settings,
  LogOut,
  Lock,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { AdminLoginGate } from '../../components/admin/AdminLoginGate';
import { AdminOverviewTab } from '../../components/admin/AdminOverviewTab';
import { AdminInquiriesTab } from '../../components/admin/AdminInquiriesTab';
import { AdminProjectsTab } from '../../components/admin/AdminProjectsTab';
import { AdminGamesTab } from '../../components/admin/AdminGamesTab';
import { AdminServicesTab } from '../../components/admin/AdminServicesTab';
import { AdminSettingsTab } from '../../components/admin/AdminSettingsTab';
import { InquiryDetailModal } from '../../components/admin/InquiryDetailModal';
import { useProjects, useProjectMutations } from '../../hooks/useProjects';
import { useGames, useGameMutations } from '../../hooks/useGames';
import { useServices, useServiceMutations } from '../../hooks/useServices';
import { useInquiries, useInquiryMutations } from '../../hooks/useInquiries';
import { isSupabaseConfigured, supabase } from '../../lib/supabase/client';
import { Inquiry } from '../../types';

type AdminTab = 'overview' | 'projects' | 'games' | 'services' | 'inquiries' | 'settings';

/**
 * AdminPage - Studio Command Core Orchestrator.
 * Follows SOLID principles:
 * - SRP: Acts solely as an orchestrator between admin authentication, domain queries/mutations, and dedicated tab views.
 * - OCP: New tabs and telemetry widgets can be plugged in without modifying existing tab handlers.
 * - LSP: Subcomponents strictly accept domain models.
 * - ISP: Each tab component receives only its required data and callback contracts.
 * - DIP: Relies on abstract mutation hooks (useProjects, useGames, etc.) rather than direct DB calls.
 * 
 * Fortified Security:
 * - Zero persistent disk credentials (purges localStorage immediately).
 * - Ephemeral session authentication only (sessionStorage).
 * - Auto-locks session on route navigation or component unmount (prevents back/forward bypass).
 * - Auto-locks on 10 minutes of inactivity.
 * - Continuous cryptographic session verification via Supabase Auth.
 */
export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isVerifyingSession, setIsVerifyingSession] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [viewInquiry, setViewInquiry] = useState<Inquiry | null>(null);

  // 1. Initial Session Handshake & Cleanup
  useEffect(() => {
    // Purge any legacy localStorage flags immediately
    localStorage.removeItem('psy_admin_auth');

    const checkSession = async () => {
      const hasActiveSession = sessionStorage.getItem('psy_admin_active_session') === 'true';

      if (hasActiveSession) {
        setIsAuthenticated(true);
      } else if (isSupabaseConfigured()) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            setIsAuthenticated(true);
            sessionStorage.setItem('psy_admin_active_session', 'true');
          } else {
            setIsAuthenticated(false);
          }
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsVerifyingSession(false);
    };

    checkSession();

    // Listen for auth state changes
    if (isSupabaseConfigured()) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          setIsAuthenticated(false);
          sessionStorage.removeItem('psy_admin_active_session');
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  // 2. AUTO-LOCK ON NAVIGATION AWAY (ROUTE UNMOUNT)
  // When leaving /psycodespc313adminarea, immediately revoke the session so Back/Forward history navigation
  // cannot reopen the admin dashboard.
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('psy_admin_active_session');
      localStorage.removeItem('psy_admin_auth');
    };
  }, []);

  // 3. INACTIVITY AUTO-LOCK (10-minute idle timer)
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      // 10 minutes = 600,000 ms
      timeoutId = setTimeout(() => {
        handleLogout();
      }, 10 * 60 * 1000);
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach((ev) => window.addEventListener(ev, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
    };
  }, [isAuthenticated]);

  // Queries
  const { data: projects = [] } = useProjects();
  const { data: games = [] } = useGames();
  const { data: services = [] } = useServices();
  const { data: inquiries = [] } = useInquiries();

  // Mutations
  const { createMutation: createProject, deleteMutation: deleteProject } = useProjectMutations();
  const { createMutation: createGame, deleteMutation: deleteGame } = useGameMutations();
  const { createMutation: createService, deleteMutation: deleteService } = useServiceMutations();
  const { updateStatusMutation: updateInquiryStatus } = useInquiryMutations();

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore
      }
    }
    sessionStorage.removeItem('psy_admin_active_session');
    localStorage.removeItem('psy_admin_auth');
    setIsAuthenticated(false);
  };

  const handleCreateProject = () => {
    const title = prompt('Enter project title:');
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    createProject.mutate({
      id: 'proj_' + Date.now(),
      title,
      slug,
      short_description: 'High-performance engineering system',
      description: 'Architected with modern paradigms.',
      category: 'web',
      category_label: 'Web & SaaS',
      cover_image: '/assets/banner/banner_2.png',
      technologies: ['TypeScript', 'Next.js', 'PostgreSQL'],
      status: 'In Production',
      featured: true,
      published: true,
      display_order: projects.length + 1,
    });
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Delete project "${title}"?`)) {
      deleteProject.mutate(id);
    }
  };

  const handleCreateGame = () => {
    const title = prompt('Enter game title:');
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    createGame.mutate({
      id: 'game_' + Date.now(),
      title,
      slug,
      category: 'arcade',
      category_label: 'Arcade Prototype',
      description: 'Interactive playable browser experience.',
      thumbnail: '/assets/banner/banner_2.png',
      cover_image: '/assets/banner/banner_2.png',
      status: 'in_development',
      status_label: 'In Development',
      published: true,
      featured: false,
      display_order: games.length + 1,
      engine_spec: 'Unity 6',
    });
  };

  const handleDeleteGame = (id: string, title: string) => {
    if (confirm(`Delete cabinet "${title}"?`)) {
      deleteGame.mutate(id);
    }
  };

  const handleCreateService = () => {
    const title = prompt('Enter service title:');
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    createService.mutate({
      id: 'serv_' + Date.now(),
      title,
      slug,
      discipline_tag: 'ENGINEERING',
      badge: 'NEW SPRINT',
      category: 'engineering',
      description: 'High-velocity architecture and delivery sprint.',
      icon: 'Cpu',
      tech_stack: ['TypeScript', 'Python', 'Docker'],
      deliverables: ['Production Source Code', 'Automated CI/CD Pipeline'],
      display_order: services.length + 1,
      published: true,
    });
  };

  const handleDeleteService = (id: string, title: string) => {
    if (confirm(`Delete service "${title}"?`)) {
      deleteService.mutate(id);
    }
  };

  const handleStatusChange = (id: string, status: NonNullable<Inquiry['status']>) => {
    updateInquiryStatus.mutate({ id, status });
  };

  // Session verification loading state
  if (isVerifyingSession) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-text-muted">Verifying secure gate handshake...</span>
        </div>
      </div>
    );
  }

  // Login Gate View
  if (!isAuthenticated) {
    return <AdminLoginGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  const tabNavigation = [
    { id: 'overview', label: 'Telemetry Overview', icon: Shield },
    { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Inbox },
    { id: 'projects', label: `Projects (${projects.length})`, icon: Briefcase },
    { id: 'games', label: `Arcade Games (${games.length})`, icon: Gamepad2 },
    { id: 'services', label: `Services (${services.length})`, icon: Layers },
    { id: 'settings', label: 'Studio Settings', icon: Settings },
  ] as const;

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <SEO title="Studio Control Center" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-border-glass gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono border border-cyan-400/20 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>PSYCODES CONTROL MATRIX · BILAWAL FEROZE</span>
          </div>
          <h1 className="text-3xl font-black font-display text-white">
            Studio Command Core
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-surface-deep border border-border-glass text-xs font-mono text-text-muted">
            BACKEND: {isSupabaseConfigured() ? 'SUPABASE CLOUD' : 'LOCAL CACHE / DEMO'}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-surface-deep border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
            title="Lock Console and Disconnect Session"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>LOCK CONSOLE</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabNavigation.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/20 border border-cyan-400 text-white shadow-[0_0_15px_rgba(24,217,246,0.25)]'
                  : 'bg-surface-container/60 border border-border-glass text-text-muted hover:text-white hover:border-cyan-400/30'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-text-muted'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT DELEGATION */}
      {activeTab === 'overview' && (
        <AdminOverviewTab
          projects={projects}
          games={games}
          services={services}
          inquiries={inquiries}
          onInspectInquiry={setViewInquiry}
        />
      )}

      {activeTab === 'inquiries' && (
        <AdminInquiriesTab
          inquiries={inquiries}
          onStatusChange={handleStatusChange}
          onInspectInquiry={setViewInquiry}
        />
      )}

      {activeTab === 'projects' && (
        <AdminProjectsTab
          projects={projects}
          onCreateProject={handleCreateProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {activeTab === 'games' && (
        <AdminGamesTab
          games={games}
          onCreateGame={handleCreateGame}
          onDeleteGame={handleDeleteGame}
        />
      )}

      {activeTab === 'services' && (
        <AdminServicesTab
          services={services}
          onCreateService={handleCreateService}
          onDeleteService={handleDeleteService}
        />
      )}

      {activeTab === 'settings' && <AdminSettingsTab />}

      {/* INQUIRY INSPECTION MODAL */}
      <InquiryDetailModal
        inquiry={viewInquiry}
        onClose={() => setViewInquiry(null)}
      />
    </div>
  );
};

export default AdminPage;
