import { getPosts } from '@/shared/lib/notion';
import { Metadata } from 'next';
import BlogCard from './_components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] pt-20 relative z-10 w-full max-w-[1100px] mx-auto px-6 mb-24">
      {/* Header */}
      <div className="mb-16 mt-10">
        <h1 className="text-6xl font-bold text-foreground leading-snug">
          Blog
        </h1>
        <p className="text-base text-muted max-w-[600px] mt-4 leading-relaxed">
          Thoughts, tutorials, and deep dives from the Polimi Data Scientists
          community. Read our latest articles on AI, machine learning, and data
          engineering.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} priority={index < 2} />
        ))}
      </div>
    </div>
  );
}
