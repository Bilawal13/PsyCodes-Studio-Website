import React from 'react';

export interface FilterOption {
  id: string;
  label: string;
}

export interface ProjectFilterBarProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

/**
 * ProjectFilterBar - Filter navigation pill group.
 * Single Responsibility: Handling filter tab rendering and user selection.
 */
export const ProjectFilterBar: React.FC<ProjectFilterBarProps> = ({
  options,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-space-xl scrollbar-none w-full border-b border-border-glass/40">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`px-4 py-2 rounded-lg font-button-text text-button-text transition-all whitespace-nowrap text-xs shrink-0 cursor-pointer ${
            activeFilter === option.id
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
              : 'bg-surface-deep text-on-surface-variant hover:text-text-primary border border-border-glass'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
