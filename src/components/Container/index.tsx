type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className='min-h-screen text-ink'>
      <div className='mx-auto max-w-6xl px-5 sm:px-8'>{children}</div>
    </div>
  );
}
