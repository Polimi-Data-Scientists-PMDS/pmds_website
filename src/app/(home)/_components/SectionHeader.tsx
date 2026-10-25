import { ReactNode } from 'react';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export default function SectionHeader({
  index,
  label,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-8 border-t pt-6">
      <div className="flex items-center justify-between gap-4">
        <p className="type-label text-accent">
          {index} — {label}
        </p>
        {action}
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:items-end">
        <h2 className="type-heading text-foreground">{title}</h2>
        {description && (
          <div className="flex max-w-[550px] flex-col gap-4 border-l border-accent pl-5 type-body text-foreground-secondary">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
