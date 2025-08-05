import React, { useEffect, useRef, useState } from 'react';
import './AnimatedUnlockText.css';

const AnimatedUnlockText = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const renderTextWithDelay = (text: string, className: string, delay: number) => {
    return (
      <span className={`line ${className} ${isVisible ? 'animate' : ''}`}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${delay + index * 0.1}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div ref={textRef} className="animated-text-container">
      <h1 className="animated-text">
        {renderTextWithDelay('Unlock', 'line-1', 0.2)}
        <br />
        {renderTextWithDelay('Knowledge.', 'line-2', 0.4)}
        <br />
        {renderTextWithDelay('Empower Teams.', 'highlight-text', 0.6)}
      </h1>
    </div>
  );
};

export default AnimatedUnlockText;
