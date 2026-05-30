import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import WhatsAppButton from '../components/WhatsAppButton';
import BackToTop from '../components/BackToTop';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'NovaStack Labs | Premium Software Engineering Agency',
  description: 'NovaStack Labs designs and develops premium custom websites, SaaS platforms, enterprise ERP/CRM portals, healthcare solutions, and React Native mobile apps.',
  keywords: ['software development', 'Next.js agency', 'SaaS product development', 'custom CRM development', 'ERP solutions', 'HIPAA compliant medical software', 'React Native apps', 'SEO optimization'],
  icons: {
    icon: '/logo.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://novastacklabs.com',
    title: 'NovaStack Labs | Premium Software Engineering Agency',
    description: 'Build digital products that scale. We engineer premium custom websites, SaaS platforms, and enterprise applications.',
    siteName: 'NovaStack Labs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NovaStack Labs | Premium Software Engineering Agency',
    description: 'Build digital products that scale. We engineer premium custom websites, SaaS platforms, and enterprise applications.',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakartaSans.variable} min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col`}>
        <ThemeProvider>
          {/* Splash screen loader */}
          <LoadingScreen />
          
          {/* Custom mouse follower cursor */}
          <CustomCursor />

          {/* Site Shell */}
          <Navbar />
          <div className="flex-1 flex flex-col relative bg-white">
            {children}
          </div>
          <Footer />

          {/* Interaction hooks */}
          <WhatsAppButton />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
