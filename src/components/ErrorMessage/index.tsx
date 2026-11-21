'use client';

import clsx from 'clsx';
import Link from 'next/link';

type ErrorMessageProps = {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
  withHomeLink?: boolean;
};

export default function ErrorMessage({
  pageTitle = '',
  contentTitle,
  content,
  withHomeLink = false,
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={clsx(
          'sticker reveal bg-surface-soft',
          'mb-16 min-h-[320px] p-8',
          'flex items-center justify-center text-center',
        )}
      >
        <div className='flex flex-col items-center gap-4'>
          <h1 className='font-display text-7xl/tight font-extrabold tracking-tight text-brand sm:text-8xl/tight'>
            {contentTitle}
          </h1>
          <div className='max-w-md text-lg text-muted'>{content}</div>

          {withHomeLink && (
            <Link
              href='/'
              className='mt-2 rounded-xl border-2 border-line bg-sun px-5 py-2.5 font-bold text-[#1c1633] shadow-[3px_3px_0_var(--shadow)] transition hover:-translate-y-0.5'
            >
              Voltar para a home
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
