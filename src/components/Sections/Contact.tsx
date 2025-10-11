import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Button from '@/components/UI/Button'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'd.r.mitchellriley@gmail.com',
    href: 'mailto:d.r.mitchellriley@gmail.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '808-203-7139',
    href: 'tel:8082037139',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'San Diego, CA',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    href: '#',
  },
]

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-gray-50 dark:bg-secondary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'm always excited to discuss new opportunities and collaborate on innovative projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="card p-6 text-center hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  {info.href.startsWith('#') ? (
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.value}
                    </p>
                  ) : (
                    <a
                      href={info.href}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                    >
                      {info.value}
                    </a>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Whether you need a full-stack application, a modern website, or consultation on your tech stack, 
              I'm here to help bring your vision to reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="/contact">
                Start a Conversation
              </Button>
              <Button variant="secondary" size="lg" href="/projects">
                View My Work
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
