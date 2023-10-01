'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, Link, Button, NavbarMenuItem} from "@nextui-org/react";
import { ThemeSwitcher } from "./themeSwitcher";

export function MyNavBar() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems= ["Home", "Science", "Code", "Blog"]
  const menuLinks= ["/", "science", "/code", "/blog"]

  return (

    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Kaze Wong</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">

        <NavbarItem>
          <Link href="/" color="foreground">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/science" color="foreground">
              Science
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                  }
                  className="w-full"
                  href={menuLinks[index]}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
    </Navbar>
  )
}

