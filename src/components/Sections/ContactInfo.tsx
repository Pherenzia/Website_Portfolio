import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Clock, Github, Linkedin, FileText } from 'lucide-react'
import Button from '@/components/UI/Button'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send me an email anytime',
    value: 'd.r.mitchellriley@gmail.com',
    href: 'mailto:d.r.mitchellriley@gmail.com',
    primary: true,
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Available for calls and messages',
    value: '808-203-7139',
    href: 'tel:8082037139',
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'Based in San Diego',
    value: 'San Diego, CA',
    href: '#',
  },
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Pherenzia',
    icon: Github,
    description: 'View my code and contributions',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mitchell-riley/',
    icon: Linkedin,
    description: 'Connect with me professionally',
  },
  {
    name: 'Resume',
    href: '/resume.pdf',
    icon: FileText,
    description: 'Download my resume',
  },
]

const availability = [
  {
    icon: Clock,
    title: 'Response Time',
    description: 'I typically respond within 24 hours',
  },
  {
    icon: FileText,
    title: 'Availability',
    description: 'Available for freelance projects and collaborations',
  },
]

export default function ContactInfo() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Contact Methods */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Get in touch
        </h3>
        <div className="space-y-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-white dark:bg-secondary-800 border border-gray-200 dark:border-secondary-700 hover:shadow-md transition-shadow duration-200"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  method.primary 
                    ? 'bg-primary-100 dark:bg-primary-900/30' 
                    : 'bg-gray-100 dark:bg-secondary-700'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    method.primary 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {method.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {method.description}
                  </p>
                  {method.href.startsWith('#') ? (
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {method.value}
                    </p>
                  ) : (
                    <a
                      href={method.href}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                    >
                      {method.value}
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Connect with me
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-secondary-800 border border-gray-200 dark:border-secondary-700 hover:shadow-md transition-all duration-200 group"
              >
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {social.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {social.description}
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Availability
        </h4>
        <div className="space-y-3">
          {availability.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-secondary-700"
              >
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-200 dark:border-primary-800"
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Ready to work together?
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Let's discuss your project and bring your ideas to life.
        </p>
        <Button variant="primary" href="mailto:d.r.mitchellriley@gmail.com">
          Start a Conversation
        </Button>
      </motion.div>
    </motion.div>
  )
}
