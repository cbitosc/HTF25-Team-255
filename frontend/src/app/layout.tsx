import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Nexus - Collaborative Workspace Platform',
  description: 'Multi-tenant SaaS platform for collaborative workspace management',
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
