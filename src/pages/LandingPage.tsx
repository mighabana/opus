import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SplitFlapDisplay,
  ContentLine,
} from "../components/SplitFlapDisplay";

const PREAMBLE = [
  { text: "currently working as a " },
  { text: "enjoyer of all things " },
  { text: "hobby " },
  { text: "trying to be a " },
];

const ROLES = [
  { text: "data engineer", color: "text-orange-400" },
  { text: "coding", color: "text-blue-400" },
  { text: "photographer", color: "text-green-400" },
  { text: "blogger", color: "text-purple-400" },
];

const TAGLINES = [
  { text: "CV", color: "text-orange-400", path: "/cv" },
  { text: "my projects", color: "text-blue-400", path: "/projects" },
  { text: "portfolio", color: "text-green-400", path: "/portfolio" },
  { text: "blog", color: "text-purple-400", path: "/blog" },
];

const TAGLINE_CONTENT_INDEX = 4;

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleTaglineClick = () => {
    const path = TAGLINES[currentTaglineIndex].path;
    if (path) {
      navigate(path);
    }
  };

  useEffect(() => {
    if (!animationComplete) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const path = TAGLINES[currentTaglineIndex].path;
        if (path) {
          navigate(path);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentTaglineIndex(
          (prevIndex) => (prevIndex + 1) % TAGLINES.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentTaglineIndex((prevIndex) =>
          prevIndex === 0 ? TAGLINES.length - 1 : prevIndex - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentTaglineIndex, animationComplete, navigate]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!animationComplete) return;

    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setCurrentTaglineIndex((prevIndex) => {
          if (scrollingDown) {
            return (prevIndex + 1) % TAGLINES.length;
          } else {
            return prevIndex === 0
              ? TAGLINES.length - 1
              : prevIndex - 1;
          }
        });

        lastScrollY = window.scrollY;
      }, 150);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [animationComplete]);

  const content: ContentLine[] = [
    {
      segments: [{ text: "Hi! I'm Miguel..." }],
    },
    {
      segments: [{ text: "\\n" }],
    },
    {
      segments: [
        { text: PREAMBLE[currentTaglineIndex].text },
        {
          text: ROLES[currentTaglineIndex].text,
          color: ROLES[currentTaglineIndex].color,
        },
      ],
    },
    {
      segments: [{ text: "\\n" }],
    },
    {
      segments: [
        {
          text: TAGLINES[currentTaglineIndex].text,
          color: TAGLINES[currentTaglineIndex].color,
        },
      ],
      rightAlign: true,
      onClick: handleTaglineClick,
    },
  ];

  return (
    <div className="min-h-[300vh] bg-black">
      <div className="sticky top-0 min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col gap-1 md:gap-2">
          <SplitFlapDisplay
            content={content}
            cols={isMobile ? 12 : 24}
            rows={isMobile ? 10 : 6}
            onAnimationComplete={() => setAnimationComplete(true)}
            taglineContentIndex={TAGLINE_CONTENT_INDEX}
            showArrow={animationComplete}
            isMobile={isMobile}
          />
        </div>
      </div>

      {animationComplete && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-3 items-center">
              <div className="animate-bounce">↑</div>
              <div className="animate-bounce [animation-delay:0.2s]">↓</div>
            </div>
            <div className="text-sm">Use arrow keys to explore</div>
          </div>
        </div>
      )}
    </div>
  );
}
