import React from "react";
import { getPost, getPosts } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css"; // CSS for math

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// In Next.js 15, params is a promise.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // If it's an external post, we ideally shouldn't be here (the link on the index page intercepts it),
  // but just in case, we can show a redirect message or render it anyway if it has content.

  return (
    <div className="flex flex-col min-h-screen pt-20 relative z-10 w-full mb-24">
      
      {/* Article Header */}
      <div className="max-w-[900px] mx-auto px-6 md:px-8 w-full mb-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[14px] font-medium mb-6">
          <FaArrowLeft size={12} /> Back to Blog
        </Link>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#4b6ffe] text-[12px] font-medium uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-[40px] md:text-[56px] font-bold text-white leading-tight mb-8">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between py-6 border-y border-white/10">
          {/* Authors List */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {post.authors.map((author, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-400 text-sm shrink-0">
                  {author.avatar ? (
                    <Image src={author.avatar} alt={author.name} fill className="object-cover" unoptimized />
                  ) : (
                    author.name.charAt(0)
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-white font-medium text-[15px]">
                {post.authors.map(a => a.name).join(", ")}
              </span>
              <span className="text-zinc-500 text-[13px]">{post.date}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {post.authors.map((author, i) => (
              <React.Fragment key={i}>
                {author.linkedinUrl && (
                  <a href={author.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#0A66C2] transition-colors" title={`LinkedIn ${author.name}`}>
                    <FaLinkedinIn size={14} />
                  </a>
                )}
                {author.email && (
                  <a href={`mailto:${author.email}`} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#4b6ffe] transition-colors" title={`Email ${author.name}`}>
                    <FaEnvelope size={14} />
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {post.imageUrl && post.imageUrl !== "/placeholder.jpg" && (
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-8 mb-16">
          <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <Image 
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-[900px] mx-auto px-6 md:px-8 w-full prose prose-invert prose-lg prose-a:text-[#4b6ffe] hover:prose-a:text-white prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl prose-code:before:content-none prose-code:after:content-none prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal">
        {post.content ? (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]} 
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        ) : (
          <p>No content available.</p>
        )}
      </article>

    </div>
  );
}
