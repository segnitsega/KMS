import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import './AnimatedUnlockText.css';
import DemoModal from './DemoModal';

const AnimatedButtons = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

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

    if (buttonsRef.current) {
      observer.observe(buttonsRef.current);
    }

    return () => {
      if (buttonsRef.current) {
        observer.unobserve(buttonsRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={buttonsRef}
        className={`flex flex-col sm:flex-row gap-4 ${isVisible ? 'buttons-animate' : ''}`}
      >
        <Link
          to="/kms"
          className="bg-cyan-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center group"
        >
          Get started
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <button
          onClick={() => setIsDemoModalOpen(true)}
          className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center"
        >
          <Play className="mr-2 w-5 h-5" />
          Watch Demo
        </button>
      </div>
      {isDemoModalOpen && (
        <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      )}
    </>
  );
};

export default AnimatedButtons;
