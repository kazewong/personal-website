import Link from 'next/link';
import { ModeToggle } from './themeProvider';


export function NavBar() {
  return (
    <nav className="bg-cyan-600 dark:bg-blue-800 px-8 h-14 items-center py-4 px-4 lg:h-auto">
        <div className="flex flex-row justify-center space-x-10">
          <ModeToggle />
          <Link href="/" className="flex items-center justify-center">
                Home
          </Link>          
          <Link href="/science" className="flex items-center justify-center">
              Science
          </Link>
          <Link href="/code" className="flex items-center justify-center">
              Code
          </Link>
          <Link href="/outreach" className="flex items-center justify-center">
              Outreach
          </Link>
          <Link href="/project" className="flex items-center justify-center">
              Projects
          </Link>

        </div>
    </nav>
  )
}