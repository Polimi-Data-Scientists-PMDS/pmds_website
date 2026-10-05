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
    <div className="group flex flex-col bg-surface/80 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-3xl transition-colors duration-300 relative card-hover-elevate">
      {post.imageUrl && post.imageUrl !== '/placeholder.jpg' && (
        <LinkWrapper
          {...wrapperProps}
          className="w-full h-[200px] relative overflow-hidden rounded-t-3xl block"
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
            priority={priority}
          />
          {post.externalUrl && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 border border-white/10 text-foreground flex items-center gap-1.5">
              <FaExternalLinkAlt size={10} /> External
            </div>
          )}
        </LinkWrapper>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-accent text-xs font-bold uppercase tracking-wider">
            {post.date}
          </span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-muted text-[10px] font-medium uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <LinkWrapper {...wrapperProps} className="inline-block">
          <h3 className="text-foreground text-xl font-bold mb-3 leading-snug group-hover:text-accent transition-colors">
            {post.title}
          </h3>
        </LinkWrapper>
        <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
          {post.authors && post.authors.length !== 0 ? (
            <div className="relative z-10">
              <PeopleGroup size="sm" people={post.authors} />
            </div>
          ) : (
            <div></div>
          )}

          <LinkWrapper
            {...wrapperProps}
            className="text-muted hover:text-accent group-hover:text-accent text-xs font-bold flex items-center gap-1.5 transition-colors"
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
