import React from "react";
import {
  FiMessageCircle,
  FiUser,
  FiClock,
  FiThumbsUp,
  FiCornerDownLeft,
  FiTag,
} from "react-icons/fi";

interface Reply {
  author: string;
  text: string;
  timestamp: string;
  message: string;
}

interface DiscussionPostProps {
  title: string;
  description: string;
  author: string;
  categories: string[];
  timestamp: string;
  replies: Reply[];
  likes: number;
}

const DiscussionPost: React.FC<DiscussionPostProps> = ({
  title,
  description,
  author,
  categories,
  timestamp,
  replies,
  likes,
}) => {
  return (
    <div className="discussion-post border rounded-lg p-4 bg-white gap-2">
      <div className="flex gap-2">
        <div className="icon w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center text-purple-600">
          <FiMessageCircle className="w-6 h-6" />
        </div>

        <div className="flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-700 mt-1">{description}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FiUser className="w-4 h-4" />
              {author}
            </span>

            <span
              className="bg-gray-100 border text-xs text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1"
            >
              <FiTag className="w-3 h-3" /> {categories}
            </span>
          </div>
          <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-gray-700 cursor-pointer">
              <FiThumbsUp className="w-4 h-4" />
              Like({likes})
            </button>
            <button className="flex items-center gap-1 hover:text-gray-700 cursor-pointer">
              <FiCornerDownLeft className="w-4 h-4" />
              Reply ({replies.length})
            </button>
          </div>
        </div>
        <div className="text-gray-400 text-xs whitespace-nowrap flex items-start">
          <FiClock className="w-4 h-4 mr-0.5 mt-0.5" />
          {timestamp}
        </div>
      </div>
      <div className="replies mt-8 space-y-4 gap-4">
        {replies.map((reply, index) => (
          <div
            key={index}
            className="reply bg-gray-100 rounded-md p-4 flex justify-between items-start gap-4"
          >
            <div>
              <p className="font-semibold text-gray-900">{reply.author}</p>
              <p className="text-gray-700">{reply.message}</p>
            </div>
            <div className="text-gray-400 text-xs whitespace-nowrap">
              {reply.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionPost;
