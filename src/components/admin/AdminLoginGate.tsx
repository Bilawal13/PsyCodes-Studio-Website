import React, { useState, useEffect } from 'react';
import { Shield, Key, AlertCircle, Lock, ShieldAlert } from 'lucide-react';
import { SEO } from '../common/SEO';
import { isSupabaseConfigured, supabase } from '../../lib/supabase/client';

export interface AdminLoginGateProps {
  onSuccess: () => void;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * AdminLoginGate - Fortified Authentication Gate for the Studio Command Core.
 * Security Features:
 * 1. Strict Supabase Server-Side JWT Authentication (No hardcoded credentials).
 * 2. Client-Side Brute-Force Rate Limiting (Lockout after 5 failed attempts).
 * 3. Ephemeral Session Storage only (zero persistent credentials on disk).
 * 4. Password masking and memory clearance on failure.
 */
export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onSuccess }) => {
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Check lockout status from sessionStorage
  useEffect(() => {
    const checkLockout = () => {
      const lockUntil = Number(sessionStorage.getItem('psy_gate_lockout') || '0');
      const now = Date.now();
      if (lockUntil > now) {
        setLockoutRemaining(Math.ceil((lockUntil - now) / 1000));
      } else {
        setLockoutRemaining(0);
        sessionStorage.removeItem('psy_gate_lockout');
      }
    };

    checkLockout();
    const timer = setInterval(checkLockout, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    setAuthError('');
    setIsAuthLoading(true);

    // Strict Supabase Auth Authentication (No hardcoded or manual plain-text credentials)
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail.trim(),
          password: authPassword,
        });

        if (!error && data?.session) {
          sessionStorage.removeItem('psy_failed_attempts');
          sessionStorage.removeItem('psy_gate_lockout');
          sessionStorage.setItem('psy_admin_active_session', 'true');
          localStorage.removeItem('psy_admin_auth');
          setIsAuthLoading(false);
          onSuccess();
          return;
        } else if (error) {
          console.warn('Supabase auth failure:', error.message);
        }
      } catch (err) {
        console.warn('Supabase auth attempt error:', err);
      }
    } else {
      setAuthError('Authentication service is not configured. Please verify your Supabase environment settings.');
      setIsAuthLoading(false);
      return;
    }

    // Record failed attempt
    const failedCount = Number(sessionStorage.getItem('psy_failed_attempts') || '0') + 1;
    sessionStorage.setItem('psy_failed_attempts', String(failedCount));

    if (failedCount >= MAX_FAILED_ATTEMPTS) {
      const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
      sessionStorage.setItem('psy_gate_lockout', String(lockUntil));
      sessionStorage.removeItem('psy_failed_attempts');
      setLockoutRemaining(Math.ceil(LOCKOUT_DURATION_MS / 1000));
      setAuthError('SECURITY LOCKOUT: Too many failed authentication attempts. Access locked for 5 minutes.');
    } else {
      setAuthError(`Invalid credentials. ${MAX_FAILED_ATTEMPTS - failedCount} attempt(s) remaining.`);
    }

    // Clear password field for security
    setAuthPassword('');
    setIsAuthLoading(false);
  };

  const isLocked = lockoutRemaining > 0;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 relative">
      <SEO title="Studio Command Core · Admin Gate" />

      {/* Ambient security backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full p-8 rounded-3xl bg-surface-container/95 border border-border-glass backdrop-blur-2xl shadow-2xl relative text-left">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-surface-deep flex items-center justify-center text-cyan-400 mb-4 border border-cyan-400/30 shadow-[0_0_20px_rgba(24,217,246,0.2)]">
            {isLocked ? (
              <ShieldAlert className="w-7 h-7 text-red-400 animate-pulse" />
            ) : (
              <Shield className="w-7 h-7" />
            )}
          </div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight">
            Studio Command Core
          </h1>
          <p className="text-xs text-text-muted font-mono mt-1">
            RESTRICTED SECTOR · ENCRYPTED HANDSHAKE REQUIRED
          </p>
        </div>

        {isLocked && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-xs font-mono text-red-300 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">CONSOLE LOCKED</span>
              <span>Too many invalid attempts. Cooling down: {lockoutRemaining}s</span>
            </div>
          </div>
        )}

        {authError && !isLocked && (
          <div className="mb-6 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-2">
              ARCHITECT IDENTIFIER (EMAIL)
            </label>
            <input
              type="email"
              required
              disabled={isLocked || isAuthLoading}
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="architect@domain.com"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white font-mono text-xs focus:border-cyan-400 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-2">
              CIPHER TOKEN (PASSWORD)
            </label>
            <input
              type="password"
              required
              disabled={isLocked || isAuthLoading}
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="••••••••••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white font-mono text-xs focus:border-cyan-400 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLocked || isAuthLoading || !authEmail || !authPassword}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-primary-container text-black font-bold font-button-text text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-400/25 transition-all cursor-pointer mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Key className="w-4 h-4" />
            <span>
              {isAuthLoading
                ? 'Authenticating Handshake...'
                : isLocked
                ? `Locked (${lockoutRemaining}s)`
                : 'Authenticate & Decrypt'}
            </span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-border-glass/40 text-center text-[11px] font-mono text-text-muted/60">
          <span>Encrypted Session · Auto-locks on navigation or 10m inactivity</span>
        </div>
      </div>
    </div>
  );
};
