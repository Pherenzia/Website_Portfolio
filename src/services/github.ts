import axios from 'axios'
import { GitHubRepository, Project } from '@/types'

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_USERNAME = 'Pherenzia'

const SAMPLE_PROJECTS = [
const SAMPLE_PROJECTS = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.',
    githubUrl: 'https://github.com/Pherenzia/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.mitchellriley.dev',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    featured: true,
    category: 'fullstack' as const,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    githubUrl: 'https://github.com/Pherenzia/task-manager',
    liveUrl: 'https://tasks.mitchellriley.dev',
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io'],
    featured: true,
    category: 'web' as const,
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using multiple weather APIs.',
    githubUrl: 'https://github.com/Pherenzia/weather-dashboard',
    liveUrl: 'https://weather.mitchellriley.dev',
    technologies: ['React', 'JavaScript', 'Chart.js', 'OpenWeather API'],
    featured: true,
    category: 'web' as const,
    createdAt: '2023-05-10T00:00:00Z',
    updatedAt: '2023-12-20T00:00:00Z',
  },
  {
    id: '4',
    title: 'RESTful API Service',
    description: 'A scalable RESTful API service with authentication, rate limiting, and comprehensive documentation. Built with best practices for security and performance.',
    githubUrl: 'https://github.com/Pherenzia/api-service',
    technologies: ['Node.js', 'Express.js', 'JWT', 'Redis', 'Swagger'],
    featured: false,
    category: 'backend' as const,
    createdAt: '2023-07-15T00:00:00Z',
    updatedAt: '2023-11-30T00:00:00Z',
  },
  {
    id: '5',
    title: 'Mobile Expense Tracker',
    description: 'A cross-platform mobile application for tracking expenses with budget management, category analysis, and export functionality.',
    githubUrl: 'https://github.com/Pherenzia/expense-tracker',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    featured: false,
    category: 'mobile' as const,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2023-10-15T00:00:00Z',
  },
  {
    id: '6',
    title: 'CLI Development Tool',
    description: 'A command-line interface tool for automating common development tasks, project setup, and deployment workflows.',
    githubUrl: 'https://github.com/Pherenzia/dev-cli-tool',
    technologies: ['Node.js', 'Commander.js', 'Inquirer.js', 'Chalk'],
    featured: false,
    category: 'tool' as const,
    createdAt: '2023-11-20T00:00:00Z',
    updatedAt: '2023-12-10T00:00:00Z',
  },
]

const CACHE_DURATION = 5 * 60 * 1000
const cache = new Map<string, { data: any; timestamp: number }>()

const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Mitchell-Riley-Portfolio',
  },
})

githubApi.interceptors.request.use((config) => {
  const cacheKey = `${config.method}:${config.url}`
  const cached = cache.get(cacheKey)
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return Promise.reject({
      __isCached: true,
      data: cached.data,
    })
  }
  
  return config
})

githubApi.interceptors.response.use(
  (response) => {
    const cacheKey = `${response.config.method}:${response.config.url}`
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    })
    return response
  },
  (error) => {
    if (error.__isCached) {
      return Promise.resolve({ data: error.data })
    }
    return Promise.reject(error)
  }
)

const handleGitHubError = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 403:
        throw new Error('GitHub API rate limit exceeded. Please try again later.')
      case 404:
        throw new Error('GitHub user or repository not found.')
      case 422:
        throw new Error('Invalid request to GitHub API.')
      default:
        throw new Error(`GitHub API error: ${error.response.status}`)
    }
  } else if (error.request) {
    throw new Error('Network error. Please check your internet connection.')
  } else {
    throw new Error('An unexpected error occurred.')
  }
}

