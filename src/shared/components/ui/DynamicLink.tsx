import Link from 'next/link';

interface DynamicLinkProps {
  href: string;
}

export default function DynamicLink({
  href,
  children,
  ...props
}: DynamicLinkProps & React.HTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith('/');

  const LinkWrapper = isInternal ? Link : 'a';
  const wrapperProps = isInternal
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <LinkWrapper href={href} {...wrapperProps} {...props}>
      {children}
    </LinkWrapper>
  );
}
