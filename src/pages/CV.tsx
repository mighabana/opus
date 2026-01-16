import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TimelineRole } from '../components/TimelineRole';
import { RoleDetailModal } from '../components/RoleDetailModal';
import { NavigationBar } from '../components/NavigationBar';
import { ChevronDown } from 'lucide-react';

interface Role {
  id: number;
  company: string;
  role: string;
  description: string;
  period: string;
  logo: string;
  fullDescription: string;
  milestones: Array<{ title: string; description: string }>;
  outputs: Array<{ title: string; description: string }>;
  technologies?: string[];
}

const roles: Role[] = [
  {
    id: 1,
    company: 'TechCorp Industries',
    role: 'Senior Software Engineer',
    description: 'Global technology company specializing in cloud infrastructure and enterprise solutions.',
    period: 'Jan 2022 - Present',
    logo: 'https://images.unsplash.com/photo-1661347998996-dcf102498c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    fullDescription: 'As a Senior Software Engineer at TechCorp Industries, I lead the development of scalable cloud infrastructure solutions serving millions of users globally. My work focuses on architecting microservices, optimizing performance, and mentoring junior developers.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Kubernetes', 'AWS', 'GraphQL', 'PostgreSQL'],
    milestones: [
      {
        title: 'Microservices Architecture Migration',
        description: 'Led the migration from monolithic architecture to microservices, resulting in 40% improvement in deployment speed and 99.9% uptime.',
      },
      {
        title: 'Team Leadership',
        description: 'Managed and mentored a team of 5 engineers, implementing agile practices and code review processes that improved code quality by 35%.',
      },
      {
        title: 'Performance Optimization',
        description: 'Reduced API response times by 60% through database query optimization and implementing Redis caching strategies.',
      },
    ],
    outputs: [
      {
        title: 'Cloud Infrastructure Platform',
        description: 'Architected and built a multi-tenant cloud platform handling 50M+ requests daily with auto-scaling capabilities.',
      },
      {
        title: 'Internal Developer Tools',
        description: 'Created CLI tools and dashboards that reduced developer onboarding time from 2 weeks to 3 days.',
      },
    ],
  },
  {
    id: 2,
    company: 'StartupHub',
    role: 'Lead Frontend Developer',
    description: 'Fast-growing B2B SaaS startup building collaboration tools for remote teams.',
    period: 'Mar 2020 - Dec 2021',
    logo: 'https://images.unsplash.com/photo-1594235048794-fae8583a5af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    fullDescription: 'At StartupHub, I spearheaded the frontend development of a real-time collaboration platform used by over 10,000 teams worldwide. I established frontend architecture standards and led the migration to a modern tech stack.',
    technologies: ['React', 'Redux', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Jest', 'Cypress'],
    milestones: [
      {
        title: 'Real-time Collaboration Features',
        description: 'Implemented WebSocket-based real-time editing and presence features, enabling seamless collaboration for distributed teams.',
      },
      {
        title: 'Design System Creation',
        description: 'Built a comprehensive component library and design system adopted across all product teams, reducing development time by 30%.',
      },
      {
        title: 'Mobile-First Redesign',
        description: 'Led the mobile-first responsive redesign that increased mobile user engagement by 150%.',
      },
    ],
    outputs: [
      {
        title: 'Collaboration Dashboard',
        description: 'Built the core collaboration interface handling real-time updates for thousands of concurrent users.',
      },
      {
        title: 'Component Library',
        description: 'Developed 50+ reusable React components with comprehensive documentation and Storybook integration.',
      },
    ],
  },
  {
    id: 3,
    company: 'Global Finance Group',
    role: 'Full Stack Developer',
    description: 'Fortune 500 financial services company providing investment and banking solutions.',
    period: 'Jun 2018 - Feb 2020',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    fullDescription: 'Working in the fintech division, I developed secure, compliant web applications for banking and investment services. My role involved both frontend and backend development with a strong focus on security and regulatory compliance.',
    technologies: ['Angular', 'Java', 'Spring Boot', 'MySQL', 'Docker', 'Jenkins', 'SASS'],
    milestones: [
      {
        title: 'Secure Payment Gateway',
        description: 'Developed a PCI-DSS compliant payment processing system handling $10M+ in daily transactions.',
      },
      {
        title: 'Compliance Automation',
        description: 'Automated regulatory reporting processes, reducing manual work by 80% and ensuring 100% compliance accuracy.',
      },
      {
        title: 'Legacy System Modernization',
        description: 'Migrated critical legacy systems to modern frameworks while maintaining zero downtime.',
      },
    ],
    outputs: [
      {
        title: 'Investment Portfolio Platform',
        description: 'Built real-time portfolio tracking and analytics dashboard used by 50,000+ investors.',
      },
      {
        title: 'API Gateway',
        description: 'Designed and implemented RESTful APIs serving internal and external clients with OAuth2 authentication.',
      },
    ],
  },
  {
    id: 4,
    company: 'Digital Creative Agency',
    role: 'Junior Developer',
    description: 'Creative agency focused on digital experiences for consumer brands and e-commerce.',
    period: 'Aug 2016 - May 2018',
    logo: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    fullDescription: 'Started my professional career building engaging websites and e-commerce platforms for leading consumer brands. Gained foundational experience in web development, responsive design, and client collaboration.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'jQuery', 'WordPress', 'PHP', 'MySQL'],
    milestones: [
      {
        title: 'E-commerce Launch',
        description: 'Contributed to the development and successful launch of 12+ e-commerce websites with integrated payment systems.',
      },
      {
        title: 'Performance Improvements',
        description: 'Optimized site loading times by 50% through image optimization and lazy loading implementation.',
      },
      {
        title: 'Responsive Design Mastery',
        description: 'Became proficient in creating pixel-perfect, responsive designs that work seamlessly across all devices.',
      },
    ],
    outputs: [
      {
        title: 'Brand Websites',
        description: 'Developed custom WordPress themes and plugins for major consumer brands with millions of monthly visitors.',
      },
      {
        title: 'Interactive Campaigns',
        description: 'Created engaging interactive web experiences for marketing campaigns that achieved 200%+ engagement targets.',
      },
    ],
  },
];

export default function CV() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingProgrammatically = useRef(false);
  const programmaticScrollTimeout = useRef<NodeJS.Timeout>();

  // Scroll to active role
  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const targetScroll = index * window.innerHeight;
      isScrollingProgrammatically.current = true;
      
      // Clear any existing timeout
      if (programmaticScrollTimeout.current) {
        clearTimeout(programmaticScrollTimeout.current);
      }
      
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      
      // Set a longer timeout to ensure smooth scroll completes
      programmaticScrollTimeout.current = setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1500);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = (prev + 1) % roles.length;
          scrollToIndex(next);
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = (prev - 1 + roles.length) % roles.length;
          scrollToIndex(next);
          return next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingProgrammatically.current || !containerRef.current) return;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrollingProgrammatically.current || !containerRef.current) return;
        
        const scrollTop = containerRef.current.scrollTop;
        const index = Math.round(scrollTop / window.innerHeight);
        const clampedIndex = Math.max(0, Math.min(index, roles.length - 1));
        
        // Only update if the index actually changed
        setActiveIndex((prev) => {
          if (prev !== clampedIndex) {
            scrollToIndex(clampedIndex);
            return clampedIndex;
          }
          return prev;
        });
      }, 150);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Create curved path
  const pathPoints = roles.map((_, index) => {
    const y = index * 100 + 50;
    const amplitude = 15;
    const frequency = 0.8;
    const x = 50 + Math.sin(index * frequency) * amplitude;
    return { x, y };
  });

  // Generate SVG path
  const generatePath = () => {
    if (pathPoints.length === 0) return '';
    
    let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const current = pathPoints[i];
      const next = pathPoints[i + 1];
      const controlPointY = (current.y + next.y) / 2;
      
      path += ` Q ${current.x} ${controlPointY}, ${next.x} ${next.y}`;
    }
    
    return path;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <NavigationBar />
      </div>

      {/* Timeline container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll scroll-smooth pt-16"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* SVG curved path */}
        <svg
          className="fixed inset-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
          viewBox="0 0 100 400"
        >
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <motion.path
            d={generatePath()}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: (activeIndex + 1) / roles.length }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
          <path
            d={generatePath()}
            fill="none"
            stroke="#374151"
            strokeWidth="0.3"
            opacity="0.5"
          />
        </svg>

        {/* Roles */}
        {roles.map((role, index) => (
          <div
            key={role.id}
            style={{ scrollSnapAlign: 'start' }}
            className="relative"
          >
            <TimelineRole
              company={role.company}
              role={role.role}
              description={role.description}
              period={role.period}
              logo={role.logo}
              index={index}
              isActive={activeIndex === index}
              side={index % 2 === 0 ? 'right' : 'left'}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        ))}
      </div>

      {/* Navigation hint */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center text-gray-500"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm mb-1">↑↓ to navigate • Enter for details</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Role Detail Modal */}
      <RoleDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roleDetail={roles[activeIndex]}
      />

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {roles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              scrollToIndex(index);
            }}
            className="group relative"
            aria-label={`Go to position ${index + 1}`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-orange-500 scale-125'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm bg-white text-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {roles[index].company}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
