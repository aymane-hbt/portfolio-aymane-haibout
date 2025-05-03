"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-lg text-navy-700 dark:text-navy-400">
            <Link href="/">Aymane Haibout</Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="#about">Über Mich</NavLink>
            <NavLink href="#skills">Fähigkeiten</NavLink>
            <NavLink href="#projects">Projekte</NavLink>
            <NavLink href="#contact">Kontakt</NavLink>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="#about" onClick={toggleMenu}>
              Über Mich
            </MobileNavLink>
            <MobileNavLink href="#skills" onClick={toggleMenu}>
              Fähigkeiten
            </MobileNavLink>
            <MobileNavLink href="#projects" onClick={toggleMenu}>
              Projekte
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>
              Kontakt
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-navy-700 dark:text-gray-300 dark:hover:text-navy-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  )
}

interface MobileNavLinkProps {
  href: string
  onClick: () => void
  children: React.ReactNode
}

function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-navy-700 dark:text-gray-300 dark:hover:text-navy-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
