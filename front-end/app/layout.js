import HeroSection from '@/components/heroSection/HeroSection'
import Navbar from '@/components/Navbar/Navbar'
import Step from '@/components/Step/Step'
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <HeroSection />
        <Step />
        {children}
      </body>
    </html>
  )
}
