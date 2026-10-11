import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { BlogPost } from '@/shared/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

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
    <div className="group card-hover-elevate relative flex flex-col rounded-3xl border border-white/5 bg-surface/80 backdrop-blur-sm transition-colors duration-300 hover:border-white/10">
      {post.imageUrl && post.imageUrl !== '/placeholder.jpg' && (
        <LinkWrapper
          {...wrapperProps}
          className="relative block h-[200px] w-full overflow-hidden rounded-t-3xl"
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
            priority={priority}
          />
          {post.externalUrl && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-bold tracking-wider text-foreground uppercase backdrop-blur-md">
              <FaExternalLinkAlt size={10} /> External
            </div>
          )}
        </LinkWrapper>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-accent uppercase">
            {post.date}
          </span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-muted uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <LinkWrapper {...wrapperProps} className="inline-block">
          <h3 className="mb-3 text-xl leading-snug font-bold text-foreground transition-colors group-hover:text-accent">
            {post.title}
          </h3>
        </LinkWrapper>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
          {post.authors && post.authors.length !== 0 ? (
            <div className="relative z-10">
              <PeopleGroup size="sm" people={post.authors} />
            </div>
          ) : (
            <div></div>
          )}

          <LinkWrapper
            {...wrapperProps}
            className="flex items-center gap-1.5 text-xs font-bold text-muted transition-colors group-hover:text-accent hover:text-accent"
          >
            {post.externalUrl ? (
              <>
                Read <FaExternalLinkAlt size={10} />
              </>
            ) : (
              <>
                Read Article <FaArrowRight size={10} />
              </>
            )}
          </LinkWrapper>
        </div>
      </div>
    </div>
  );
}
