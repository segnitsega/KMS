import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const projectDescription =
  "Our Knowledge Management System (KMS) is a comprehensive platform designed to streamline document management, foster collaboration, and enhance knowledge sharing within organizations. It provides tools for uploading and organizing documents, engaging in discussions, and leveraging AI assistance for efficient knowledge discovery. The system includes features for document versioning, permission management, expert networking, and intelligent search capabilities to help teams work more efficiently and make informed decisions.";

const helpTopics = [
  {
    category: "Getting Started",
    articles: [
      {
        title: "How to upload documents",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Learn the step-by-step process to upload various document types to
              our system, ensuring proper formatting and metadata inclusion.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Navigate to the <strong>Documents</strong> section from the
                  main menu
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Click the <strong>'Upload'</strong> button in the top right
                  corner
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Select your file(s) from your computer or drag and drop them
                  into the upload area
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Add relevant tags, categories, and descriptions to improve
                  searchability
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Set appropriate permissions for who can view, edit, or
                  download the document
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Click <strong>'Upload'</strong> to complete the process
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm italic mt-3">
              Supported formats include PDF, DOCX, XLSX, PPTX, TXT, and various
              image formats.
            </p>
          </div>
        ),
      },
      {
        title: "Setting up your profile",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Customize your user profile with personal information,
              preferences, and notification settings to personalize your
              experience.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Click on your profile picture or name in the top navigation
                  bar
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Select <strong>'Profile Settings'</strong> from the dropdown
                  menu
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Update your personal information including name, job title,
                  department, and contact details
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Upload a profile picture to make it easier for colleagues to
                  recognize you
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Configure your notification preferences for email alerts,
                  in-app notifications, and discussion updates
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Set your language preferences and timezone settings
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Add your areas of expertise to help others find you in the
                  expert directory
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Navigating the knowledge base",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Explore the intuitive interface of our knowledge base, including
              search functionality, categorization, and quick access features.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use the search bar at the top of any page to quickly find
                  documents, discussions, or users
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Browse categories on the left sidebar to explore content by
                  topic
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use filters to narrow down results by date, author, tags, or
                  document type
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Access recently viewed items from the{" "}
                  <strong>'Recent'</strong> tab
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Bookmark important documents and discussions for quick access
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use the breadcrumb navigation to understand your current
                  location within the system
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Access the dashboard for an overview of recent activity and
                  personalized recommendations
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Joining discussions",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Discover how to participate in community discussions, post
              questions, and contribute to knowledge sharing.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Navigate to the <strong>Discussions</strong> section from the
                  main menu
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Browse existing discussions or use the search to find relevant
                  topics
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Click on a discussion to read the full thread and responses
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Reply to existing discussions by clicking the{" "}
                  <strong>'Reply'</strong> button
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Start new discussions by clicking{" "}
                  <strong>'New Discussion'</strong> and selecting an appropriate
                  category
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use @mentions to notify specific users about your posts
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Follow discussions to receive notifications about new replies
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use the <strong>'Like'</strong> feature to show appreciation
                  for helpful contributions
                </span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    category: "Document Management",
    articles: [
      {
        title: "Version control basics",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Understand how our system handles document versioning, allowing
              you to track changes and revert to previous versions when needed.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Every time a document is edited and saved, a new version is
                  automatically created
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  View version history by clicking on the{" "}
                  <strong>'Versions'</strong> tab in the document viewer
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Compare different versions side-by-side to see what changes
                  were made
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Restore previous versions by clicking{" "}
                  <strong>'Restore'</strong> next to the desired version
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Add comments to versions to explain what changes were made
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Set version labels (e.g., 'Draft', 'Final', 'Approved') for
                  better organization
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Control who can create new versions through permission
                  settings
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Organizing with tags",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Utilize tagging systems to categorize and organize documents for
              easy retrieval and improved searchability.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Add tags when uploading documents or edit them later in the
                  document properties
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use hierarchical tags with parent/child relationships for
                  better organization
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Create tag synonyms to improve search results (e.g., 'KMS' and
                  'Knowledge Management System')
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use tag clouds to visualize popular topics and trends
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Filter documents by multiple tags using the advanced search
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Set up automatic tagging rules based on document content or
                  metadata
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Create tag groups to organize related tags together
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Monitor tag usage analytics to understand content trends
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Sharing documents",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Learn about sharing permissions, collaboration features, and how
              to distribute documents securely within your organization.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Generate shareable links with customizable expiration dates
                  and access levels
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Share documents via email with personalized messages
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Create collaborative workspaces for team document management
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Set up document approval workflows for review processes
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use real-time collaboration features for simultaneous editing
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Track document access and downloads through detailed analytics
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Integrate with external tools for seamless document sharing
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Set up automated notifications for document updates and shares
                </span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    category: "Collaboration",
    articles: [
      {
        title: "Starting discussions",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Initiate and moderate discussions on various topics, fostering
              knowledge exchange and problem-solving within the community.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Navigate to the <strong>Discussions</strong> section and click{" "}
                  <strong>'New Discussion'</strong>
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Choose an appropriate category for your discussion topic
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Write a clear, descriptive title that summarizes the main
                  question or topic
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Provide detailed context and background information in the
                  discussion body
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Add relevant tags to improve discoverability
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Set the discussion visibility (public, restricted, or private)
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use formatting tools to make your post more readable
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Pin important discussions for better visibility
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Moderate discussions by editing, moving, or closing threads as
                  needed
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Finding experts",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Use our expert directory to locate subject matter experts, connect
              with them, and leverage their knowledge for your projects.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Access the <strong>Expert Directory</strong> from the main
                  navigation menu
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Search for experts by name, department, or area of expertise
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Browse experts by category or use advanced filters
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  View expert profiles to see their credentials, experience, and
                  past contributions
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Send direct messages to experts for specific questions
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Follow experts to stay updated on their activities and
                  contributions
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Rate and review expert responses to help the community
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Request expert consultations for complex projects
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Join expert networks and communities of practice
                </span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Using the AI assistant",
        description: (
          <div className="space-y-3">
            <p className="text-slate-700 font-medium">
              Harness the power of our AI assistant for intelligent search,
              content recommendations, and automated knowledge summarization.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Access the AI assistant from the chat icon in the bottom right
                  corner
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Ask natural language questions about documents, discussions,
                  or system features
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use the AI for content summarization of long documents
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Get recommendations for related documents and discussions
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Request AI-generated insights from data and analytics
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use the AI for proofreading and content improvement
                  suggestions
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Ask for explanations of complex topics or technical terms
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Get personalized learning recommendations based on your
                  activity
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-sky-600 font-bold mt-0.5">•</span>
                <span className="text-slate-600">
                  Use voice commands for hands-free interaction
                </span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
];

const HelpSupportModule: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    description: React.ReactNode;
  } | null>(null);
  const guidanceRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedArticle && guidanceRef.current) {
      guidanceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedArticle]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {helpTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm border-blue-300 shadow-lg rounded-md"
          >
            <div className="p-4 border-b border-blue-100">
              <h4 className="text-slate-800 font-semibold">{topic.category}</h4>
              {/* Removed description as per user request */}
            </div>
            <div className="p-4 space-y-2">
              {topic.articles.map((article, articleIndex) => (
                <Button
                  key={articleIndex}
                  variant="ghost"
                  className={`w-full justify-start text-left text-slate-600 hover:text-blue-600 hover:bg-blue-50 ${
                    selectedArticle?.title === article.title
                      ? "bg-blue-100 backdrop-blur-sm ring-2 ring-blue-300"
                      : ""
                  }`}
                  size="sm"
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.title}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white/70 backdrop-blur-sm border-blue-300 shadow-lg rounded-md">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          About the Project
        </h3>
        <p className="text-slate-700">{projectDescription}</p>
      </div>
      {selectedArticle && (
        <div
          ref={guidanceRef}
          className="p-6 bg-white/70 backdrop-blur-sm border-blue-1000 shadow-lg rounded-md"
        >
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            {selectedArticle.title}
          </h3>
          <p className="text-slate-700">{selectedArticle.description}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSelectedArticle(null)}
          >
            Close Guidance
          </Button>
        </div>
      )}
    </div>
  );
};

export default HelpSupportModule;
