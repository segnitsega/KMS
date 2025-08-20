import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiX, FiCheck, FiXCircle } from "react-icons/fi";

interface Discussion {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  replies: number;
  updatedAt: string;
}

interface ManageDiscussionsProps {
  onClose?: () => void;
  discussions?: Discussion[];
  onUpdate?: (updatedDiscussion: Discussion) => void;
  onDelete?: (discussionId: string) => void;
}

const ManageDiscussions: React.FC<ManageDiscussionsProps> = ({ 
  onClose, 
  discussions: initialDiscussions = [], 
  onUpdate, 
  onDelete 
}) => {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Discussion>>({});

  const sampleDiscussions: Discussion[] = [
    {
      id: "1",
      title: "Best practices for code reviews",
      description: "Let's discuss the best practices...",
      author: "Sarah Wilson",
      category: "Development",
      replies: 12,
      updatedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "New project management tools",
      description: "Evaluating different project management tools...",
      author: "Michael Chen",
      category: "Management",
      replies: 8,
      updatedAt: "2024-01-14"
    },
    {
      id: "3",
      title: "Customer feedback integration",
      description: "How should we integrate customer feedback...",
      author: "Emma Davis",
      category: "Product",
      replies: 15,
      updatedAt: "2024-01-13"
    },
  ];

  const displayDiscussions = discussions.length > 0 ? discussions : sampleDiscussions;

  const handleEdit = (discussion: Discussion) => {
    setEditingId(discussion.id);
    setEditForm({
      title: discussion.title,
      description: discussion.description,
      category: discussion.category
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editForm.title && editForm.description) {
      const updatedDiscussions = displayDiscussions.map(discussion =>
        discussion.id === editingId
          ? { ...discussion, ...editForm, updatedAt: new Date().toISOString().split('T')[0] }
          : discussion
      );
      
      setDiscussions(updatedDiscussions);
      
      const updatedDiscussion = updatedDiscussions.find(d => d.id === editingId);
      if (updatedDiscussion && onUpdate) {
        onUpdate(updatedDiscussion);
      }
      
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (discussionId: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this discussion?");
    if (shouldDelete) {
      const updatedDiscussions = displayDiscussions.filter(discussion => discussion.id !== discussionId);
      setDiscussions(updatedDiscussions);
      
      if (onDelete) {
        onDelete(discussionId);
      }
    }
  };

  const handleInputChange = (field: keyof Discussion, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          <FiX />
        </button>
      )}
      
      <h2 className="text-base font-semibold mb-1">Manage Discussions</h2>
      <p className="text-xs text-gray-500 mb-3">Edit or delete discussions</p>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {displayDiscussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-gray-50 rounded-lg p-3 shadow-sm"
          >
            {editingId === discussion.id ? (
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={2}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  >
                    <FiCheck className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                  >
                    <FiXCircle className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{discussion.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{discussion.replies} replies</span>
                    <span className="text-xs text-gray-500">{discussion.category}</span>
                    <span className="text-xs text-gray-400">{discussion.updatedAt}</span>
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => handleEdit(discussion)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Edit discussion"
                  >
                    <FiEdit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(discussion.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete discussion"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {displayDiscussions.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">No discussions found</p>
        </div>
      )}
    </div>
  );
};

export default ManageDiscussions;
