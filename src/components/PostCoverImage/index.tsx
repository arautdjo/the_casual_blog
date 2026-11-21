import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostCoverImageProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostCoverImage({ imageProps, linkProps }: PostCoverImageProps) {
  return (
    <Link
      {...linkProps}
      className={clsx(
        'block h-full w-full overflow-hidden bg-surface-soft',
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          'h-full w-full object-cover object-center',
          'transition duration-500 group-hover:scale-105',
          imageProps.className,
        )}
        alt={imageProps.alt}
      />
    </Link>
  );
}
