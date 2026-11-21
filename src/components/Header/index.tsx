import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className='sticky top-3 z-40 mb-10 mt-4 sm:top-4 sm:mb-14 sm:mt-6'>
      <div className='sticker flex items-center justify-between gap-4 rounded-full bg-surface/90 px-3 py-2.5 backdrop-blur sm:px-4'>
        <Link href='/' className='logo flex items-center gap-3'>
          <span className='logo-badge grid size-10 place-items-center rounded-full border-2 border-line bg-sun text-[#1c1633]'>
            <SparklesIcon className='size-5' />
          </span>

          <span className='font-display text-2xl font-extrabold tracking-tight sm:text-3xl'>
            The Blog
          </span>
        </Link>

        <p className='mr-2 hidden items-center gap-2 rounded-full bg-mint/25 px-4 py-1.5 text-sm font-semibold sm:inline-flex'>
          <span aria-hidden>🎉</span>
          Histórias, ideias e diversão
        </p>
      </div>
    </header>
  );
}
