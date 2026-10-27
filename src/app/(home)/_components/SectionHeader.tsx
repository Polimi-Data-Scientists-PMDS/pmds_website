import { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export default function SectionHeader({
  label,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-8 border-t pt-6">
      <div className="flex items-center justify-between gap-4">
        <p className="type-label text-accent">{label}</p>
        {action}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="type-heading text-foreground">{title}</h2>
        {description && (
          <div className="flex flex-col gap-4 type-body text-foreground-secondary md:max-w-[50%]">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
