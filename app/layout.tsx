import { NavBar } from '@/ui/navbar'
import './globals.css'
import { Oswald } from 'next/font/google'

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
          <NavBar />
        <div>
          {children}
        </div>        
        <div>

        </div>  
      </body>
    </html>
  )
}
