import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PetCare - Cuidado de Mascotas Premium',
  description: 'Encuentra al cuidador perfecto para tu mascota en Costa Rica.',
};

import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import AuthProvider from '../components/providers/AuthProvider';
import { LanguageProvider } from '../context/LanguageContext';
import { ChatBot } from '../components/ui/ChatBot';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <ChatBot />
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
