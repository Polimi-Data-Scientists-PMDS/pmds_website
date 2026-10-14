import { cn } from '@/shared/lib/utils';
import DynamicLink from '../ui/DynamicLink';

interface FooterSectionProps {
  title: string;
  links: { text: string; href: string; accent?: boolean }[];
}

export function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div className="flex flex-col gap-4 md:w-1/3 md:pl-16">
      <h4 className="mb-2 text-sm font-semibold tracking-wide text-foreground">
        {title}
      </h4>
      {links.map((link, index) => (
        <DynamicLink
          key={index}
          href={link.href}
          className={cn(
            'text-sm text-nowrap underline-offset-2 transition-colors hover:underline',
            link.accent
              ? 'font-medium text-accent hover:text-accent-secondary'
              : 'text-muted hover:text-foreground',
          )}
        >
          {link.text}
        </DynamicLink>
      ))}
    </div>
  );
}
