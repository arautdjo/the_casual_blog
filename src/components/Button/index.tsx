import clsx from 'clsx';

type ButtonVariants = 'default' | 'ghost' | 'danger';
type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: 'bg-brand text-brand-ink',
    ghost: 'bg-surface text-ink',
    danger: 'bg-pop text-[#1c1633]',
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      'text-xs/tight py-1.5 px-3 rounded-lg gap-1',
      '[&_svg]:w-3 [&_svg]:h-3',
    ),
    md: clsx(
      'text-base/tight py-2.5 px-5 rounded-xl gap-2',
      '[&_svg]:w-4 [&_svg]:h-4',
    ),
    lg: clsx(
      'text-lg/tight py-4 px-7 rounded-2xl gap-3',
      '[&_svg]:w-5 [&_svg]:h-5',
    ),
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    'flex items-center justify-center cursor-pointer font-bold',
    'border-2 border-line shadow-[3px_3px_0_var(--shadow)]',
    'transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--shadow)]',
    'active:translate-y-0.5 active:shadow-[1px_1px_0_var(--shadow)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'disabled:translate-y-0 disabled:shadow-none',
    props.className,
  );

  return <button {...props} className={buttonClasses} />;
}
