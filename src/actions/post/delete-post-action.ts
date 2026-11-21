'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getErrorMessage } from '@/utils/get-error-message';
import { revalidateTag } from 'next/cache';

// [REFATORADO] Guard clauses em sequência e o `catch` reduzido a uma linha.
export async function deletePostAction(id: string) {
  if (!(await verifyLoginSession())) {
    return { error: 'Faça login novamente em outra aba' };
  }

  if (!id || typeof id !== 'string') {
    return { error: 'Dados inválidos' };
  }

  let post: PostModel;

  try {
    post = await postRepository.delete(id);
  } catch (error) {
    return { error: getErrorMessage(error) };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return { error: '' };
}
