import React from 'react';

/**
 * AdminSettingsTab - Studio operational parameters and system metadata configuration.
 * Single Responsibility: Displaying and maintaining core studio identity settings.
 */
export const AdminSettingsTab: React.FC = () => {
  return (
    <div className="p-8 rounded-3xl bg-surface-container/70 border border-border-glass max-w-3xl space-y-6 text-left">
      <h2 className="text-xl font-bold font-display text-white">
        Studio Identity &amp; System Configuration
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">
            STUDIO NAME
          </label>
          <input
            type="text"
            readOnly
            value="PsyCodes Studio"
            className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white text-sm font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">
            FOUNDER &amp; LEAD ARCHITECT
          </label>
          <input
            type="text"
            readOnly
            value="Bilawal Feroze"
            className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white text-sm font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">
            LOCATION / TIMEZONE
          </label>
          <input
            type="text"
            readOnly
            value="Karachi, Pakistan (PKT / UTC+5)"
            className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white text-sm font-sans"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">
            PRIMARY CONTACT DISPATCH
          </label>
          <input
            type="email"
            readOnly
            value="psycodestech@gmail.com"
            className="w-full px-4 py-3 rounded-xl bg-surface-deep border border-border-glass text-white text-sm font-sans"
          />
        </div>
      </div>
    </div>
  );
};
