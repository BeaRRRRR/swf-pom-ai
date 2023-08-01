'use client'

// TODO: Remove this shit
import './globals.css'
import clsx from 'clsx'
import { Inter } from 'next/font/google'

import { useState } from 'react'
import MobileSidebar from '@/components/templates/MobileSidebar'
import DesktopSidebar from '@/components/templates/DesktopSidebar'
import Header from '@/components/organisms/Header'
import Providers from '@/components/templates/Providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en" className="h-full bg-white">
      <body className={clsx(inter.className, 'h-full')}>
        <Providers>
          <div>
            <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <DesktopSidebar />
            <Header setSidebarOpen={setSidebarOpen}>
              <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
              </main>
            </Header>
          </div>
        </Providers>
      </body>
    </html>
  )
}
