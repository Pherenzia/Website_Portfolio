import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Pherenzia', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mitchell-riley/', icon: Linkedin },
  { name: 'Email', href: 'mailto:d.r.mitchellriley@gmail.com', icon: Mail },
]

const quickLinks = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-secondary-900 border-t border-gray-200 dark:border-secondary-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MR</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Mitchell Riley
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Full Stack Developer passionate about creating innovative solutions 
              and delivering exceptional user experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 dark:bg-secondary-800 dark:hover:bg-primary-900/30 transition-colors duration-200 group"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400 transition-colors duration-200" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Get In Touch
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:d.r.mitchellriley@gmail.com"
                className="block text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
              >
                d.r.mitchellriley@gmail.com
              </a>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Available for freelance opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-secondary-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Mitchell Riley. All rights reserved.
            </p>
            <p className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and React</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
