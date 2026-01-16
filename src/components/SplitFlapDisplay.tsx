import { useState, useEffect, useRef, useCallback } from 'react';
import { SplitFlapCharacter } from './SplitFlapCharacter';
import { CHARACTERS, getRandomColor } from './SplitFlapUtils';

export interface TextSegment {
  text: string;
  color?: string;
  rightAlign?: boolean;
}

export interface ContentLine {
  segments: TextSegment[];
  rightAlign?: boolean;
  onClick?: () => void;
}

interface SplitFlapDisplayProps {
  content: ContentLine[];
  cols: number;
  rows: number;
  onAnimationComplete?: () => void;
  taglineContentIndex?: number;
  showArrow?: boolean;
  isMobile?: boolean;
}

interface CharacterData {
  char: string;
  color: string;
  onClick?: () => void;
  contentLineIndex?: number;
}

function processContent(content: ContentLine[], cols: number): CharacterData[][] {
  const result: CharacterData[][] = [];
  
  content.forEach((line, lineIndex) => {
    const isNewlineOnly = line.segments.length === 1 && line.segments[0].text === '\\n';
    
    if (isNewlineOnly) {
      const blankRow: CharacterData[] = Array(cols).fill(null).map(() => ({ 
        char: ' ', 
        color: 'text-amber-50',
        onClick: line.onClick,
        contentLineIndex: lineIndex
      }));
      result.push(blankRow);
      return;
    }
    
    const charDataArray: CharacterData[] = [];
    
    line.segments.forEach(segment => {
      const segmentText = segment.text;
      const color = segment.color || 'text-amber-50';
      
      for (let i = 0; i < segmentText.length; i++) {
        charDataArray.push({
          char: segmentText[i].toUpperCase(),
          color: color,
          onClick: line.onClick,
          contentLineIndex: lineIndex
        });
      }
    });
    
    const isRightAligned = line.rightAlign || line.segments.some(seg => seg.rightAlign);
    
    if (isRightAligned) {
      const spacesNeeded = cols - charDataArray.length;
      const paddedLine: CharacterData[] = [];
      
      for (let i = 0; i < spacesNeeded; i++) {
        paddedLine.push({ char: ' ', color: 'text-amber-50', onClick: line.onClick, contentLineIndex: lineIndex });
      }
      
      paddedLine.push(...charDataArray);
      result.push(paddedLine);
    } else {
      const words: CharacterData[][] = [];
      let currentWord: CharacterData[] = [];
      
      charDataArray.forEach(charData => {
        if (charData.char === ' ') {
          if (currentWord.length > 0) {
            words.push(currentWord);
            currentWord = [];
          }
        } else {
          currentWord.push(charData);
        }
      });
      
      if (currentWord.length > 0) {
        words.push(currentWord);
      }
      
      const wrappedLines: CharacterData[][] = [];
      let currentLine: CharacterData[] = [];
      
      words.forEach((word) => {
        const needsSpace = currentLine.length > 0;
        const spaceChar: CharacterData = { char: ' ', color: 'text-amber-50', onClick: line.onClick, contentLineIndex: lineIndex };
        const potentialLength = currentLine.length + (needsSpace ? 1 : 0) + word.length;
        
        if (currentLine.length === 0) {
          currentLine.push(...word);
        } else if (potentialLength <= cols) {
          currentLine.push(spaceChar, ...word);
        } else {
          wrappedLines.push(currentLine);
          currentLine = [...word];
        }
      });
      
      if (currentLine.length > 0) {
        wrappedLines.push(currentLine);
      }
      
      result.push(...wrappedLines);
    }
  });
  
  return result;
}

