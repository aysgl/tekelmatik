import { Metadata } from "next"
import QueryProvider from '@/components/providers/query-provider'
import ThemeProviderWrapper from "@/components/providers/theme-provider"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"


export const metadata: Metadata = {
  title: "Tekelmatik",
  description: "Find nearby liquor stores"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <QueryProvider>
            <Header />
            <main className="container mx-auto py-6 min-h-[90vh]">
              {children}
            </main>
            <Footer />
          </QueryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}