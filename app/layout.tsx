import type { Metadata } from 'next'
import { Open_Sans, Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Polarekat.id — Cutting Sticker Profesional Bandung',
  description:
    'Layanan cutting sticker profesional di Bandung. Cutting sticker, print & cut, sandblast, dan vinyl berkualitas premium untuk branding bisnis Anda.',
  keywords: ['cutting sticker', 'sticker bandung', 'print and cut', 'sandblast', 'vinyl wrap', 'polarekat'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${openSans.variable} ${jakarta.variable} ${fraunces.variable}`}>
      <body className={openSans.className}>
        {children}
      </body>
    </html>
  )
}
