import { BlogPost } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import PeopleGroup from './PeopleGroup';

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
    <div className="group flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-3xl transition-all duration-300">
      {post.imageUrl && post.imageUrl !== '/placeholder.jpg' && (
        <div className="w-full h-[200px] relative overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={priority}
          />
          {post.externalUrl && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 border border-white/10 text-white flex items-center gap-1.5">
              <FaExternalLinkAlt size={10} /> External
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#4b6ffe] text-[12px] font-bold uppercase tracking-wider">
            {post.date}
          </span>
        </div>

        <h3 className="text-white text-[20px] font-bold mb-3 leading-snug group-hover:text-[#4b6ffe] transition-colors">
          {post.title}
        </h3>
        <p className="text-zinc-400 text-[14px] leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
          {post.authors && post.authors.length !== 0 ? (
            <PeopleGroup size="sm" people={post.authors} />
          ) : (
            <div></div>
          )}

          <LinkWrapper
            {...wrapperProps}
            className="text-zinc-500 group-hover:text-[#4b6ffe] text-[13px] font-bold flex items-center gap-1.5 transition-colors"
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
