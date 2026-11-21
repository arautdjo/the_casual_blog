import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

const headingClassesMap = {
  h1: 'text-3xl/tight sm:text-5xl/tight font-extrabold',
  h2: 'text-xl/snug sm:text-2xl/snug font-bold',
};

export function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {
  return (
    <Tag
      className={clsx('font-display tracking-tight', headingClassesMap[Tag])}
    >
      <Link className='transition group-hover:text-link' href={url}>
        {children}
      </Link>
    </Tag>
  );
}
