import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, GraduationCap, Award } from 'lucide-react'

const education = [
  {
    id: '1',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    startDate: '2015-09',
    endDate: '2019-05',
    current: false,
    gpa: '3.8/4.0',
    description: 'Focused on software engineering, algorithms, and data structures. Completed coursework in web development, database systems, and software engineering principles.',
    achievements: [
      'Dean\'s List for 6 consecutive semesters',
      'Senior Capstone Project: Full-stack web application',
      'Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering',
    ],
  },
  {
    id: '2',
    degree: 'Full Stack Web Development Bootcamp',
    institution: 'Tech Academy',
    location: 'San Francisco, CA',
    startDate: '2019-01',
    endDate: '2019-06',
    current: false,
    description: 'Intensive program covering modern web development technologies and best practices.',
    achievements: [
      'Completed 1000+ hours of hands-on coding',
      'Built 15+ full-stack applications',
      'Learned React, Node.js, Express, MongoDB, and more',
    ],
  },
]

const certifications = [
  {
    name: 'AWS Certified Developer Associate',
    issuer: 'Amazon Web Services',
    date: '2022-03',
    credentialId: 'AWS-123456',
  },
  {
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: '2021-11',
    credentialId: 'GCP-789012',
  },
  {
    name: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    date: '2021-08',
    credentialId: 'CKA-345678',
  },
]

export default function Education() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-gray-50 dark:bg-secondary-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My educational background and professional certifications that support my technical expertise.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
              Education
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-secondary-900 rounded-xl shadow-lg border border-gray-200 dark:border-secondary-700 p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {edu.degree}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="w-4 h-4" />
                          <span className="font-medium">{edu.institution}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(edu.startDate).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })} - {new Date(edu.endDate!).toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        {edu.gpa && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="font-medium">GPA: {edu.gpa}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  {edu.achievements && (
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Award className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
              Professional Certifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white dark:bg-secondary-900 rounded-xl shadow-lg border border-gray-200 dark:border-secondary-700 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(cert.date).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Credential ID: {cert.credentialId}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
