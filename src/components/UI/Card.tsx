import { ReactNode, forwardRef } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'elevated' | 'outlined'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className = '', 
    hover = false, 
    padding = 'md',
    variant = 'default'
  }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-300'
    
    const variantClasses = {
      default: 'card',
      elevated: 'bg-white dark:bg-secondary-900 shadow-xl',
      outlined: 'bg-white dark:bg-secondary-900 border border-gray-200 dark:border-secondary-700',
    }
    
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }
    
    const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`
    
    const MotionCard = motion.div
    
    return (
      <MotionCard
        ref={ref}
        className={classes}
        whileHover={hover ? { y: -4 } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </MotionCard>
    )
  }
)

Card.displayName = 'Card'

export default Card
