import { useEffect, useState, useRef } from 'react';
import { CHARACTERS, getRandomColor } from './SplitFlapUtils';

interface SplitFlapCharacterProps {
  char: string;
  color?: string;
  delay?: number;
  isAnimating?: boolean;
  shouldCycle?: boolean;
}

export function SplitFlapCharacter({ char, color = 'text-amber-50', delay = 0, isAnimating = false, shouldCycle = false }: SplitFlapCharacterProps) {
  const [displayChar, setDisplayChar] = useState(char);
  const [displayColor, setDisplayColor] = useState(color);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCycling, setIsCycling] = useState(false);
  
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (shouldCycle && char !== displayChar) {
      setIsCycling(true);
      let cycleCount = 0;
      const maxCycles = 8;
      
      const cycleInterval = setInterval(() => {
        if (cycleCount < maxCycles) {
          setDisplayChar(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
          setDisplayColor(getRandomColor(0.15));
          cycleCount++;
        } else {
          clearInterval(cycleInterval);
          setDisplayChar(char);
          setDisplayColor(color);
          setIsCycling(false);
        }
      }, 50);

      return () => clearInterval(cycleInterval);
    } else if (!shouldCycle && char !== displayChar && !isAnimating) {
      setIsFlipping(true);
      
      // Clear any existing timeout
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
      
      flipTimeoutRef.current = setTimeout(() => {
        setDisplayChar(char);
        setDisplayColor(color);
        setIsFlipping(false);
      }, 150);
    } else if (color !== displayColor && !isCycling) {
      setDisplayColor(color);
    }
  }, [char, color, displayChar, displayColor, isAnimating, shouldCycle, isCycling]);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isAnimating) {
      setDisplayChar(char);
      setDisplayColor(color);
    }
  }, [char, color, isAnimating]);

  return (
    <div className="relative w-6 h-9 md:w-8 md:h-12 [perspective:1000px]">
      <div className={`w-full h-full bg-[#1a1a1a] rounded-sm border border-[#333] relative ${isFlipping ? 'animate-flip' : ''}`}>
        {/* Top half */}
        <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden border-b border-[#0a0a0a] bg-[#1a1a1a]">
          <div 
            className={`w-full h-[200%] flex items-center justify-center ${displayColor} select-none font-['Inconsolata',_monospace] font-black leading-none`}
            style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.875rem)' }}
          >
            {displayChar === ' ' ? '\u00A0' : displayChar}
          </div>
        </div>
        
        {/* Bottom half */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden bg-[#1a1a1a]">
          <div 
            className={`w-full h-[200%] flex items-center justify-center ${displayColor} select-none -translate-y-1/2 font-['Inconsolata',_monospace] font-black leading-none`}
            style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.875rem)' }}
          >
            {displayChar === ' ' ? '\u00A0' : displayChar}
          </div>
        </div>

        {/* Highlight effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
