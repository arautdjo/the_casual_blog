import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

// Cores do botão "Ler post", em rodízio (classes estáticas p/ o Tailwind).
const ctaColors = ['bg-sun', 'bg-mint', 'bg-sky', 'bg-pop'];

export async function PostsList() {
  const posts = await findAllPublicPostsCached();

  if (posts.length <= 1) return null;

  return (
    <section className='mb-16'>
      <h2 className='mb-6 font-display text-2xl font-extrabold tracking-tight sm:text-3xl'>
        Mais para ler <span aria-hidden>👇</span>
      </h2>

      <div className='grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.slice(1).map((post, index) => {
          const postLink = `/post/${post.slug}`;

          return (
            <article
              className='sticker sticker-lift reveal group flex flex-col overflow-hidden'
              style={{ '--i': index } as React.CSSProperties}
              key={post.id}
            >
              <div className='aspect-[5/3] border-b-2 border-line'>
                <PostCoverImage
                  linkProps={{ href: postLink }}
                  imageProps={{
                    width: 1200,
                    height: 720,
                    src: post.coverImageUrl,
                    alt: post.title,
                  }}
                />
              </div>

              <div className='flex flex-1 p-5'>
                <PostSummary
                  postLink={postLink}
                  postHeading='h2'
                  createdAt={post.createdAt}
                  excerpt={post.excerpt}
                  title={post.title}
                  ctaClassName={ctaColors[index % ctaColors.length]}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
