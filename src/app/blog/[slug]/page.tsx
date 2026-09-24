import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { getPost, getPosts } from '@/shared/lib/notion';
import 'katex/dist/katex.min.css'; // CSS for math
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// In Next.js 15, params is a promise.
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen pt-20 relative z-10 w-full mb-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-8 w-full mb-12">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm font-medium mb-6"
        >
          <FaArrowLeft
            size={12}
            className="group-hover:-translate-x-1 transition-transform"
          />{' '}
          Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-surface-secondary border text-accent text-xs font-medium uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center py-6 border-y border-white/5 gap-4 relative z-20">
          <PeopleGroup people={post.authors} />
          <div className="flex flex-col">
            <span className="text-foreground font-medium text-sm">
              {post.authors.map((a) => a.name).join(', ')}
            </span>
            <span className="text-muted text-xs">{post.date}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {post.imageUrl && post.imageUrl !== '/placeholder.jpg' && (
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-8 mb-16">
          <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden border shadow-2xl">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-[900px] mx-auto px-6 md:px-8 w-full prose prose-invert prose-lg prose-a:text-accent hover:prose-a:text-foreground prose-pre:bg-surface prose-pre:border prose-img:rounded-xl prose-code:before:content-none prose-code:after:content-none prose-code:bg-surface-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal">
        {post.content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            components={{
              img: (props: any) => {
                const isNotion = props.src?.includes('amazonaws');
                return (
                  <span className="block relative w-full aspect-video my-8">
                    <Image
                      src={props.src || ''}
                      alt={props.alt || ''}
                      fill
                      className="object-cover rounded-xl"
                      unoptimized={!isNotion}
                    />
                  </span>
                );
              },
            }}
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