export const fetchUserRepositories = async (): Promise<GitHubRepository[]> => {
  try {
    const response = await githubApi.get(`/users/${GITHUB_USERNAME}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100,
        type: 'owner',
      },
    })
    
    return response.data.filter((repo: GitHubRepository) => 
      !repo.fork && 
      !repo.archived && 
      !repo.disabled &&
      repo.visibility === 'public'
    )
  } catch (error) {
    handleGitHubError(error)
    throw error
  }
}

export const fetchRepository = async (repoName: string): Promise<GitHubRepository> => {
  try {
    const response = await githubApi.get(`/repos/${GITHUB_USERNAME}/${repoName}`)
    return response.data
  } catch (error) {
    handleGitHubError(error)
    throw error
  }
}

export const fetchRepositoryTopics = async (repoName: string): Promise<string[]> => {
  try {
    const response = await githubApi.get(`/repos/${GITHUB_USERNAME}/${repoName}/topics`, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json',
      },
    })
    return response.data.names || []
  } catch (error) {
    console.warn(`Failed to fetch topics for ${repoName}:`, error)
    return []
  }
}

const FEATURED_PROJECTS = ['budgeting-app', 'budgetingapp', 'yokaigacha', 'yokai-gacha']

export const transformRepositoryToProject = (repo: GitHubRepository): Project => {
  const normalizeRepoName = (name: string) => name.toLowerCase().replace(/[-_\s]/g, '')
  const repoNameNormalized = normalizeRepoName(repo.name)
  const isFeaturedProject = FEATURED_PROJECTS.some(name => 
    normalizeRepoName(name) === repoNameNormalized
  )
  return {
    id: repo.id.toString(),
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'No description available',
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    technologies: [repo.language].filter(Boolean) as string[],
    featured: isFeaturedProject || repo.stargazers_count > 5 || repo.forks_count > 2,
    category: determineProjectCategory(repo),
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
  }
}

const EXCLUDED_PROJECTS = [
  'gh-actions-demo',
  'gh actions demo',
  'team-profile-generator',
  'team profile generator',
  'github-cd',
  'github cd',
  '00-practice-app',
  '00 practice app',
  'css-snippet-cheatsheat',
  'css snippet cheatsheat',
  'personal_project',
  'personal-project',
  'personal project',
  'progressive-budget',
  'progressive budget',
  'email-address-regex-gist',
  'email address regex gist',
  'daily-planner',
  'daily planner',
  'quiz-app',
  'quiz app',
  'pull-request-demo',
  'pull request demo',
  'git-init-sample',
  'git init sample',
  'first-day-repo',
  'first day repo',
  'landing-page',
  'landing page',
  'css-snippet-cheatsheet1',
  'css snippet cheatsheet1',
  'css-snippet-cheatsheet',
  'css snippet cheatsheet',
  'password-generator-hw',
  'password generator hw',
  'password-generator',
  'password generator',
]

const shouldExcludeProject = (repo: GitHubRepository): boolean => {
  const name = repo.name.toLowerCase()
  const description = (repo.description || '').toLowerCase()
  const title = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).toLowerCase()
  
  if (name.includes('homework') || description.includes('homework')) {
    return true
  }
  
  for (const excluded of EXCLUDED_PROJECTS) {
    const excludedLower = excluded.toLowerCase()
    if (name.includes(excludedLower) || 
        title.includes(excludedLower) || 
        description.includes(excludedLower)) {
      return true
    }
  }
  
  return false
}

const determineProjectCategory = (repo: GitHubRepository): Project['category'] => {
  const name = repo.name.toLowerCase()
  const description = (repo.description || '').toLowerCase()
  
  if (name.includes('mobile') || name.includes('react-native') || name.includes('flutter')) {
    return 'mobile'
  }
  
  if (name.includes('api') || name.includes('backend') || name.includes('server')) {
    return 'backend'
  }
  
  if (name.includes('fullstack') || name.includes('full-stack')) {
    return 'fullstack'
  }
  
  if (name.includes('tool') || name.includes('cli') || name.includes('utility')) {
    return 'tool'
  }
  
  if (description.includes('mobile') || description.includes('ios') || description.includes('android')) {
    return 'mobile'
  }
  
  if (description.includes('api') || description.includes('backend') || description.includes('server')) {
    return 'backend'
  }
  
  return 'web'
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const repositories = await fetchUserRepositories()
    const filteredRepositories = repositories.filter(repo => !shouldExcludeProject(repo))
    
    const repositoriesWithTopics = await Promise.all(
      filteredRepositories.map(async (repo) => {
        try {
          const topics = await fetchRepositoryTopics(repo.name)
          return { ...repo, topics }
        } catch (error) {
          console.warn(`Failed to fetch topics for ${repo.name}`)
          return repo
        }
      })
    )
    
    const projects = repositoriesWithTopics.map(transformRepositoryToProject)
    
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      const repoA = repositoriesWithTopics.find(r => r.id.toString() === a.id)
      const repoB = repositoriesWithTopics.find(r => r.id.toString() === b.id)
      
      const normalizeRepoName = (name: string) => name.toLowerCase().replace(/[-_\s]/g, '')
      const isAFeatured = repoA && FEATURED_PROJECTS.some(name => 
        normalizeRepoName(repoA.name) === normalizeRepoName(name)
      )
      const isBFeatured = repoB && FEATURED_PROJECTS.some(name => 
        normalizeRepoName(repoB.name) === normalizeRepoName(name)
      )
      
      if (isAFeatured && !isBFeatured) return -1
      if (!isAFeatured && isBFeatured) return 1
      
      if (repoA && repoB) {
        if (repoA.stargazers_count !== repoB.stargazers_count) {
          return repoB.stargazers_count - repoA.stargazers_count
        }
      }
      
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  } catch (error) {
    console.warn('Failed to fetch projects from GitHub, using sample data:', error)
    return SAMPLE_PROJECTS.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }
}

export const fetchUserProfile = async () => {
  try {
    const response = await githubApi.get(`/users/${GITHUB_USERNAME}`)
    return response.data
  } catch (error) {
    console.warn('Failed to fetch user profile from GitHub, using sample data:', error)
    return {
      id: 123456,
      login: 'Pherenzia',
      name: 'Mitchell Riley',
      bio: 'Full Stack Developer passionate about creating innovative solutions and delivering exceptional user experiences.',
      avatar_url: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=MR',
      html_url: 'https://github.com/Pherenzia',
      blog: 'https://pherenzia.github.io/Portfolio-site/',
      location: 'San Diego, CA',
      email: 'd.r.mitchellriley@gmail.com',
      public_repos: 25,
      public_gists: 12,
      followers: 150,
      following: 75,
      created_at: '2018-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
    }
  }
}
