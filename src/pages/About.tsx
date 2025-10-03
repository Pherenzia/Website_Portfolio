import { motion } from 'framer-motion'
import AboutSection from '@/components/Sections/About'
import Skills from '@/components/Sections/Skills'
import Experience from '@/components/Sections/Experience'
import Education from '@/components/Sections/Education'
import { AboutMetaTags } from '@/components/SEO/MetaTags'

export default function About() {
  return (
    <>
      <AboutMetaTags />
      
      <div className="pt-16 lg:pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AboutSection />
          <Skills />
          <Experience />
          <Education />
        </motion.div>
      </div>
    </>
  )
}
