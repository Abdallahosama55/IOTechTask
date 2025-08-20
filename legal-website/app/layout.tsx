import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Cairo } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "@/contexts/i18n-context"

import Footer from "@/components/footer"
import { Toaster } from "react-hot-toast"

import { Navigation } from "@/components/navigation"
import { Providers } from "@/components/Providers"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Legal Services - Professional Law Firm",
  description: "Professional legal consultation and services",

  authors: [{ name: "Abdallah Osama", url: "https://github.com/abdallahosama" }],
  creator: "Abdallah Osama Frontend Developer",
}

/**
 * Root Layout Component
 * Provides the main layout structure with i18n support, navigation, and footer
 * @author Abdallah Osama Frontend Developer
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cairo.variable} antialiased`}>
      <body className="font-sans">
        
        <I18nProvider>
          <div className="min-h-screen flex flex-col">
             <Toaster />
            <Navigation />
            <main className="flex-1"> 
     <Providers>{children}</Providers>
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  )
}
