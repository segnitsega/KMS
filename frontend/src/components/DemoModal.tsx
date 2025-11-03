import React, { useState } from 'react';
import { X, Brain, Search, FileText, BookOpen, Users, UserCheck, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to K-Hub",
      description: "Your comprehensive Knowledge Management System designed for modern teams. Centralize knowledge, streamline onboarding, and foster collaboration.",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "Smart Search",
      description: "Find anything instantly with intelligent search that understands context and intent. Powered by advanced algorithms for precise results.",
      icon: Search,
      color: "text-green-600"
    },
    {
      title: "Document Management",
      description: "Upload, organize, tag, and share documents with advanced version control. Support for PDF, DOCX, images, and more with secure cloud storage.",
      icon: FileText,
      color: "text-purple-600"
    },
    {
      title: "Knowledge Base & Wiki",
      description: "Create comprehensive wikis, guides, and FAQs for your team. Rich text editing, categorization, and easy navigation.",
      icon: BookOpen,
      color: "text-orange-600"
    },
    {
      title: "Collaboration",
      description: "Share insights, comment, and discuss with your team in real-time. Integrated discussion forums and notification system.",
      icon: Users,
      color: "text-cyan-600"
    },
    {
      title: "Training & Onboarding",
      description: "Assign learning modules and monitor progress with comprehensive tracking. Reduce onboarding time by 50% with structured content.",
      icon: UserCheck,
      color: "text-red-600"
    },
    {
      title: "Task Management",
      description: "Assign, track, and manage tasks with expert collaboration. Submit solutions and get feedback in a streamlined workflow.",
      icon: TrendingUp,
      color: "text-pink-600"
    },
    {
      title: "Insights & Analytics",
      description: "Track engagement, usage metrics, and content performance. Make data-driven decisions with comprehensive dashboards.",
      icon: TrendingUp,
      color: "text-indigo-600"
    },
    {
      title: "Security & Access Control",
      description: "Enterprise-grade security with role-based access control. Full encryption, audit logs, and compliance features.",
      icon: Brain,
      color: "text-red-500"
    },
    {
      title: "Integration Ready",
      description: "Seamlessly integrate with Slack, Teams, Google Drive, Dropbox, and more. API-first design for custom integrations.",
      icon: Users,
      color: "text-teal-600"
    },
    {
      title: "24/7 Global Support",
      description: "Round-the-clock availability with expert support. Multi-language support and dedicated account management.",
      icon: Users,
      color: "text-yellow-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!isOpen) return null;

  const IconComponent = slides[currentSlide].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-800 to-cyan-600 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full max-w-none mx-0 max-h-none overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">K-Hub Demo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center p-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <IconComponent className={`w-12 h-12 ${slides[currentSlide].color}`} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {slides[currentSlide].title}
            </h3>
            <p className="text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              {slides[currentSlide].description}
            </p>

            <div className="flex justify-center items-center space-x-8 mt-12">
              <button
                onClick={prevSlide}
                className="flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 transition-all duration-200 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-cyan-400 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center space-x-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 px-6 py-3 transition-all duration-200 font-medium"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-12 py-6 border-t">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-gray-600 font-medium">
                Slide {currentSlide + 1} of {slides.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Close Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
