import { postRepository } from '@/repositories/post';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(
  unstable_cache(
    async () => {
      return await postRepository.findAllPublic();
    },
    ['posts'],
    {
      tags: ['posts'],
    },
  ),
);

// [REFATORADO] Antes o parâmetro `slug` era declarado duas vezes (o de fora e
// um que "sombreava" ele dentro do unstable_cache). Agora a closure usa o
// `slug` de fora, e a tag/chave do cache é calculada uma única vez.
export const findPublicPostBySlugCached = cache((slug: string) => {
  const tag = `post-${slug}`;

  const loadPost = unstable_cache(
    async () => {
      const post = await postRepository
        .findBySlugPublic(slug)
        .catch(() => undefined);

      if (!post) notFound();

      return post;
    },
    [tag],
    { tags: [tag] },
  );

  return loadPost();
});
