import { motion } from 'framer-motion'
import { ProjectCategory } from '@/types'
import Badge from '@/components/UI/Badge'

interface ProjectFilterProps {
  selectedCategory: ProjectCategory | 'all'
  onCategoryChange: (category: ProjectCategory | 'all') => void
  projectsByCategory: Record<string, any[]>
}

const categories: Array<{ key: ProjectCategory | 'all'; label: string; description: string }> = [
  { key: 'all', label: 'All Projects', description: 'Show all projects' },
  { key: 'web', label: 'Web Apps', description: 'Frontend web applications' },
  { key: 'fullstack', label: 'Full Stack', description: 'Complete web applications' },
  { key: 'backend', label: 'Backend', description: 'API and server applications' },
  { key: 'mobile', label: 'Mobile', description: 'Mobile applications' },
  { key: 'tool', label: 'Tools', description: 'Developer tools and utilities' },
  { key: 'other', label: 'Other', description: 'Miscellaneous projects' },
]

export default function ProjectFilter({ 
  selectedCategory, 
  onCategoryChange, 
  projectsByCategory 
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const count = category.key === 'all' 
          ? Object.values(projectsByCategory).flat().length
          : projectsByCategory[category.key]?.length || 0

        const isSelected = selectedCategory === category.key

        return (
          <motion.button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`relative group ${
              isSelected 
                ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-secondary-800' 
                : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Filter by ${category.label}`}
          >
            <Badge
              variant={isSelected ? 'primary' : 'default'}
              size="lg"
              className="cursor-pointer transition-all duration-200 hover:shadow-lg"
            >
              <span className="flex items-center space-x-2">
                <span>{category.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 dark:bg-secondary-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {count}
                </span>
              </span>
            </Badge>
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {category.description}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
