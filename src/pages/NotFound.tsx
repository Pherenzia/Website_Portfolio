import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/UI/Button'
import MetaTags from '@/components/SEO/MetaTags'

export default function NotFound() {
  return (
    <>
      <MetaTags
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
        url="https://Pherenzia.github.io/Website_Portfolio/404"
      />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md w-full"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl sm:text-9xl font-bold text-primary-600 dark:text-primary-400 mb-6"
          >
            404
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Page Not Found
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 mb-8"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button variant="primary" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </Button>
            </Link>
            
            <Button 
              variant="secondary" 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
