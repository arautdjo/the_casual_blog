import { findAllPostAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';
import ErrorMessage from '../../ErrorMessage';

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();

  if (posts.length <= 0)
    return (
      <ErrorMessage contentTitle='Ei 😅' content='Bora criar algum post??' />
    );

  return (
    <div className='mb-16 flex flex-col gap-3'>
      {posts.map((post, index) => {
        return (
          <div
            className={clsx(
              'sticker sticker-lift reveal rounded-2xl px-5 py-3',
              !post.published && 'bg-surface-soft',
              'flex items-center justify-between gap-3',
            )}
            style={{ '--i': index } as React.CSSProperties}
            key={post.id}
          >
            <Link
              className='flex-1 font-bold transition hover:text-link'
              href={`/admin/post/${post.id}`}
            >
              {post.title}
            </Link>

            <span
              className={clsx(
                'rounded-full border-2 border-line px-2.5 py-0.5 text-xs font-bold text-[#1c1633]',
                post.published ? 'bg-mint' : 'bg-sun',
              )}
            >
              {post.published ? 'Publicado' : 'Rascunho'}
            </span>

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
