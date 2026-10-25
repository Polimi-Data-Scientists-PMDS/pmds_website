import Button from '@/shared/components/ui/Button';
import Chip from '@/shared/components/ui/Chip';
import PeopleGroup from '@/shared/components/ui/PeopleGroup';
import { getPost, getPosts } from '@/shared/lib/notion';
import 'katex/dist/katex.min.css'; // CSS for math
import { Metadata } from 'next';
import Image from 'next/image';
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

  const images = post.imageUrl
    ? [{ url: post.imageUrl, alt: post.title }]
    : [{ url: '/assets/og-image.png', alt: post.title }];

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : ['/assets/og-image.png'],
    },
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
    <div className="relative z-10 flex min-h-screen w-full flex-col gap-12 pt-20">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6 px-6 md:px-8">
        <Button href="/blog" variant="ghost" className="self-start">
          <FaArrowLeft
            size={12}
            className="transition-transform group-hover:-translate-x-1"
          />{' '}
          Back to Blog
        </Button>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Chip key={tag} color="accent">
              {tag}
            </Chip>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <h1 className="type-heading text-foreground">{post.title}</h1>

          <div className="relative z-20 flex items-center gap-4 border-y border-white/5 py-6">
            <PeopleGroup people={post.authors} />
            <div className="flex flex-col">
              <span className="type-body text-foreground">
                {post.authors.map((a) => a.name).join(', ')}
              </span>
              <span className="type-label text-foreground-secondary">
                {post.date}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {/* Hero Image */}
        {post.imageUrl && post.imageUrl !== '/placeholder.jpg' && (
          <div className="mx-auto w-full max-w-[900px] px-6 md:px-8">
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border shadow-2xl">
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
        <article className="mx-auto prose prose-lg w-full max-w-[900px] px-6 prose-invert md:px-8 prose-a:text-accent hover:prose-a:text-foreground prose-code:rounded prose-code:bg-background-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:bg-background-secondary prose-img:rounded-xl">
          {post.content ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              components={{
                img: (props: any) => {
                  const isNotion = props.src?.includes('amazonaws');
                  return (
                    <span className="relative my-8 block aspect-video w-full">
                      <Image
                        src={props.src || ''}
                        alt={props.alt || ''}
                        fill
                        className="rounded-xl object-cover"
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
    </div>
  );
}
