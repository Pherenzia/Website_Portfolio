import { motion } from 'framer-motion'
import { useState } from 'react'
import ProjectGrid from '@/components/Sections/ProjectGrid'
import ProjectFilter from '@/components/Sections/ProjectFilter'
import { useProjects } from '@/hooks/useGitHub'
import { ProjectCategory } from '@/types'
import { ProjectsMetaTags } from '@/components/SEO/MetaTags'

export default function Projects() {
  const { projects, projectsByCategory, loading, error } = useProjects()
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projectsByCategory[selectedCategory] || []

  return (
    <>
      <ProjectsMetaTags />
      
      <div className="pt-16 lg:pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              My <span className="gradient-text">Projects</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              A collection of projects that showcase my skills and passion for creating innovative solutions
            </motion.p>
          </div>

          {/* Filter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <ProjectFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              projectsByCategory={projectsByCategory}
            />
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ProjectGrid
              projects={filteredProjects}
              loading={loading}
              error={error}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
