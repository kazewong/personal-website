import Link from 'next/link';

export function NavBar() {
  return (
    <nav className="bg-gray-800">
        <div className="flex flex-row h-14 items-center py-4 px-4 lg:h-auto">
            <Link href="/" className="group flex w-full items-center gap-x-2.5">
                Home
            </Link>          
            <Link href="/about" className="group flex w-full items-center gap-x-2.5">
                About
            </Link>          
        </div>
    </nav>
  )
}