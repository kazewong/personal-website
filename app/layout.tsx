import { MyNavBar } from '@/app/components/navbar'
import './globals.css'
import { Oswald } from 'next/font/google'
import { Providers } from '@/app/provider'


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
    <html lang="en" className="dark h-screen">
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Oswald" />
        <body className={oswald.className + " h-screen"}>
          <Providers>
            <MyNavBar/>
            {children}
          </Providers>
        </body>
    </html>
  )
}
