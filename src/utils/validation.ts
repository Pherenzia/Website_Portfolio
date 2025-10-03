// Input validation utilities for security

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = []
  
  if (!email) {
    errors.push('Email is required')
    return { isValid: false, errors }
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address')
  }
  
  // Length validation
  if (email.length > 254) {
    errors.push('Email address is too long')
  }
  
  // Check for suspicious patterns
  if (email.includes('..') || email.includes('@.') || email.includes('.@')) {
    errors.push('Email address contains invalid characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Name validation
export const validateName = (name: string): ValidationResult => {
  const errors: string[] = []
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required')
    return { isValid: false, errors }
  }
  
  // Length validation
  if (name.length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (name.length > 50) {
    errors.push('Name must be less than 50 characters long')
  }
  
  // Character validation (allow letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(name)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes')
  }
  
  // Check for suspicious patterns
  if (name.includes('  ')) {
    errors.push('Name cannot contain consecutive spaces')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Message validation
export const validateMessage = (message: string): ValidationResult => {
  const errors: string[] = []
  
  if (!message || message.trim().length === 0) {
    errors.push('Message is required')
    return { isValid: false, errors }
  }
  
  // Length validation
  if (message.length < 10) {
    errors.push('Message must be at least 10 characters long')
  }
  
  if (message.length > 2000) {
    errors.push('Message must be less than 2000 characters long')
  }
  
  // Check for suspicious patterns (basic XSS prevention)
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

// Subject validation
export const validateSubject = (subject: string): ValidationResult => {
  const errors: string[] = []
  
  if (!subject || subject.trim().length === 0) {
    errors.push('Subject is required')
    return { isValid: false, errors }
  }
  
  // Length validation
  if (subject.length < 3) {
    errors.push('Subject must be at least 3 characters long')
  }
  
  if (subject.length > 100) {
    errors.push('Subject must be less than 100 characters long')
  }
  
  // Check for suspicious patterns
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

// URL validation (for external links)
export const validateUrl = (url: string): ValidationResult => {
  const errors: string[] = []
  
  if (!url) {
    errors.push('URL is required')
    return { isValid: false, errors }
  }
  
  try {
    const urlObj = new URL(url)
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      errors.push('Only HTTP and HTTPS URLs are allowed')
    }
    
    // Check for suspicious domains (basic check)
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

// Sanitize input (basic HTML sanitization)
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

// Rate limiting simulation (in a real app, this would be server-side)
export const checkRateLimit = (): boolean => {
  const key = 'contact_form_submissions'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5
  
  const submissions = JSON.parse(localStorage.getItem(key) || '[]')
  
  // Filter submissions within the time window
  const recentSubmissions = submissions.filter((timestamp: number) => 
    now - timestamp < windowMs
  )
  
  if (recentSubmissions.length >= maxRequests) {
    return false
  }
  
  // Add current submission
  recentSubmissions.push(now)
  localStorage.setItem(key, JSON.stringify(recentSubmissions))
  
  return true
}

// Form validation helper
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
