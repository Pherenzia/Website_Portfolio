import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validateName,
  validateMessage,
  validateSubject,
  validateUrl,
  sanitizeInput,
  validateContactForm,
} from '../validation'

describe('validation utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toEqual({
        isValid: true,
        errors: [],
      })
      expect(validateEmail('user.name@domain.co.uk')).toEqual({
        isValid: true,
        errors: [],
      })
    })

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toEqual({
        isValid: false,
        errors: ['Please enter a valid email address'],
      })
      expect(validateEmail('test@')).toEqual({
        isValid: false,
        errors: ['Please enter a valid email address'],
      })
      expect(validateEmail('')).toEqual({
        isValid: false,
        errors: ['Email is required'],
      })
    })

    it('should reject emails that are too long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com'
      expect(validateEmail(longEmail)).toEqual({
        isValid: false,
        errors: ['Email address is too long'],
      })
    })
  })

  describe('validateName', () => {
    it('should validate correct names', () => {
      expect(validateName('John Doe')).toEqual({
        isValid: true,
        errors: [],
      })
      expect(validateName("O'Connor")).toEqual({
        isValid: true,
        errors: [],
      })
      expect(validateName('Mary-Jane')).toEqual({
        isValid: true,
        errors: [],
      })
    })

    it('should reject invalid names', () => {
      expect(validateName('')).toEqual({
        isValid: false,
        errors: ['Name is required'],
      })
      expect(validateName('A')).toEqual({
        isValid: false,
        errors: ['Name must be at least 2 characters long'],
      })
      expect(validateName('John123')).toEqual({
        isValid: false,
        errors: ['Name can only contain letters, spaces, hyphens, and apostrophes'],
      })
    })
  })

  describe('validateMessage', () => {
    it('should validate correct messages', () => {
      expect(validateMessage('This is a valid message with sufficient length')).toEqual({
        isValid: true,
        errors: [],
      })
    })

    it('should reject messages that are too short', () => {
      expect(validateMessage('Short')).toEqual({
        isValid: false,
        errors: ['Message must be at least 10 characters long'],
      })
    })

    it('should reject messages with suspicious content', () => {
      expect(validateMessage('Hello <script>alert("xss")</script>')).toEqual({
        isValid: false,
        errors: ['Message contains potentially harmful content'],
      })
    })
  })

  describe('validateSubject', () => {
    it('should validate correct subjects', () => {
      expect(validateSubject('Project Inquiry')).toEqual({
        isValid: true,
        errors: [],
      })
    })

    it('should reject subjects that are too short', () => {
      expect(validateSubject('Hi')).toEqual({
        isValid: false,
        errors: ['Subject must be at least 3 characters long'],
      })
    })
  })

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com')).toEqual({
        isValid: true,
        errors: [],
      })
      expect(validateUrl('http://example.com')).toEqual({
        isValid: true,
        errors: [],
      })
    })

    it('should reject invalid URLs', () => {
      expect(validateUrl('not-a-url')).toEqual({
        isValid: false,
        errors: ['Please enter a valid URL'],
      })
      expect(validateUrl('ftp://example.com')).toEqual({
        isValid: false,
        errors: ['Only HTTP and HTTPS URLs are allowed'],
      })
    })
  })

  describe('sanitizeInput', () => {
    it('should sanitize HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;')
      expect(sanitizeInput('Hello & goodbye')).toBe('Hello &amp; goodbye')
    })

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello')
    })
  })

  describe('validateContactForm', () => {
    it('should validate a complete valid form', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'I would like to discuss a potential project with you.',
      }
      expect(validateContactForm(formData)).toEqual({
        isValid: true,
        errors: [],
      })
    })

    it('should return errors for invalid form data', () => {
      const formData = {
        name: '',
        email: 'invalid-email',
        subject: 'Hi',
        message: 'Short',
      }
      const result = validateContactForm(formData)
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })
})
