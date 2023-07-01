import { NavBar } from '@/app/components/navbar'
import './globals.css'
import { Oswald } from 'next/font/google'
import { Providers } from '@/app/components/themeProvider'

const oswald = Oswald({ subsets: ['latin'] })

export const metadata = {
  title: 'Kaze Wong',
  description: 'Kaze Wong\'s personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      
      <body className={oswald.className}>
        <Providers>
          <NavBar />
        <div>
          {children}
        </div>        
        <div>

        </div> 
        </Providers>
      </body>
    </html>
  )
}
