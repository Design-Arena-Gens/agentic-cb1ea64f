import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mumbai News - Instagram Post Generator',
  description: 'Latest verified local news from Mumbai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