export function SplitFlapDisplay({ content, cols, rows, onAnimationComplete, taglineContentIndex, showArrow, isMobile }: SplitFlapDisplayProps) {
  const [displayGrid, setDisplayGrid] = useState<CharacterData[][]>(
    Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({ char: ' ', color: 'text-amber-50' }))
    )
  );
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [shouldCycle, setShouldCycle] = useState(false);
  
  // Refs for cleanup
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize processContent to avoid recalculating unnecessarily
  const processedContent = useCallback(() => processContent(content, cols), [content, cols]);

  // Initial scramble + settlement animation
  useEffect(() => {
    let frame = 0;
    const maxFrames = 30;
    
    // Clear any existing timeouts from previous renders
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    
    intervalRef.current = setInterval(() => {
      if (frame < maxFrames) {
        const randomGrid = Array(rows).fill(null).map(() =>
          Array(cols).fill(null).map(() => ({
            char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
            color: getRandomColor(0.15)
          }))
        );
        setDisplayGrid(randomGrid);
        frame++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        const processed = processedContent();
        const settlementDuration = 1000;
        const totalCells = cols * rows;
        
        // Create settlement timeouts and track them
        Array.from({ length: totalCells }).forEach((_, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const delay = (index / totalCells) * settlementDuration;
          
          const timeoutId = setTimeout(() => {
            setDisplayGrid(prev => {
              const newGrid = prev.map(r => [...r]);
              const targetChar = processed[row]?.[col] || { char: ' ', color: 'text-amber-50' };
              newGrid[row][col] = targetChar;
              return newGrid;
            });
          }, delay);
          
          timeoutsRef.current.push(timeoutId);
        });

        // Final completion timeout
        const completionTimeout = setTimeout(() => {
          setIsInitialAnimation(false);
          onAnimationComplete?.();
        }, settlementDuration + 200);
        
        timeoutsRef.current.push(completionTimeout);
      }
    }, 50);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [cols, rows]);

  // Handle content changes after initial animation
  useEffect(() => {
    if (!isInitialAnimation) {
      const processed = processedContent();
      
      while (processed.length < rows) {
        processed.push(
          Array(cols).fill(null).map(() => ({ char: ' ', color: 'text-amber-50', onClick: undefined }))
        );
      }
      
      const paddedContent = processed.map(row => {
        const paddedRow = [...row];
        const existingOnClick = row[0]?.onClick;
        const existingContentLineIndex = row[0]?.contentLineIndex;
        while (paddedRow.length < cols) {
          paddedRow.push({ char: ' ', color: 'text-amber-50', onClick: existingOnClick, contentLineIndex: existingContentLineIndex });
        }
        return paddedRow.slice(0, cols);
      }).slice(0, rows);
      
      setShouldCycle(true);
      
      const cycleStartTimeout = setTimeout(() => {
        setDisplayGrid(paddedContent);
        const cycleEndTimeout = setTimeout(() => setShouldCycle(false), 500);
        timeoutsRef.current.push(cycleEndTimeout);
      }, 50);
      
      timeoutsRef.current.push(cycleStartTimeout);
    }
  }, [content, isInitialAnimation, cols, rows]);

  return (
    <>
      {displayGrid.map((row, rowIndex) => {
        const hasClickHandler = row.some(charData => charData.onClick);
        const rowContentLineIndex = row[0]?.contentLineIndex;
        const isTaglineRow = taglineContentIndex !== undefined && rowContentLineIndex === taglineContentIndex;
        const shouldShowArrow = showArrow && isTaglineRow;
        
        return (
          <div key={rowIndex} className="flex items-center gap-4">
            <div 
              className={`flex gap-0.5 md:gap-1 ${hasClickHandler ? 'cursor-pointer' : ''}`}
              onClick={hasClickHandler ? row[0]?.onClick : undefined}
            >
              {row.map((charData, colIndex) => (
                <SplitFlapCharacter
                  key={`${rowIndex}-${colIndex}`}
                  char={charData.char}
                  color={charData.color}
                  delay={rowIndex * cols + colIndex}
                  isAnimating={isInitialAnimation}
                  shouldCycle={shouldCycle && !isInitialAnimation}
                />
              ))}
            </div>
            {shouldShowArrow && (
              <div 
                className="text-white/50 text-2xl flex items-center"
                style={{ height: isMobile ? '2.25rem' : '3rem' }}
              >
                ↵
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
