import { motion } from 'framer-motion'
import Hero from '@/components/Sections/Hero'
import FeaturedProjects from '@/components/Sections/FeaturedProjects'
import Skills from '@/components/Sections/Skills'
import About from '@/components/Sections/About'
import Contact from '@/components/Sections/Contact'
import { HomeMetaTags } from '@/components/SEO/MetaTags'
import { PersonStructuredData, WebSiteStructuredData, OrganizationStructuredData } from '@/components/SEO/StructuredData'

export default function Home() {
  return (
    <>
      <HomeMetaTags />
      <PersonStructuredData />
      <WebSiteStructuredData />
      <OrganizationStructuredData />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Contact />
      </motion.div>
    </>
  )
}
