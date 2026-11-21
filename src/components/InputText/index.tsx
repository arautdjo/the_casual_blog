import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm font-semibold' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'rounded-xl border-2 border-line bg-surface px-4 py-3 text-base/tight text-ink',
          'outline-none transition placeholder:text-muted/60',
          'focus:border-brand focus:ring-4 focus:ring-brand/25',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'read-only:bg-surface-soft',
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
