import { Oswald } from 'next/font/google'

const oswald = Oswald({ subsets: ['latin'] })

export const metadata = {
  title: 'Kaze Wong',
  description: 'Kaze Wong\'s personal website',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

      <section className={oswald.className}>
        {children}
      </section>
      
  )
}