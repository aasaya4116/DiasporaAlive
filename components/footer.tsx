import Link from "next/link"
import { Globe, Twitter, Instagram, Linkedin, Github } from "lucide-react"

const socialLinks = [
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com", icon: Github, label: "GitHub" },
]

const exploreLinks = [
  { href: "/#map-section", label: "Interactive Map" },
  { href: "/timeline", label: "Timeline" },
  { href: "/stories", label: "Stories" },
  { href: "/news", label: "News & Events" },
  { href: "/resources", label: "Resources" },
  { href: "/plan", label: "Trip Planner" },
]

export function Footer() {
  return (
    <footer className="relative bg-background">
      <div className="gradient-divider" />
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <Globe className="w-6 h-6 text-background" />
              </div>
              <span className="text-2xl font-bold text-foreground">Diaspora Alive</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Exploring and celebrating the rich cultural tapestry of the African diaspora across the Americas and
              Caribbean. Connecting heritage, history, and community.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-line bg-card flex items-center justify-center transition hover:border-gold hover:-translate-y-0.5"
                >
                  <Icon className="w-5 h-5 text-gold" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="overline mb-4">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-line-subtle text-center text-sm text-muted-foreground">
          <p>© 2026 Diaspora Alive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
