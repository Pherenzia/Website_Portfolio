export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = []
  
  if (!email) {
    errors.push('Email is required')
    return { isValid: false, errors }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (email.length > 254) {
    errors.push('Email address is too long')
  }
  
  if (email.includes('..') || email.includes('@.') || email.includes('.@')) {
    errors.push('Email address contains invalid characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = []
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required')
    return { isValid: false, errors }
  }
  
  if (name.length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (name.length > 50) {
    errors.push('Name must be less than 50 characters long')
  }
  
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(name)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes')
  }
  
  if (name.includes('  ')) {
    errors.push('Name cannot contain consecutive spaces')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateMessage = (message: string): ValidationResult => {
  const errors: string[] = []
  
  if (!message || message.trim().length === 0) {
    errors.push('Message is required')
    return { isValid: false, errors }
  }
  
  if (message.length < 10) {
    errors.push('Message must be at least 10 characters long')
  }
  
  if (message.length > 2000) {
    errors.push('Message must be less than 2000 characters long')
  }
  
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(message)) {
      errors.push('Message contains potentially harmful content')
      break
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateSubject = (subject: string): ValidationResult => {
  const errors: string[] = []
  
  if (!subject || subject.trim().length === 0) {
    errors.push('Subject is required')
    return { isValid: false, errors }
  }
  
  if (subject.length < 3) {
    errors.push('Subject must be at least 3 characters long')
  }
  
  if (subject.length > 100) {
    errors.push('Subject must be less than 100 characters long')
  }
  
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ]
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(subject)) {
      errors.push('Subject contains potentially harmful content')
      break
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateUrl = (url: string): ValidationResult => {
  const errors: string[] = []
  
  if (!url) {
    errors.push('URL is required')
    return { isValid: false, errors }
  }
  
  try {
    const urlObj = new URL(url)
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      errors.push('Only HTTP and HTTPS URLs are allowed')
    }
    
    const suspiciousDomains = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
    ]
    
    if (suspiciousDomains.some(domain => urlObj.hostname.includes(domain))) {
      errors.push('URL contains suspicious domain')
    }
    
  } catch (error) {
    errors.push('Please enter a valid URL')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const sanitizeInput = (input: string): string => {
  if (!input) return ''
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

export const checkRateLimit = (): boolean => {
  const key = 'contact_form_submissions'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const maxRequests = 5
  
  const submissions = JSON.parse(localStorage.getItem(key) || '[]')
  const recentSubmissions = submissions.filter((timestamp: number) => 
    now - timestamp < windowMs
  )
  
  if (recentSubmissions.length >= maxRequests) {
    return false
  }
  
  recentSubmissions.push(now)
  localStorage.setItem(key, JSON.stringify(recentSubmissions))
  
  return true
}

export const validateContactForm = (formData: {
  name: string
  email: string
  subject: string
  message: string
}): ValidationResult => {
  const errors: string[] = []
  
  const nameResult = validateName(formData.name)
  const emailResult = validateEmail(formData.email)
  const subjectResult = validateSubject(formData.subject)
  const messageResult = validateMessage(formData.message)
  
  if (!nameResult.isValid) errors.push(...nameResult.errors)
  if (!emailResult.isValid) errors.push(...emailResult.errors)
  if (!subjectResult.isValid) errors.push(...subjectResult.errors)
  if (!messageResult.isValid) errors.push(...messageResult.errors)
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}
