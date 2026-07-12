import { inter, playfair, jetbrains, spaceGrotesk } from '@/lib/fonts';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata } from '@/lib/seo/metadata';
import { globalSchemas } from '@/lib/seo/schemas';
import { siteConfig } from '@/lib/seo/site-config';

const verification = {};
if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION) {
    verification.other = { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION };
}

export const metadata = {
    metadataBase: new URL(siteConfig.url),
    ...pageMetadata.home,
    ...(Object.keys(verification).length ? { verification } : {}),
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
            <body className="bg-canvas text-foreground selection:bg-accent selection:text-foreground overflow-x-hidden">
                <JsonLd data={globalSchemas()} />
                <GoogleAnalytics />
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
