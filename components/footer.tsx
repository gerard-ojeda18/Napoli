import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

const navLinks = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#menu", label: "Menu" },
  { href: "#galeria", label: "Galeria" },
  { href: "#reservas", label: "Reservas" },
]

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold text-background">
                Napoli
              </span>
            </Link>
            <p className="mt-4 text-background/70 text-sm leading-relaxed max-w-xs">
              Auténtica pizza napolitana horneada en horno de leña con los 
              mejores ingredientes importados de Italia desde 1985.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium text-background mb-4 uppercase tracking-wider text-sm">
              Navegacion
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-medium text-background mb-4 uppercase tracking-wider text-sm">
              Contacto
            </h4>
            <div className="space-y-3 text-sm text-background/70">
              <p>Av. Corrientes 1234, Palermo</p>
              <p>Buenos Aires, Argentina</p>
              <p>+54 11 2345-6789</p>
              <p>info@napolipizza.com.ar</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-background" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              &copy; {new Date().getFullYear()} Napoli. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-background/50 hover:text-background text-sm transition-colors"
              >
                Politica de Privacidad
              </Link>
              <Link
                href="#"
                className="text-background/50 hover:text-background text-sm transition-colors"
              >
                Terminos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
