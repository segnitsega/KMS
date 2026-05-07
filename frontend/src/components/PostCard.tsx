import React from "react";
import { PiBookOpen } from "react-icons/pi";
import { FiUsers, FiClock, FiTag } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

interface PostCardProps {
  title: string;
  description: string;
  category: string;
  author: string;
  updatedAt: string;
  views: number;
  onView?: () => void;
  onEdit?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  category,
  author,
  updatedAt,
  onView,
  onEdit,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm hover:shadow-md sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:p-6">
      <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
        <div className="icon flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-100 text-green-600 sm:h-12 sm:w-12">
          <PiBookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500 sm:text-base">
            {description}
          </p>

          <div className="tags mt-2 flex flex-wrap gap-2">
            <span className="flex max-w-full items-center gap-1 truncate rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              <FiTag className="h-3 w-3 shrink-0" /> {category}
            </span>
          </div>

          <div className="meta mt-3 flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="author flex min-w-0 items-center gap-1">
              <FiUsers className="h-4 w-4 shrink-0" />
              <span className="truncate">{author}</span>
            </div>
            <div className="updated flex items-center gap-1">
              <FiClock className="h-4 w-4 shrink-0" />
              <span>Updated {updatedAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-4 border-t border-gray-100 pt-3 text-gray-500 sm:border-t-0 sm:pt-0">
        <FiEye
          className="h-5 w-5 cursor-pointer hover:text-blue-500 sm:h-4 sm:w-4"
          onClick={onView}
        />
        <FaRegEdit
          className="h-5 w-5 cursor-pointer hover:text-blue-500 sm:h-4 sm:w-4"
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

export default PostCard;
