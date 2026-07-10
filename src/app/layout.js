import { inter, playfair, jetbrains, spaceGrotesk } from '@/lib/fonts';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import Script from 'next/script'

export const metadata = {
  title: 'Protonixs | AI & Web Solutions That Transform Businesses',
  description: 'Protonixs is a leading IT services company specializing in web development, AI solutions, and custom software. We build powerful applications that drive business growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-canvas text-foreground selection:bg-accent selection:text-foreground overflow-x-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
