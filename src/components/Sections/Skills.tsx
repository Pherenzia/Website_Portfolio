import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Badge from '@/components/UI/Badge'

const skills = [
  // Frontend
  { name: 'React', level: 'expert', category: 'frontend' },
  { name: 'TypeScript', level: 'expert', category: 'frontend' },
  { name: 'Next.js', level: 'advanced', category: 'frontend' },
  { name: 'Vue.js', level: 'intermediate', category: 'frontend' },
  { name: 'Tailwind CSS', level: 'expert', category: 'frontend' },
  { name: 'Sass/SCSS', level: 'advanced', category: 'frontend' },
  { name: 'Framer Motion', level: 'intermediate', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 'advanced', category: 'backend' },
  { name: 'Express.js', level: 'advanced', category: 'backend' },
  { name: 'Python', level: 'intermediate', category: 'backend' },
  { name: 'Django', level: 'intermediate', category: 'backend' },
  { name: 'FastAPI', level: 'intermediate', category: 'backend' },
  { name: 'REST APIs', level: 'expert', category: 'backend' },
  { name: 'GraphQL', level: 'intermediate', category: 'backend' },
  
  // Database
  { name: 'PostgreSQL', level: 'advanced', category: 'database' },
  { name: 'MongoDB', level: 'advanced', category: 'database' },
  { name: 'Redis', level: 'intermediate', category: 'database' },
  { name: 'Prisma', level: 'advanced', category: 'database' },
  { name: 'Mongoose', level: 'intermediate', category: 'database' },
  
  // Tools
  { name: 'Git', level: 'expert', category: 'tool' },
  { name: 'Docker', level: 'intermediate', category: 'tool' },
  { name: 'AWS', level: 'intermediate', category: 'tool' },
  { name: 'Firebase', level: 'advanced', category: 'tool' },
  { name: 'Vercel', level: 'advanced', category: 'tool' },
  { name: 'Figma', level: 'intermediate', category: 'tool' },
  { name: 'Jest', level: 'advanced', category: 'tool' },
  { name: 'Cypress', level: 'intermediate', category: 'tool' },
]

const skillCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tool: 'Tools & Others',
}

const levelColors: Record<string, string> = {
  beginner: 'secondary',
  intermediate: 'primary',
  advanced: 'success',
  expert: 'danger',
}

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

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
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of the technologies and tools I work with to create exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {skillCategories[category as keyof typeof skillCategories]}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <Badge
                      variant={levelColors[skill.level] as any}
                      size="md"
                      className="relative group"
                    >
                      <span>{skill.name}</span>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                      </div>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="card p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Technology evolves rapidly, and I'm committed to staying current with the latest trends and best practices. 
              I regularly explore new frameworks, tools, and methodologies to enhance my skills and deliver cutting-edge solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
