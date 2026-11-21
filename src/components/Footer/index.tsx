import Link from 'next/link';

export function Footer() {
  return (
    <footer className='pb-12 pt-4 text-center text-sm text-muted'>
      <p className='font-medium'>
        Feito com <span aria-hidden>💜</span>
        <span className='sr-only'>carinho</span> e muito café ☕
      </p>

      <p className='mt-1'>
        <span>&copy; {new Date().getFullYear()} · </span>
        <Link
          href='/'
          className='font-bold text-ink transition hover:text-link'
        >
          The Blog
        </Link>
      </p>
    </footer>
  );
}
