import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle='Página não encontrada'
      contentTitle='404'
      content='Ops! A página que você procura não existe por aqui.'
      withHomeLink
    />
  );
}
