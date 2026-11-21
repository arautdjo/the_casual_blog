'use server';

import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getErrorMessage } from '@/utils/get-error-message';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

// [REFATORADO]
// 1. Validações baratas primeiro, em ordem de "guard clauses" (sai cedo).
// 2. `formState` é calculado uma vez e reaproveitado nos retornos de erro.
// 3. createdAt/updatedAt usam o mesmo instante (`now`).
// 4. O try/catch repetitivo virou `getErrorMessage`.
export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  if (!(formData instanceof FormData)) {
    return { formState: prevState.formState, errors: ['Dados inválidos'] };
  }

  const formValues = Object.fromEntries(formData.entries());
  const formState = makePartialPublicPost(formValues);

  if (!(await verifyLoginSession())) {
    return { formState, errors: ['Faça login em outra aba antes de salvar.'] };
  }

  const parsed = PostCreateSchema.safeParse(formValues);

  if (!parsed.success) {
    return { formState, errors: getZodErrorMessages(parsed.error) };
  }

  const now = new Date().toISOString();
  const newPost: PostModel = {
    ...parsed.data,
    id: uuidV4(),
    slug: makeSlugFromText(parsed.data.title),
    createdAt: now,
    updatedAt: now,
  };

  try {
    await postRepository.create(newPost);
  } catch (error) {
    return { formState: newPost, errors: [getErrorMessage(error)] };
  }

  revalidateTag('posts');
  redirect(`/admin/post/${newPost.id}?created=1`);
}
