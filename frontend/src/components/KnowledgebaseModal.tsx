import React, { useState } from "react";
import {
  HiUser,
  HiCalendar,
  HiEye,
  HiThumbUp,
  HiBookmark,
  HiShare,
  HiX,
} from "react-icons/hi";
import api from "@/utility/api";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { formatDateDDMMYY } from "@/lib/utils";

type Post = {
  id?: string;
  title: string;
  description: string;
  category: string;
  author: string;
  updatedAt: string;
  views: number;
  likes?: number;
};

interface KnowledgebaseModalProps {
  post: Post;
  onClose: () => void;
  onEdit?: () => void;
}

const KnowledgebaseModal: React.FC<KnowledgebaseModalProps> = ({
  post,
  onClose,
  onEdit,
}) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const { userData } = useAuthStore();
  const currentUserName = userData ? `${userData.firstName} ${userData.lastName}` : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:p-4">
      <div className="relative flex max-h-[95vh] w-full max-w-[900px] flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 z-10 text-2xl text-gray-400 hover:text-gray-700 sm:top-4 sm:right-4"
          onClick={onClose}
        >
          <HiX />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <h2 className="-mx-4 -mt-4 mb-4 rounded-t-lg bg-green-50 px-3 py-3 text-xl font-bold sm:-mx-6 sm:-mt-6 sm:px-4 sm:py-4 sm:text-2xl md:-mx-8 md:-mt-8 md:text-3xl">
            {post.title}
          </h2>
          <div className="mb-4 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:text-base">
            <span className="flex items-center gap-1">
              <HiUser className="text-lg" /> By {post.author}
            </span>
            <span className="flex items-center gap-1">
              <HiCalendar className="text-lg" /> Updated {formatDateDDMMYY(post.updatedAt)}
            </span>
            <span className="flex items-center gap-1">
              <HiEye className="text-lg" /> {post.views} views
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2 sm:mb-6">
            <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-800 sm:px-4 sm:py-2 sm:text-base">
              {post.category}
            </span>
          </div>

          {/* Description */}
          <div className="min-h-[100px] rounded-lg bg-gray-50 p-4 text-base text-gray-700 sm:p-6 sm:text-lg md:p-8">
            {post.description}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex w-full shrink-0 flex-col items-center border-t border-gray-200 bg-gray-50 px-4 py-6 md:w-64 md:border-l md:border-t-0 md:py-8 lg:w-72">
          <h3 className="mb-4 text-lg font-bold sm:mb-6 sm:text-xl">Article Actions</h3>
          <div className="flex w-full flex-col gap-3 sm:gap-4">

          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-2.5 text-base font-semibold text-white transition hover:bg-green-600 sm:py-3 sm:text-lg"
            onClick={async () => {
              try {
                await api.post(`/articles/${post.id}/like`);
                setLikes(likes + 1);
                toast.success(
                  <span className="flex items-center gap-2">
                    <span className="text-green-500 text-xl">✅</span>
                    Article liked!
                  </span>,
                  { icon: null }
                );
              } catch (error: any) {
                toast.error(
                  <span className="flex items-center gap-2">
                    <span className="text-red-500 text-xl">❌</span>
                    {error.response?.data?.message || "Failed to like article"}
                  </span>,
                  { icon: null }
                );
              }
            }}
          >
            <HiThumbUp className="text-2xl" /> Like Article ({likes})
          </button>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-2.5 text-base font-semibold text-white transition hover:bg-blue-600 sm:py-3 sm:text-lg"
            onClick={() => {
              try {
                // Get existing bookmarks from localStorage
                const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');

                // Check if article is already bookmarked
                const isAlreadyBookmarked = existingBookmarks.includes(post.id);

                if (isAlreadyBookmarked) {
                  toast.info(
                    <span className="flex items-center gap-2">
                      <span className="text-blue-500 text-xl">ℹ️</span>
                      Article already bookmarked!
                    </span>,
                    { icon: null }
                  );
                  return;
                }

                // Add article to bookmarks
                const updatedBookmarks = [...existingBookmarks, post.id];
                localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));

                toast.success(
                  <span className="flex items-center gap-2">
                    <span className="text-green-500 text-xl">✅</span>
                    Article bookmarked!
                  </span>,
                  { icon: null }
                );
              } catch (error: any) {
                toast.error(
                  <span className="flex items-center gap-2">
                    <span className="text-red-500 text-xl">❌</span>
                    Failed to bookmark article
                  </span>,
                  { icon: null }
                );
              }
            }}
          >
            <HiBookmark className="text-2xl" /> Bookmark
          </button>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-500 py-2.5 text-base font-semibold text-white transition hover:bg-purple-600 sm:py-3 sm:text-lg"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.description,
                  url: window.location.href,
                });
                toast.success(
                  <span className="flex items-center gap-2">
                    <span className="text-green-500 text-xl">✅</span>
                    Article shared!
                  </span>,
                  { icon: null }
                );
              } else {
                toast.error(
                  <span className="flex items-center gap-2">
                    <span className="text-red-500 text-xl">❌</span>
                    Share not supported on this browser
                  </span>,
                  { icon: null }
                );
              }
            }}
          >
            <HiShare className="text-2xl" /> Share Article
          </button>

          {/* Edit Button - Only show if user is the author */}
          {currentUserName === post.author && onEdit && (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-base font-semibold text-white transition hover:bg-orange-600 sm:py-3 sm:text-lg"
              onClick={onEdit}
            >
              <HiUser className="text-2xl" /> Edit Article
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgebaseModal;
