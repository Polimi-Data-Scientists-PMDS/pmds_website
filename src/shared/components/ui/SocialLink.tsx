import { IconType } from 'react-icons';
import DynamicLink from './DynamicLink';

interface SocialLinkProps {
  title: string;
  href: string;
  icon: IconType;
}

export default function SocialLink({
  title,
  href,
  icon: Icon,
}: SocialLinkProps) {
  return (
    <DynamicLink
      href={href}
      title={title}
      aria-label={title}
      className="flex size-9.5 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-muted shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-foreground"
    >
      <Icon size={16} />
    </DynamicLink>
  );
}
