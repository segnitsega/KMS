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
  const { data, isLoading, isError } = useQuery({
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
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-6">
      <Header
        title="Knowledge Base"
        subtitle="Collaborative wiki and knowledge articles"
        buttonText="New Article"
        onButtonClick={openModal}
      />

      {isLoading && (
        <div className="flex justify-center py-10 sm:py-16">
          <img src={loadingSpinner} width={50} alt="loading" />
        </div>
      )}

      {isError && (
        <div className="flex min-h-[12rem] items-center justify-center rounded-md bg-white px-4 py-8 text-center text-sm text-red-500 sm:text-base">
          Error getting articles. Please refresh the page.
        </div>
      )}

      {data && (
        <>
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Featured Articles */}
            <FeaturedArticles
              articles={data.slice(0, 3).map((article: any) => ({
                title: article.title,
                author: article.author,
                // views: article.views || 0,
              }))}
            />
          </div>

          {/* Articles List */}
          <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:gap-4">
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
                      { icon: null }
                    );
                  }
                }}
              />
            ))}
          </div>

          {/* Show More / Show Less Buttons */}
          <div className="mt-4 flex justify-center px-2 sm:mt-6 sm:px-0">
            {visibleCount < data.length ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 sm:w-auto"
              >
                Show More Articles
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(3)}
                className="w-full rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700 sm:w-auto"
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
