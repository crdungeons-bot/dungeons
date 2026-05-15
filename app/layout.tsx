import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tabletop Guru - 5E Character Manager',
  description: 'Create, manage, and adventure with your Fifth Edition characters',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({children}: {children: React.ReactNode;}) 
{
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}