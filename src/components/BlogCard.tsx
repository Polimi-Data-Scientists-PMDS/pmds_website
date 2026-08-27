import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  const CardWrapper = post.externalUrl ? 'a' : Link;
  const wrapperProps = post.externalUrl 
    ? { href: post.externalUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: `/blog/${post.slug}` };

  return (
    <CardWrapper 
      {...wrapperProps}
      className="group flex flex-col bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden transition-all duration-300"
    >
      {/* Image Container */}
      {post.imageUrl && post.imageUrl !== "/placeholder.jpg" && (
        <div className="w-full h-[200px] relative overflow-hidden">
          <Image 
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
          {/* Legacy Substack Badge */}
          {post.externalUrl && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/40 border border-white/10 text-white flex items-center gap-1.5">
              <FaExternalLinkAlt size={10} /> External
            </div>
          )}
        </div>
      )}

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#4b6ffe] text-[12px] font-bold uppercase tracking-wider">{post.date}</span>
        </div>
        
        <h3 className="text-white text-[20px] font-bold mb-3 leading-snug group-hover:text-[#4b6ffe] transition-colors">{post.title}</h3>
        <p className="text-zinc-400 text-[14px] leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
        
        {/* Footer: Authors and Action */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
          
          {/* Authors */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {post.authors.map((author, i) => (
                <div key={i} className="w-7 h-7 rounded-full border border-[#0a0a0a] bg-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-400 text-xs shrink-0" title={author.name}>
                  {author.avatar ? (
                    <Image src={author.avatar} alt={author.name} fill className="object-cover" unoptimized />
                  ) : (
                    author.name.charAt(0)
                  )}
                </div>
              ))}
            </div>
            {post.authors.length === 1 && (
              <span className="text-zinc-500 text-[12px] font-medium ml-1">{post.authors[0].name}</span>
            )}
          </div>

          {/* Read Indicator */}
          <div className="text-zinc-500 group-hover:text-[#4b6ffe] text-[13px] font-bold flex items-center gap-1.5 transition-colors">
            {post.externalUrl ? (
              <>Read <FaExternalLinkAlt size={10} /></>
            ) : (
              <>Read Article <FaArrowRight size={10} /></>
            )}
          </div>
        </div>

      </div>
    </CardWrapper>
  );
}
