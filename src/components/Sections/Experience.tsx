import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Building } from 'lucide-react'
import Badge from '@/components/UI/Badge'

const experiences = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    startDate: '2022-01',
    endDate: null,
    current: true,
    description: [
      'Led development of scalable web applications serving 100k+ users',
      'Architected microservices infrastructure reducing response time by 40%',
      'Mentored junior developers and established coding best practices',
      'Collaborated with cross-functional teams to deliver high-quality products',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    startDate: '2020-06',
    endDate: '2021-12',
    current: false,
    description: [
      'Developed and maintained full-stack web applications',
      'Implemented CI/CD pipelines improving deployment efficiency',
      'Created responsive user interfaces with modern design principles',
      'Optimized database queries resulting in 50% performance improvement',
    ],
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Redis', 'Kubernetes'],
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'WebDesign Co.',
    location: 'Austin, TX',
    startDate: '2019-03',
    endDate: '2020-05',
    current: false,
    description: [
      'Built responsive web applications using React and modern CSS',
      'Collaborated with designers to implement pixel-perfect UIs',
      'Integrated third-party APIs and services',
      'Maintained and updated legacy codebases',
    ],
    technologies: ['React', 'JavaScript', 'Sass', 'Webpack', 'REST APIs'],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-white dark:bg-secondary-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey in software development, building innovative solutions and growing as a developer.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"></div>

            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-secondary-900 z-10"></div>

                {/* Experience card */}
                <div className="ml-16 bg-white dark:bg-secondary-800 rounded-xl shadow-lg border border-gray-200 dark:border-secondary-700 p-8 hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {experience.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{experience.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(experience.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })} - {experience.current ? 'Present' : new Date(experience.endDate!).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-6">
                    {experience.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
