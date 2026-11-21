import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import { UserRoundIcon } from 'lucide-react';
import Image from 'next/image';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);

  return (
    <article className='reveal mb-16 flex flex-col gap-8'>
      <header className='flex flex-col gap-5'>
        <Image
          className='sticker aspect-[5/3] w-full object-cover sm:aspect-[2/1]'
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          priority
        />

        <PostHeading as='h1' url={`/post/${post.slug}`}>
          {post.title}
        </PostHeading>

        <div className='flex flex-wrap items-center gap-3'>
          <span className='inline-flex items-center gap-1.5 rounded-full bg-mint/30 px-3 py-1 text-sm font-bold'>
            <UserRoundIcon className='size-4' aria-hidden />
            {post.author}
          </span>
          <PostDate dateTime={post.createdAt} />
        </div>
      </header>

      <p className='rounded-2xl border-l-8 border-sun bg-sun/20 p-5 text-lg/relaxed font-medium sm:text-xl/relaxed'>
        {post.excerpt}
      </p>

      <div className='sticker p-6 sm:p-10'>
        <SafeMarkdown markdown={post.content} />
      </div>
    </article>
  );
}
