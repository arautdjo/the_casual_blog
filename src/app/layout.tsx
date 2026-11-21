import type { Metadata } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastifyContainer } from '@/components/ToastifyContainer';

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--next-font-display',
  display: 'swap',
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--next-font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'The Blog - Histórias, ideias e muita diversão',
    template: '%s | The Blog',
  },
  description:
    'Um cantinho divertido para ler, rir e descobrir coisas novas. Entra, a casa é sua!',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-BR' className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
