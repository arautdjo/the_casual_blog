import { PostModel } from '@/models/post/post-model';

export type PublicPost = Omit<PostModel, 'updatedAt'>;

// [REFATORADO] Parâmetro com valor padrão `{}` elimina todos os `post?.`,
// e `??` só troca valores realmente ausentes (null/undefined).
export const makePartialPublicPost = (
  post: Partial<PostModel> = {},
): PublicPost => ({
  id: post.id ?? '',
  slug: post.slug ?? '',
  title: post.title ?? '',
  excerpt: post.excerpt ?? '',
  author: post.author ?? '',
  content: post.content ?? '',
  coverImageUrl: post.coverImageUrl ?? '',
  createdAt: post.createdAt ?? '',
  published: Boolean(post.published),
});

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
