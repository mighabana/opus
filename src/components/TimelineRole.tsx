import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';
import { CornerDownLeft } from 'lucide-react';

interface TimelineRoleProps {
  company: string;
  role: string;
  description: string;
  period: string;
  logo: string;
  index: number;
  isActive: boolean;
  side: 'left' | 'right';
  onClick?: () => void;
}

export const TimelineRole: React.FC<TimelineRoleProps> = ({
  company,
  role,
  description,
  period,
  logo,
  index,
  isActive,
  side,
  onClick,
}) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Timeline dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10"
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{
          scale: isActive ? 1.2 : 0.8,
          opacity: isActive ? 1 : 0.6,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className={`w-4 h-4 rounded-full transition-colors duration-400 ${
            isActive ? 'bg-orange-500 shadow-lg shadow-orange-500/50' : 'bg-gray-700'
          }`}
        />
      </motion.div>

      {/* Content card */}
      <motion.div
        className={`absolute ${
          side === 'left' ? 'right-1/2 pr-16' : 'left-1/2 pl-16'
        } w-[400px] max-w-[90vw]`}
        initial={{ opacity: 0, x: side === 'left' ? 20 : -20 }}
        animate={{
          opacity: isActive ? 1 : 0.3,
          x: 0,
          scale: isActive ? 1 : 0.95,
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative">
          {/* Enter icon on the opposite side */}
          <motion.div
            className={`absolute top-1/2 -translate-y-1/2 ${
              side === 'left' ? '-left-12' : '-right-12'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isActive ? 1 : 0.3,
              scale: isActive ? 1 : 0.8,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              animate={
                isActive
                  ? {
                      filter: [
                        'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
                        'drop-shadow(0 0 12px rgba(255, 255, 255, 0.6))',
                        'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CornerDownLeft
                className={`transition-colors duration-500 ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`}
                size={24}
              />
            </motion.div>
          </motion.div>

          {/* Jutting edge - full height triangle on the side facing the dot */}
          <div
            className={`absolute top-0 ${
              side === 'left' ? '-right-3' : '-left-3'
            } h-full w-0`}
            style={{
              borderTop: '100px solid transparent',
              borderBottom: '100px solid transparent',
              [side === 'left' ? 'borderLeft' : 'borderRight']: '12px solid #f97316',
              transition: 'all 0.5s ease',
            }}
          />
          
          <div
            onClick={isActive ? onClick : undefined}
            className={`bg-[#f5ede0] shadow-lg p-6 border transition-all duration-500 ${
              side === 'left' ? 'rounded-l-lg' : 'rounded-r-lg'
            } ${
              isActive 
                ? 'border-orange-500 shadow-orange-500/20 cursor-pointer hover:border-orange-600' 
                : 'border-orange-500/40'
            }`}
          >
            {/* Company logo and name */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
                <ImageWithFallback
                  src={logo}
                  alt={`${company} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="truncate text-black">{company}</h3>
                <p className="text-gray-700 text-sm">{period}</p>
              </div>
            </div>

            {/* Role */}
            <h4 className="mb-2 text-black">{role}</h4>

            {/* Description */}
            <p className="text-gray-800 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
