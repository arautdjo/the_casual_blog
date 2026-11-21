import clsx from 'clsx';
import { useId } from 'react';

type InputCheckboxProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export function InputCheckbox({
  labelText = '',
  type = 'checkbox',
  ...props
}: InputCheckboxProps) {
  const id = useId();

  return (
    <div className='flex items-center gap-3'>
      <input
        {...props}
        className={clsx(
          'size-5 cursor-pointer accent-brand',
          'disabled:cursor-not-allowed',
          props.className,
        )}
        id={id}
        type={type}
      />

      {labelText && (
        <label className='cursor-pointer text-sm font-semibold' htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
