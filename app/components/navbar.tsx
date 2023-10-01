'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


export function MyNavBar() {
  return (
    // <nav className="bg-cyan-600 dark:bg-blue-800 px-8 h-20 items-center py-4 px-4 lg:h-auto">
    //     <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
    //     <span className="sr-only">Open main menu</span>
    //     <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    //         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
    //     </svg>
    //     </button>
    //     <div className="hidden sm:flex flex-row justify-center space-x-10 dark:text-gray-300 text-3xl" id="navbar-default">
    //       <ModeToggle />
    //       <Link href="/" className="flex items-center justify-center">
    //             Home
    //       </Link>          
    //       <Link href="/science" className="flex items-center justify-center">
    //           Science
    //       </Link>
    //       {/* <Link href="/code" className="flex items-center justify-center">
    //           Code
    //       </Link> */}
    //       <Link href="/outreach" className="flex items-center justify-center">
    //           Outreach
    //       </Link>
    //       <Link href="/project" className="flex items-center justify-center">
    //           Projects
    //       </Link>

    //     </div>
    // </nav>
<Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

