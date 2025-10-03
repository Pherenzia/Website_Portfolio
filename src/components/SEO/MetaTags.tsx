import { Helmet } from 'react-helmet-async'

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export default function MetaTags({
  title = 'Mitchell Riley - Full Stack Developer',
  description = 'Mitchell Riley - Full Stack Developer Portfolio. Showcasing innovative projects and technical expertise in web development.',
  keywords = [
    'Mitchell Riley',
    'Full Stack Developer',
    'React',
    'TypeScript',
    'Web Development',
    'Portfolio',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript',
    'Node.js',
    'GitHub',
  ],
  image = 'https://via.placeholder.com/1200x630/0ea5e9/ffffff?text=Mitchell+Riley+-+Full+Stack+Developer',
  url = 'https://kaiga.github.io/Website_Portfolio',
  type = 'website',
  author = 'Mitchell Riley',
  publishedTime,
  modifiedTime,
}: MetaTagsProps) {
  const fullTitle = title.includes('Mitchell Riley') ? title : `${title} | Mitchell Riley`
  const fullUrl = url.startsWith('http') ? url : `https://kaiga.github.io/Website_Portfolio${url}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en-US" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Mitchell Riley Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@mitchellriley" />
      <meta name="twitter:site" content="@mitchellriley" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content="Web Development" />
          <meta property="article:tag" content="React" />
          <meta property="article:tag" content="TypeScript" />
        </>
      )}

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  )
}

// Predefined meta tags for different pages
export function HomeMetaTags() {
  return (
    <MetaTags
      title="Mitchell Riley - Full Stack Developer"
      description="Mitchell Riley - Full Stack Developer Portfolio. Showcasing innovative projects and technical expertise in React, TypeScript, and modern web technologies."
      url="https://kaiga.github.io/Website_Portfolio"
    />
  )
}

export function AboutMetaTags() {
  return (
    <MetaTags
      title="About - Mitchell Riley"
      description="Learn more about Mitchell Riley - Full Stack Developer with expertise in React, TypeScript, and modern web technologies."
      url="https://kaiga.github.io/Website_Portfolio/about"
    />
  )
}

export function ProjectsMetaTags() {
  return (
    <MetaTags
      title="Projects - Mitchell Riley"
      description="Explore Mitchell Riley's portfolio of web development projects, showcasing expertise in React, TypeScript, and modern technologies."
      url="https://kaiga.github.io/Website_Portfolio/projects"
    />
  )
}

export function ContactMetaTags() {
  return (
    <MetaTags
      title="Contact - Mitchell Riley"
      description="Get in touch with Mitchell Riley - Full Stack Developer. Available for freelance opportunities and collaborations."
      url="https://kaiga.github.io/Website_Portfolio/contact"
    />
  )
}
