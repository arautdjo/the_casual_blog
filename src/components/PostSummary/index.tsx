import clsx from 'clsx';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
  ctaClassName?: string;
};

export function PostSummary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
  ctaClassName = 'bg-sun',
}: PostSummaryProps) {
  return (
    <div className='flex flex-1 flex-col gap-4 sm:justify-center'>
      <PostDate dateTime={createdAt} />

      <PostHeading as={postHeading} url={postLink}>
        {title}
      </PostHeading>

      <p className='text-muted'>{excerpt}</p>

      {/* Atalho visual: o link "de verdade" já é o título. */}
      <Link
        href={postLink}
        aria-hidden
        tabIndex={-1}
        className={clsx(
          'mt-auto inline-flex w-fit items-center gap-2 rounded-full',
          'border-2 border-line px-4 py-1.5 text-sm font-bold text-[#1c1633]',
          'transition group-hover:gap-3',
          ctaClassName,
        )}
      >
        Ler post
        <ArrowRightIcon className='size-4' />
      </Link>
    </div>
  );
}
