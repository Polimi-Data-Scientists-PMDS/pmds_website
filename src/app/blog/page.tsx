import { PageHeading } from '@/shared/components/ui/PageHeading';
import { getPosts } from '@/shared/lib/notion';
import { Metadata } from 'next';
import BlogCard from './_components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-200px)] w-full max-w-[1100px] flex-col gap-16 px-6 pt-30">
      {/* Header */}
      <PageHeading
        text="The"
        highlightedText="Blog."
        description="Thoughts, tutorials, and deep dives from the Polimi Data Scientists community. Read our latest articles on AI, machine learning, and data engineering."
      />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} priority={index < 2} />
        ))}
      </div>
    </div>
  );
}
