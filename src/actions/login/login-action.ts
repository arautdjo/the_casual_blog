'use server';

import { createLoginSession } from '@/lib/login/manage-login';
import { verifyPassword } from '@/lib/login/password-hashing';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

// Atraso proposital (dificulta tentativas em massa). Mantido do original.
const LOGIN_DELAY_MS = 5000;

type LoginActionState = {
  username: string;
  error: string;
};

const failure = (username: string, error: string): LoginActionState => ({
  username,
  error,
});

// [REFATORADO] Cada "return { username, error }" repetido virou `failure(...)`,
// e a leitura dos campos usa um único padrão (String + ?? + trim).
export async function loginAction(
  state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) return failure('', 'Login not allowed');

  await asyncDelay(LOGIN_DELAY_MS);

  if (!(formData instanceof FormData)) return failure('', 'Dados inválidos');

  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!username || !password) {
    return failure(username, 'Digite o usuário e a senha');
  }

  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS ?? '',
  );

  if (!isUsernameValid || !isPasswordValid) {
    return failure(username, 'Usuário ou senha inválidos');
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
