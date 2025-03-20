import { Metadata } from "next"
import QueryProvider from '@/components/providers/query-provider'
import ThemeProviderWrapper from "@/components/providers/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Tekelmatik",
  description: "Find nearby liquor stores"
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KDGQTK7L');`
          }}
        />
        <link
          rel="preload"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          as="style"
        />
        <link
          rel="dns-prefetch"
          href="https://maps.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://maps.googleapis.com"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
      </head>
      <body className="flex min-h-screen flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDGQTK7L"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProviderWrapper>
          <QueryProvider>
            <Header />
            <main className="container mx-auto flex-1 py-6">
              {children}
            </main>
            <Footer />
          </QueryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}