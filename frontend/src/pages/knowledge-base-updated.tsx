import { useState } from 'react';
import KnowledgebaseModal from '@/components/KnowledgebaseModal';
import Header from '@/components/reusable-header';
import CreateArticleModal from '@/components/create-article-modal';
import FeaturedArticles from '@/components/featured-articles';
import PostCard from '@/components/PostCard';
import { useQuery } from "@tanstack/react-query";
import api from "@/utility/api";
import loadingSpinner from "@/assets/loading-spinner.svg";

type Post = {
  id: string;
  title: string;
  description: string;
  category: string[];
  author: string;
  updatedDate: string;
  views: number;
  uploadedAt: string;
};

const getArticlesData = async () => {
  const response = await api.get(`/articles`);
  return response.data.articles;
};

const KnowledgeBase = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getArticlesData,
    queryKey: ["articles"],
  });

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleView = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const featuredArticles = data?.slice(0, 3).map((article: Post) => ({
    title: article.title,
    author: article.author,
    views: article.views || 0
  })) || [];

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

      {isLoading && (
        <div className="flex bg-white justify-center mt-10">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}
      
      {isError && (
        <div className="flex h-screen bg-white text-red-500 justify-center items-center">
          Error getting articles please refresh the page !
        </div>
      )}

      {data && (
        <>
          <FeaturedArticles articles={featuredArticles} />
          <div className="flex flex-col gap-4">
            {data.map((post: Post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                tags={post.category}
                author={post.author}
                updatedDate={post.uploadedAt}
                views={post.views || 0}
                onView={() => handleView(post)}
              />
            ))}
          </div>
        </>
      )}

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
