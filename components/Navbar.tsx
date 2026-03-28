'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Produk', href: '/produk' },
  { label: 'Portofolio', href: '/portofolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/#contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-lg shadow-navy/30">
      <div className="px-[5%] h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo.png"
            alt="Polarekat.id"
            className="w-8 h-8 rounded-md object-contain bg-white p-0.5 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-white font-bold text-[15px] tracking-tight">polarekat.id</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-white ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/60'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right side buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-white/60 text-sm font-medium hover:text-white transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/produk"
            className="bg-gold text-navy font-bold text-[13px] px-5 py-2 rounded-md btn-transition hover:bg-yellow-300 hover-glow-gold"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-navy-mid border-t border-white/10 px-[5%] py-4">
          <ul className="list-none space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 mt-3 pt-3 space-y-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/produk"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-gold text-navy font-bold text-[13px] px-5 py-2.5 rounded-lg btn-transition hover:bg-yellow-300"
            >
              Pesan Sekarang
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
