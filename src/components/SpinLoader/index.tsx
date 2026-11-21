import clsx from 'clsx';

type SpinLoaderProps = {
  className?: string;
};

const dots = [
  { delay: '0ms', color: 'bg-brand' },
  { delay: '150ms', color: 'bg-pop' },
  { delay: '300ms', color: 'bg-sun' },
];

export function SpinLoader({ className = '' }: SpinLoaderProps) {
  return (
    <div
      className={clsx('flex items-center justify-center gap-2.5', className)}
      role='status'
      aria-label='Carregando'
    >
      {dots.map(({ delay, color }) => (
        <span
          key={delay}
          className={clsx(
            'loader-dot size-4 rounded-full border-2 border-line',
            color,
          )}
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
}
