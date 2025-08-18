import { useState } from 'react';
import KnowledgebaseModal from '@/components/KnowledgebaseModal';
import Header from '@/components/reusable-header';
import CreateArticleModal from '@/components/create-article-modal';
import FeaturedArticles from '@/components/featured-articles';
import PostCard from '@/components/PostCard';


type Post = {
  title: string;
  description: string;
  tags: string[];
  author: string;
  updatedDate: string;
  views: number;
};

const KnowledgeBase = () => {
  const articles = [
    { title: 'Understanding React Hooks', author: 'Jane Doe', views: 120 },
    { title: 'Advanced TypeScript Tips', author: 'John Smith', views: 95 },
    { title: 'State Management with Redux', author: 'Alice Johnson', views: 80 },
  ];

  const posts: Post[] = [
    {
      title: 'Remote Work Best Practices',
      description: 'Guidelines and tips for effective remote work...',
      tags: ['remote work', 'productivity', 'collaboration'],
      author: 'Sarah Johnson',
      updatedDate: '2024-01-14',
      views: 156,
    },
    {
      title: 'Effective Team Communication',
      description: 'How to improve communication within your team...',
      tags: ['communication', 'teamwork', 'management'],
      author: 'Michael Lee',
      updatedDate: '2024-02-10',
      views: 98,
    },
    {
      title: 'Time Management Strategies',
      description: 'Techniques to manage your time better and increase productivity...',
      tags: ['time management', 'productivity', 'focus'],
      author: 'Emily Davis',
      updatedDate: '2024-03-05',
      views: 134,
    },
  ];

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleView = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className='flex flex-col gap-6'>
      <Header
        title='Knowledge Base'
        subtitle='Collaborative wiki and knowledge articles'
        buttonText='New Article'
        dropDownText='Recently Updated '
        dropDownOptions={["Recently Updated", "Most Popular", "Alphabetical"]}
        searchPlaceholder='Search document...'
        onButtonClick={() => setShowCreateModal(true)}
      />

      <FeaturedArticles articles={articles} />
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.title}
            title={post.title}
            description={post.description}
            tags={post.tags}
            author={post.author}
            updatedDate={post.updatedDate}
            views={post.views}
            onView={() => handleView(post)}
          />
        ))}
      </div>

      {/* Modal for creating new article */}
      {showCreateModal && (
        <CreateArticleModal
          onClose={() => setShowCreateModal(false)}
          onCreate={() => setShowCreateModal(false)}
        />
      )}

      {/* Modal for knowledgebase view */}
      {selectedPost && (
        <KnowledgebaseModal post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default KnowledgeBase;
