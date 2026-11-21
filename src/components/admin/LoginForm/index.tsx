'use client';

import { loginAction } from '@/actions/login/login-action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.dismiss();
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'sticker reveal p-8',
        'mx-auto mb-32 mt-4 max-w-sm text-center',
      )}
    >
      <h1 className='mb-6 font-display text-3xl font-extrabold tracking-tight'>
        Bem-vindo de volta <span aria-hidden>👋</span>
      </h1>

      <form action={action} className='flex flex-col gap-6 text-left'>
        <InputText
          type='text'
          name='username'
          labelText='Usuário'
          placeholder='Seu usuário'
          disabled={isPending}
          defaultValue={state.username}
        />

        <InputText
          type='password'
          name='password'
          labelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
        />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <LogInIcon />
          Entrar
        </Button>

        {!!state.error && (
          <p className='text-center font-semibold text-pop'>{state.error}</p>
        )}
      </form>
    </div>
  );
}
