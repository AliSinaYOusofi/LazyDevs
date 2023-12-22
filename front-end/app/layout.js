import { LazyContextProvider } from '@/context/useContextProvider'
import './globals.css'
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = {
  title: {
    default: "LazyDevs | Home",
  },

  description: 'Write, Share, Learn',
  icons: {
    icon: "/favicon.png"

  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <LazyContextProvider>
          {children}
        </LazyContextProvider>
      </body>
      
    </html>
  )
}
