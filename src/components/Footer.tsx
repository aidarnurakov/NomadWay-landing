import Link from "next/link";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Nomadway</h3>
            <p className="text-slate-300 max-w-xs">
              Походы и туры по Кыргызстану в одном приложении
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-slate-300 hover:text-primary transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="#beta-test" className="text-slate-300 hover:text-primary transition-colors">
                  Бета-тест
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-primary transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Контакты</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a
                  href="mailto:hello@nomadway.app"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  hello@nomadway.app
                </a>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 Nomadway. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
} 