import { cn } from '@/shared/lib/utils';
import DynamicLink from '../ui/DynamicLink';

interface FooterSectionProps {
  title: string;
  links: { text: string; href: string; accent?: boolean }[];
}

export function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div className="flex flex-col gap-4 md:w-1/3 md:pl-16">
      <h4 className="text-foreground text-sm font-semibold mb-2 tracking-wide">
        {title}
      </h4>
      {links.map((link, index) => (
        <DynamicLink
          key={index}
          href={link.href}
          className={cn(
            'hover:underline underline-offset-2 text-sm transition-colors text-nowrap',
            link.accent
              ? 'text-accent hover:text-accent-secondary font-medium'
              : 'text-muted hover:text-foreground',
          )}
        >
          {link.text}
        </DynamicLink>
      ))}
    </div>
  );
}
