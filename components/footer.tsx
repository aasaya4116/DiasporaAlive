import Link from "next/link"
import { Globe, Mail, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-emerald-500/20 bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-transparent bg-clip-text">
                Diaspora Alive
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Exploring and celebrating the rich cultural tapestry of the African diaspora across the Americas and
              Caribbean. Connecting heritage, history, and community.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-emerald-500/20 bg-card/30 flex items-center justify-center hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <Twitter className="w-5 h-5 text-emerald-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-emerald-500/20 bg-card/30 flex items-center justify-center hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <Instagram className="w-5 h-5 text-emerald-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-emerald-500/20 bg-card/30 flex items-center justify-center hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <Linkedin className="w-5 h-5 text-emerald-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-emerald-500/20 bg-card/30 flex items-center justify-center hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <Github className="w-5 h-5 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Country Profiles
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-muted-foreground hover:text-emerald-400 transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-12 p-6 rounded-lg border border-emerald-500/20 bg-card/30 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-bold text-foreground">Stay Connected</h3>
                <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 rounded-lg bg-background border border-emerald-500/20 focus:border-emerald-500/40 outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Diaspora Alive. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/acknowledgments" className="hover:text-emerald-400 transition-colors">
              Acknowledgments
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
