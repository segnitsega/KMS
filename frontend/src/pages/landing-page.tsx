import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Brain, Search,Settings,Users,FileText,BookOpen,TrendingUp,UserCheck,Play,ArrowRight} from 'lucide-react';
import '../pages/LoginPage'
import AnimatedUnlockText from '../components/AnimatedUnlockText';
import AnimatedButtons from '../components/AnimatedButtons';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-800 to-cyan-600" id="home">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-3 ">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold text-sm">KMS</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-cyan-300 transition-colors font-medium">Home</a>
          <a href="#features" className="text-white hover:text-cyan-300 transition-colors font-medium">Features</a>
          <a href="#About" className="text-white hover:text-cyan-300 transition-colors font-medium">About</a>
          <a href="#Contact" className="text-white hover:text-cyan-300 transition-colors font-medium">Contact</a>
          {<Link to="/login" className="bg-cyan-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors">
            Join us</Link>}
        </div>
      </nav>
      {/* Hero Section */}
      <div className="px-8 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <AnimatedUnlockText />
              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                Centralize your organizational knowledge. 
                Streamline onboarding, and foster collaboration 
                through intelligent, secure, and searchable content.
              </p>
            </div>
            <AnimatedButtons />
          </div>
          
          <div className="relative">
            {/* Brain Illustration */}
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-30"></div>
              <Brain className="absolute inset-0 m-auto w-48 h-48 text-cyan-300" />
              
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center animate-bounce">
                <Search className="w-8 h-8 text-blue-900" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-cyan-300 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
                <Users className="w-6 h-6 text-blue-900" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-white py-20" id="features">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smart Search */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Find anything instantly with intelligent search that understands context and intent.
              </p>
            </div>

            {/* Document Management */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Document Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload, organize, tag, and share documents with advanced version control.
              </p>
            </div>

            {/* Knowledge Base & Wiki */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Knowledge Base & Wiki</h3>
              <p className="text-gray-600 leading-relaxed">
                Create comprehensive wikis, guides, and FAQs for your team.
              </p>
            </div>

            {/* Collaboration */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Share insights, comment, and discuss with your team in real-time.
              </p>
            </div>

            {/* Training & Onboarding */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Training & Onboarding</h3>
              <p className="text-gray-600 leading-relaxed">
                Assign learning modules and monitor progress with comprehensive tracking.
              </p>
            </div>

            {/* Insights & Analytics */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Insights & Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track engagement, usage metrics, and content performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Teams Rely Section */}
      <div className="bg-gray-900 py-20" id="About">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Why Teams Rely on Our KMS</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-3xl font-bold text-cyan-400">Easy to Use Interface</div>
              <p className="text-gray-300">Intuitive design that requires minimal training</p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-cyan-400">Cloud-Based Access & Full Encryption</div>
              <p className="text-gray-300">Secure access from anywhere with enterprise-grade security</p>
            </div>
            <div className="space-y-4">cd
              <div className="text-3xl font-bold text-cyan-400">24/7 Global Access & Support</div>
              <p className="text-gray-300">Round-the-clock availability and expert support</p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-cyan-400">Integrates with Slack, Teams, Google Drive, Dropbox & Customizable to Your Team</div>
              <p className="text-gray-300">Seamless integration with your existing workflow</p>
            </div>
          </div>
          
          <div className="mt-16 text-center" id="Contact">
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              "The platform cut our onboarding time in half. It's been our team's go-to help for all internal knowledge 
              management."
            </p>
            <p className="text-cyan-400 font-semibold mt-4">- HR Manager</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400">
              © 2025 INSA onboarding | Privacy Policy | Terms | Contact
            </div>
            <div className="flex space-x-6">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage

