import React from "react";
import { HiUser,HiCalendar,HiEye,HiThumbUp,HiBookmark,HiShare,HiPencil,HiX} from "react-icons/hi";

type Post = {
  title: string;
  description: string;
  tags: string[];
  author: string;
  updatedDate: string;
  views: number;
};

interface KnowledgebaseModalProps {
  post: Post;
  onClose: () => void;
}

const KnowledgebaseModal: React.FC<KnowledgebaseModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full  max-w-[1200px] max-h-[200vh] relative flex flex-col md:flex-row p-0">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          <HiX />
        </button>
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-4 bg-green-50 rounded-t-lg px-2 py-4 -mx-8 -mt-8">
            {post.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-base mb-4">
            <span className="flex items-center gap-1">
              <HiUser className="text-lg" /> By {post.author}
            </span>
            <span className="flex items-center gap-1">
              <HiCalendar className="text-lg" /> Updated {post.updatedDate}
            </span>
            <span className="flex items-center gap-1">
              <HiEye className="text-lg" /> {post.views} views
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-base font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="bg-gray-50 p-8 rounded-lg text-gray-700 text-lg min-h-[100px]">
            {post.description}
          </div>
        </div>
        <div className="w-full md:w-80 bg-gray-50 rounded-r-lg flex flex-col items-center py-8 px-4 border-l border-gray-200">
          <h3 className="text-xl font-bold mb-6">Article Actions</h3>
          <div className="flex flex-col gap-4 w-full">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500 text-white font-semibold text-lg hover:bg-green-600 transition">
              <HiThumbUp className="text-2xl" /> Like Article
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition">
              <HiBookmark className="text-2xl" /> Bookmark
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-purple-500 text-white font-semibold text-lg hover:bg-purple-600 transition">
              <HiShare className="text-2xl" /> Share Article
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-500 text-white font-semibold text-lg hover:bg-red-600 transition">
              <HiPencil className="text-2xl" /> Edit Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgebaseModal;
