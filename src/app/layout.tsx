
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { GoogleAnalytics } from '@/components/google-analytics';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { EdgeStoreProvider } from '../lib/edgestore';
import Script from 'next/script';
import { WhatsappBanner } from '@/components/whatsapp-banner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vtuadda.com';
const siteTitle = 'vtuadda: The VTU Student Resource Hub';
const siteDescription = 'vtuadda is the ultimate hub for VTU students, offering free notes, previous year question papers (PYQs), study materials, and academic tools for all engineering branches. Simplify your studies and boost your grades.';
const siteImage = `${siteUrl}/icon-512x512.png`;
const adsenseClientId = "ca-pub-2752596475926660";

export const metadata: Metadata = {
  applicationName: 'vtuadda',
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | vtuadda`,
  },
  description: siteDescription,
  keywords: ['vtuadda', 'vtu adda', 'vtu notes', 'vtu pyq', 'vtu study material', 'vtu resources', 'vtu student community', 'vtu engineering notes', 'Visvesvaraya Technological University'],
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 512,
        height: 512,
        alt: 'vtuadda Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
  },
};

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'vtuadda',
    url: siteUrl,
    potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceCodePro.variable} h-full`} suppressHydrationWarning>
      <head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2752596475926660" crossOrigin="anonymous"></script>
        <GoogleAnalytics />
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased h-full bg-background relative">
        <div className="fixed top-0 left-0 w-full h-full dark:bg-[#1a1a2e] -z-10" />
        <div className="background-waves" />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <EdgeStoreProvider>
            <WhatsappBanner />
            {children}
          </EdgeStoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
