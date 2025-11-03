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
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[900px] max-h-[600px] relative flex flex-col md:flex-row p-0">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          <HiX />
        </button>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 bg-green-50 rounded-t-lg px-2 py-4 -mx-8 -mt-8">
            {post.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-base mb-4">
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
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-base font-semibold">
              {post.category}
            </span>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-8 rounded-lg text-gray-700 text-lg min-h-[100px]">
            {post.description}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-50 bg-gray-50 rounded-r-lg flex flex-col items-center py-8 px-4 border-l border-gray-200">
          <h3 className="text-xl font-bold mb-6">Article Actions</h3>
          <div className="flex flex-col gap-4 w-full">

          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500 text-white font-semibold text-lg hover:bg-green-600 transition"
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
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition"
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
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-purple-500 text-white font-semibold text-lg hover:bg-purple-600 transition"
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-500 text-white font-semibold text-lg hover:bg-orange-600 transition"
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
