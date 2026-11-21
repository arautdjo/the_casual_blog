import { formatDatetime, formatDistanceToNow } from '@/utils/format-datetime';
import { CalendarIcon } from 'lucide-react';

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      className='inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-soft px-3 py-1 text-xs/tight font-semibold text-muted'
      dateTime={dateTime}
      title={formatDistanceToNow(dateTime)}
    >
      <CalendarIcon className='size-3.5' aria-hidden />
      {formatDatetime(dateTime)}
    </time>
  );
}
