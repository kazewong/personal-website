'use client'
import React from "react";
import {Link} from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/navbar";
import { ThemeSwitcher } from "./themeSwitcher";

export function MyNavBar() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems= ["Home", "Blog", "Science", "High Jump", "Code"]//"Animation", "Music"]
  const menuLinks= ["/", "/blog", "/science", "/highjump", "/code"]// "/animation", "/code", "/music"]

  return (

    <Navbar onMenuOpenChange={setIsMenuOpen} className="dark:bg-gray-900">
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
      {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
            color="foreground"
              className="w-full"
              href={menuLinks[index]}
              size="lg"
            >
            {item}
            </Link>
          </NavbarItem>
        ))}
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
              // color={
              //   index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              // }
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

