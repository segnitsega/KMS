import React from 'react';
import { PiBookOpen } from "react-icons/pi";
import { FiUsers, FiClock, FiEye, FiTag } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";


interface PostCardProps {
  title: string;
  description: string;
  tags: string[];
  author: string;
  updatedDate: string;
  views: number;
  onView?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  description,
  tags,
  author,
  updatedDate,
  views,
  onView,
}) => {
  return (
    <div className=" border rounded-lg p-6 shadow-sm hover:shadow-md bg-white flex justify-between gap-4">
      <div className="flex gap-4 flex-grow">
        <div className="icon flex-shrink-0 w-12 h-12 bg-green-100 rounded-md flex items-center justify-center text-green-600">
          <PiBookOpen className="h-6 w-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-1 line-clamp-2">{description}</p>
          <div className="tags flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-xs text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1"
              >
              < FiTag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>
          <div className="meta flex items-center gap-4 text-gray-500 text-xs mt-3">
            <div className="author flex items-center gap-1">
              <FiUsers className="h-4 w-4" />
              <span>{author}</span>
            </div>
            <div className="updated flex items-center gap-1">
              <FiClock className="h-4 w-4" />
              <span>Updated {updatedDate}</span>
            </div>
            <div className="views flex items-center gap-1">
              <FiEye className="h-4 w-4" />
              <span>{views} views</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 text-gray-500">
        <FiEye className="h-4 w-4 cursor-pointer hover:text-blue-500" onClick={onView} />
        <FaRegEdit className="h-4 w-4 cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  );
};

export default PostCard;
