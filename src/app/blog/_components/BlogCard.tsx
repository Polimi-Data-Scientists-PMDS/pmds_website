import {
  Card,
  CardDetails,
  CardHeader,
  CardSubHeader,
} from '@/shared/components/ui/Card';
import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { BlogPost } from '@/shared/types';
import Link from 'next/link';

export default function BlogCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  const LinkWrapper = post.externalUrl ? 'a' : Link;
  const wrapperProps = post.externalUrl
    ? { href: post.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
    : { href: `/blog/${post.slug}` };

  return (
    <Card imageUrl={post.imageUrl} title={post.title} priority={priority}>
      <CardHeader>
        <LinkWrapper
          {...wrapperProps}
          className="after:absolute after:inset-0 after:z-10 after:rounded-3xl"
        >
          {post.title}
        </LinkWrapper>
      </CardHeader>

      <CardSubHeader>{post.date}</CardSubHeader>

      <CardDetails>{post.excerpt}</CardDetails>

      <div className="flex-1"></div>

      <div className="flex flex-row-reverse items-end justify-between gap-2">
        <span className="text-xs text-muted uppercase">
          {post.tags?.join(' | ')}
        </span>

        {post.authors && post.authors.length > 0 && (
          <PeopleGroup size="sm" people={post.authors} />
        )}
      </div>
    </Card>
  );
}
