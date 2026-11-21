import ErrorMessage from '../ErrorMessage';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle='Ops 😅'
        content='Ainda não criamos nenhum post.'
      />
    );

  const post = posts[0];

  const postLink = `/post/${post.slug}`;

  return (
    <section className='reveal mb-14'>
      <article className='sticker sticker-lift group relative grid overflow-hidden sm:grid-cols-2'>
        <span className='absolute left-4 top-4 z-10 rounded-full border-2 border-line bg-sun px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#1c1633]'>
          🔥 Em destaque
        </span>

        <PostCoverImage
          linkProps={{
            href: postLink,
            className: 'min-h-64 border-b-2 border-line sm:border-b-0 sm:border-r-2',
          }}
          imageProps={{
            width: 1200,
            height: 720,
            src: post.coverImageUrl,
            alt: post.title,
            priority: true,
          }}
        />

        <div className='flex p-6 sm:p-10'>
          <PostSummary
            postLink={postLink}
            postHeading='h1'
            createdAt={post.createdAt}
            excerpt={post.excerpt}
            title={post.title}
            ctaClassName='bg-pop'
          />
        </div>
      </article>
    </section>
  );
}
