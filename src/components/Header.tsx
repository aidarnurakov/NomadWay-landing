"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Nomadway</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-slate-700 hover:text-primary transition-colors">
              О проекте
            </Link>
            <Link href="#beta-test" className="text-slate-700 hover:text-primary transition-colors">
              Бета-тест
            </Link>
            <Link href="#contact" className="text-slate-700 hover:text-primary transition-colors">
              Контакты
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="#about"
                className="text-slate-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                О проекте
              </Link>
              <Link
                href="#beta-test"
                className="text-slate-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Бета-тест
              </Link>
              <Link
                href="#contact"
                className="text-slate-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакты
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 