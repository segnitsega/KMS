import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface Discussion {
  title: string;
  replies: number;
}

interface ManageDiscussionsProps {
  onClose?: () => void;
}

const ManageDiscussions: React.FC<ManageDiscussionsProps> = ({ onClose }) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    { title: "Best practices for code reviews", replies: 12 },
    { title: "New project management tools evaluation", replies: 8 },
    { title: "Customer feedback integration process", replies: 15 },
  ]);

  const handleEdit = (index: number) => {
    // For now, just prompt to edit the title
    const newTitle = prompt("Edit discussion title", discussions[index].title);
    if (newTitle) {
      const updated = [...discussions];
      updated[index].title = newTitle;
      setDiscussions(updated);
    }
  };

  const handleDelete = (index: number) => {
    const updated = discussions.filter((_, i) => i !== index);
    setDiscussions(updated);
  };

  return (
    <div className="p-10 bg-white rounded-3xl shadow-md w-full max-w-lg relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FiX />
        </button>
      )}
      
      <h2 className="text-lg font-semibold mb-2">Manage Discussions</h2>
      <p className="text-sm text-gray-500 mb-4">Edit or delete discussions</p>

      <div className="space-y-2">
        {discussions.map((discussion, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 shadow-sm"
          >
            <div>
              <p className="text-sm">{discussion.title}</p>
              <p className="text-xs text-gray-400">{discussion.replies} replies</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDiscussions;
