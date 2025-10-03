import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from '../UI/Card'

describe('Card Component', () => {
  it('renders with children', () => {
    render(<Card>Test content</Card>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies default variant classes', () => {
    render(<Card>Test content</Card>)
    const card = screen.getByText('Test content').parentElement
    expect(card).toHaveClass('bg-white', 'dark:bg-secondary-900', 'shadow-lg')
  })

  it('applies elevated variant classes', () => {
    render(<Card variant="elevated">Test content</Card>)
    const card = screen.getByText('Test content').parentElement
    expect(card).toHaveClass('shadow-xl')
  })

  it('applies outlined variant classes', () => {
    render(<Card variant="outlined">Test content</Card>)
    const card = screen.getByText('Test content').parentElement
    expect(card).toHaveClass('border', 'border-gray-200')
  })

  it('applies hover effect when hover prop is true', () => {
    render(<Card hover>Test content</Card>)
    const card = screen.getByText('Test content').parentElement
    expect(card).toHaveClass('hover:shadow-xl', 'hover:-translate-y-1')
  })

  it('applies correct padding classes', () => {
    render(<Card padding="lg">Test content</Card>)
    const card = screen.getByText('Test content').parentElement
    expect(card).toHaveClass('p-8')
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Test content</Card>)
    const card = screen.getByText('Test content').parentElement
    expect(card).toHaveClass('custom-class')
  })
})
