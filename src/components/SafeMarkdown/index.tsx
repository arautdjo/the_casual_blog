import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div
      className={clsx(
        'prose prose-pop',
        'w-full max-w-none',
        'overflow-hidden',
        'prose-headings:font-display prose-headings:tracking-tight',
        'prose-a:font-semibold prose-a:underline prose-a:decoration-2',
        'prose-a:underline-offset-4 prose-a:transition',
        'prose-a:hover:text-brand',
        'prose-img:mx-auto prose-img:rounded-2xl',
        'prose-img:border-2 prose-img:border-line',
        'lg:prose-lg',
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return '';

            return (
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[600px]' {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
