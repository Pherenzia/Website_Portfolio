import { Helmet } from 'react-helmet-async'

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'Organization'
  data: Record<string, any>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    }

    return JSON.stringify(baseData, null, 2)
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {getStructuredData()}
      </script>
    </Helmet>
  )
}

// Predefined structured data components
export function PersonStructuredData() {
  const personData = {
    name: 'Mitchell Riley',
    jobTitle: 'Full Stack Developer',
    description: 'Full Stack Developer passionate about creating innovative solutions and delivering exceptional user experiences.',
    url: 'https://Pherenzia.github.io/Website_Portfolio',
    image: 'https://via.placeholder.com/200x200/0ea5e9/ffffff?text=MR',
    sameAs: [
      'https://github.com/Pherenzia',
      'https://www.linkedin.com/in/mitchell-riley/',
      'https://twitter.com/mitchellriley',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    email: 'd.r.mitchellriley@gmail.com',
    telephone: '808-203-7139',
    knowsAbout: [
      'React',
      'TypeScript',
      'Node.js',
      'JavaScript',
      'Web Development',
      'Full Stack Development',
      'Frontend Development',
      'Backend Development',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of California, Berkeley',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'TechCorp Solutions',
    },
  }

  return <StructuredData type="Person" data={personData} />
}

export function WebSiteStructuredData() {
  const websiteData = {
    name: 'Mitchell Riley - Full Stack Developer',
    description: 'Mitchell Riley - Full Stack Developer Portfolio. Showcasing innovative projects and technical expertise.',
    url: 'https://Pherenzia.github.io/Website_Portfolio',
    author: {
      '@type': 'Person',
      name: 'Mitchell Riley',
    },
    publisher: {
      '@type': 'Person',
      name: 'Mitchell Riley',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://Pherenzia.github.io/Website_Portfolio/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <StructuredData type="WebSite" data={websiteData} />
}

export function OrganizationStructuredData() {
  const organizationData = {
    name: 'Mitchell Riley - Portfolio',
    description: 'Professional portfolio showcasing full stack development projects and expertise.',
    url: 'https://Pherenzia.github.io/Website_Portfolio',
    logo: 'https://via.placeholder.com/100x100/0ea5e9/ffffff?text=MR',
    founder: {
      '@type': 'Person',
      name: 'Mitchell Riley',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '808-203-7139',
      contactType: 'customer service',
      email: 'd.r.mitchellriley@gmail.com',
    },
  }

  return <StructuredData type="Organization" data={organizationData} />
}
