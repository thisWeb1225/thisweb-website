// Next
import type { Metadata } from 'next';

// Style
import '../style/globals.css';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import PageTransitionLayout from './components/effect/PageTransitionLayout';

export const metadata: Metadata = {
  title: '請網這邊走 ThisWeb - 幫助你自學前端 ',
  description: '',
  creator: 'thisweb',
  keywords: ['thisweb', '請網這邊走', 'js 教學'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <ProgressBar />
        <Header />
        <PageTransitionLayout className="px-4 md:px-8 lg:px-20 xl:px-40">
          {children}
        </PageTransitionLayout>
        <Footer />
      </body>
    </html>
  );
}
