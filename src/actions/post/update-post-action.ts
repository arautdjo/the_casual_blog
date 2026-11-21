'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/dto/post/dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostUpdateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { getErrorMessage } from '@/utils/get-error-message';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeRandomString } from '@/utils/make-random-string';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

// [REFATORADO] Mesma ideia da createPostAction: guard clauses, `formState`
// calculado uma vez, e sem o objeto `newPost = { ...validPostData }`
// que apenas copiava os dados sem motivo.
export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  if (!(formData instanceof FormData)) {
    return { formState: prevState.formState, errors: ['Dados inválidos'] };
  }

  const id = formData.get('id')?.toString();

  if (!id) {
    return { formState: prevState.formState, errors: ['ID inválido'] };
  }

  const formValues = Object.fromEntries(formData.entries());
  const formState = makePartialPublicPost(formValues);

  if (!(await verifyLoginSession())) {
    return { formState, errors: ['Faça login em outra aba antes de salvar.'] };
  }

  const parsed = PostUpdateSchema.safeParse(formValues);

  if (!parsed.success) {
    return { formState, errors: getZodErrorMessages(parsed.error) };
  }

  let post: PostModel;

  try {
    post = await postRepository.update(id, parsed.data);
  } catch (error) {
    return { formState, errors: [getErrorMessage(error)] };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: makeRandomString(),
  };
}
