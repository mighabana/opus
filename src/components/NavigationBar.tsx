import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SplitFlapDisplay, ContentLine } from './SplitFlapDisplay';

interface NavigationItem {
  label: string;
  href: string;
}

const navItems: NavigationItem[] = [
  { label: 'CV', href: '/cv' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'PHOTOS', href: '/portfolio' },
  { label: 'BLOG', href: '/blog' },
];

const navColors = [
  'text-orange-400', // CV
  'text-blue-400',   // Projects
  'text-green-400',  // Photos
  'text-purple-400', // Blog
];

const navGlowColors = [
  'bg-orange-500/20', // CV
  'bg-blue-500/20',   // Projects
  'bg-green-500/20',  // Photos
  'bg-purple-500/20', // Blog
];

const navUnderlineColors = [
  'from-orange-600 via-orange-400 to-orange-600', // CV
  'from-blue-600 via-blue-400 to-blue-600',       // Projects
  'from-green-600 via-green-400 to-green-600',    // Photos
  'from-purple-600 via-purple-400 to-purple-600', // Blog
];

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const activeIndex = navItems.findIndex(item => item.href === location.pathname);

  const handleNavClick = (href: string) => {
    navigate(href);
    // In a real app, you would navigate to the href
    console.log(`Navigating to ${href}`);
  };

  return (
    <motion.nav 
      className="w-full px-6 py-2 flex items-center justify-center bg-black/80 backdrop-blur-md border-b border-gray-800/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          const isHovered = hoveredIndex === index;
          
          // Use assigned color for each item
          const textColor = isActive || isHovered ? navColors[index] : 'text-amber-50';
          
          // Create content for SplitFlapDisplay
          const content: ContentLine[] = [{
            segments: [{ text: item.label, color: textColor }]
          }];
          
          return (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group px-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect for active item */}
              {isActive && (
                <motion.div
                  className={`absolute inset-0 ${navGlowColors[index]} rounded-lg blur-xl`}
                  layoutId="navGlow"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Split flap display */}
              <div className="relative z-10 flex justify-center items-center">
                <SplitFlapDisplay
                  content={content}
                  cols={item.label.length}
                  rows={1}
                />
              </div>

              {/* Underline indicator */}
              {isActive && (
                <motion.div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] h-0.5 bg-gradient-to-r ${navUnderlineColors[index]}`}
                  layoutId="navUnderline"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover effect */}
              {isHovered && !isActive && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] h-0.5 bg-gray-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Decorative elements */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-500 animate-pulse" 
        style={{ animationDelay: '0.5s' }} 
      />
    </motion.nav>
  );
};
