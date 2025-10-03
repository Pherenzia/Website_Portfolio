import { useState, useEffect } from 'react'
import { fetchProjects, fetchUserProfile } from '@/services/github'
import { Project } from '@/types'

interface UseGitHubReturn {
  projects: Project[]
  userProfile: any
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useGitHub(): UseGitHubReturn {
  const [projects, setProjects] = useState<Project[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [projectsData, profileData] = await Promise.all([
        fetchProjects(),
        fetchUserProfile(),
      ])
      
      setProjects(projectsData)
      setUserProfile(profileData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch GitHub data'
      setError(errorMessage)
      console.error('GitHub data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    projects,
    userProfile,
    loading,
    error,
    refetch: fetchData,
  }
}

interface UseProjectsReturn {
  projects: Project[]
  featuredProjects: Project[]
  projectsByCategory: Record<string, Project[]>
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjectsData = async () => {
    try {
      setLoading(true)
      setError(null)
      const projectsData = await fetchProjects()
      setProjects(projectsData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects'
      setError(errorMessage)
      console.error('Projects fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjectsData()
  }, [])

  // Derived state
  const featuredProjects = projects.filter(project => project.featured)
  
  const projectsByCategory = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = []
    }
    acc[project.category].push(project)
    return acc
  }, {} as Record<string, Project[]>)

  return {
    projects,
    featuredProjects,
    projectsByCategory,
    loading,
    error,
    refetch: fetchProjectsData,
  }
}
