import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { ExternalLink, Github, Star } from 'lucide-react'
import { useProjects } from '@/hooks/useGitHub'
import Card from '@/components/UI/Card'
import Badge from '@/components/UI/Badge'
import Button from '@/components/UI/Button'

const getProjectColor = (category: string): string => {
  const colors: Record<string, string> = {
    web: '3b82f6',      // Blue
    fullstack: '10b981', // Green
    backend: 'ef4444',   // Red
    mobile: '8b5cf6',    // Purple
    tool: '06b6d4',      // Cyan
    other: '6b7280',     // Gray
  }
  return colors[category] || '6b7280'
}

export default function FeaturedProjects() {
  const { featuredProjects, loading, error } = useProjects()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  if (loading) {
    return (
      <section className="section-padding bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 dark:bg-secondary-700 rounded-lg w-1/3 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-lg w-1/2 mx-auto mb-12"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 dark:bg-secondary-700 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded-lg w-3/4 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-full w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="card p-8 max-w-md mx-auto">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Here are some of my standout projects that showcase my skills and passion for creating innovative solutions.
          </p>
        </motion.div>

        {featuredProjects.length === 0 ? (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Card className="p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                No Featured Projects Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Check back soon for featured projects, or view all projects in the projects section.
              </p>
              <Link to="/projects">
                <Button variant="primary">View All Projects</Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col">
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://via.placeholder.com/400x300/${getProjectColor(project.category)}/ffffff?text=${encodeURIComponent(project.title)}`}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `
                          <div class="text-4xl font-bold text-primary-600 dark:text-primary-400">
                            ${project.title.charAt(0)}
                          </div>
                        `
                      }}
                    />
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">Featured</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="primary" size="sm">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" size="sm">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button
                        variant="primary"
                        size="sm"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </Button>
                      
                      {project.liveUrl && (
                        <Button
                          variant="secondary"
                          size="sm"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Projects CTA */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/projects">
            <Button variant="secondary" size="lg">
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
