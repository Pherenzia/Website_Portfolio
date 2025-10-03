import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, Calendar, Code } from 'lucide-react'
import { Project } from '@/types'
import Card from '@/components/UI/Card'
import Badge from '@/components/UI/Badge'
import Button from '@/components/UI/Button'

// Function to get color based on project category
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

interface ProjectGridProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

export default function ProjectGrid({ projects, loading, error }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-secondary-700 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded-lg w-3/4 mb-4"></div>
            <div className="flex space-x-2 mb-4">
              <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded-full w-20"></div>
            </div>
            <div className="flex space-x-3">
              <div className="h-8 bg-gray-200 dark:bg-secondary-700 rounded-lg flex-1"></div>
              <div className="h-8 bg-gray-200 dark:bg-secondary-700 rounded-lg w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Failed to Load Projects
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Card>
    )
  }

  if (projects.length === 0) {
    return (
      <Card className="p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Code className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          No Projects Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          No projects match the selected category. Try selecting a different filter.
        </p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card hover className="h-full flex flex-col">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <Badge variant="secondary" size="sm">
                  {project.category}
                </Badge>
              </div>
              {project.featured && (
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              )}
            </div>

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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 text-sm leading-relaxed">
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
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              {/* Project Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(project.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Code className="w-4 h-4" />
                  <span>{project.category}</span>
                </div>
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
  )
}
