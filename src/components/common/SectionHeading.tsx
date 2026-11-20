import React from 'react';

export interface SectionHeadingProps {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center';
  maxWidth?: string;
  className?: string;
}

/**
 * SectionHeading - Reusable section header primitive.
 * Adheres to SRP (Single Responsibility for typography & structure)
 * and OCP (Open for custom ReactNodes and alignment extension).
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  maxWidth = 'max-w-2xl',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col gap-2 ${
        isCenter ? `items-center text-center mx-auto ${maxWidth}` : maxWidth
      } ${className}`}
    >
      <span className="font-label-code text-label-code text-tertiary uppercase tracking-widest font-mono">
        {eyebrow}
      </span>
      <h2 className="font-headline-lg text-headline-lg font-bold text-text-primary tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="font-body-md text-body-md text-text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
