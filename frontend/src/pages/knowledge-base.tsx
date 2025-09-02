import { useState } from "react";
import Header from "@/components/reusable-header";
import PostCard from "@/components/PostCard";
import FeaturedArticles from "@/components/featured-articles";
import KnowledgebaseModal from "@/components/KnowledgebaseModal";
import CreateArticleModal from "@/components/create-article-modal";
import api from "@/utility/api";
import { useQuery } from "@tanstack/react-query";
import loadingSpinner from "@/assets/loading-spinner.svg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { formatDateDDMMYY } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

const getArticlesData = async () => {
  const response = await api.get(`/articles?page=1&limit=10`);
  return response.data.articles;
};

const KnowledgeBase = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: getArticlesData,
    queryKey: ["articles"],
  });

  const { userData } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.highlightId && data) {
      const article = data.find(
        (a: any) => a.id === location.state.highlightId
      );
      if (article) {
        setSelectedPost(article);
      }
    }
  }, [location.state, data]);

  return (
    <div>
      <Header
        title="Knowledge Base"
        subtitle="Collaborative wiki and knowledge articles"
        buttonText="New Article"
        onButtonClick={openModal}
      />

      {isLoading && (
        <div className="flex bg-white justify-center mt-10">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}

      {isError && (
        <div className="flex h-screen bg-white text-red-500 justify-center items-center">
          Error getting articles, please refresh the page!
        </div>
      )}

      {data && (
        <>
          <div className="flex flex-col gap-4 mt-6">
            {/* Featured Articles */}
            <FeaturedArticles
              articles={data.slice(0, 3).map((article: any) => ({
                title: article.title,
                author: article.author,
                views: article.views || 0,
              }))}
            />
          </div>

          {/* Articles List */}
          <div className="flex flex-col gap-4 mt-6">
            {data.slice(0, visibleCount).map((post: any) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                category={post.category}
                author={post.author}
                updatedAt={formatDateDDMMYY(post.updatedAt)}
                views={post.views || 0}
                onView={() => setSelectedPost(post)}
                onEdit={() => {
                  if (
                    post.author ===
                    userData?.firstName + " " + userData?.lastName
                  ) {
                    setSelectedPost(post);
                    setIsModalOpen(true);
                  } else {
                    toast.error(
                      "❌ You are not authorized to edit this article.",
                      { icon: () => null }
                    );
                  }
                }}
              />
            ))}
          </div>

          {/* Show More / Show Less Buttons */}
          <div className="flex justify-center mt-6">
            {visibleCount < data.length ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Show More Articles
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(3)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <CreateArticleModal onClose={closeModal} article={selectedPost} />
      )}

      {/* View Article Modal */}
      {selectedPost && (
        <KnowledgebaseModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onEdit={() => {
            setIsModalOpen(true);
            setSelectedPost(selectedPost);
          }}
        />
      )}
    </div>
  );
};

export default KnowledgeBase;
