import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiX, FiCheck, FiXCircle } from "react-icons/fi";

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ManageArticlesProps {
  onClose?: () => void;
  articles?: Article[];
  onUpdate?: (updatedArticle: Article) => void;
  onDelete?: (articleId: string) => void;
}

const ManageArticles: React.FC<ManageArticlesProps> = ({ 
  onClose, 
  articles: initialArticles = [], 
  onUpdate, 
  onDelete 
}) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Article>>({});

  // Sample articles if none provided
  const sampleArticles: Article[] = [
    {
      id: "1",
      title: "Understanding React Hooks",
      content: "A comprehensive guide to React Hooks and their usage...",
      author: "John Doe",
      category: "Technology",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Best Practices for TypeScript",
      content: "Learn the best practices for writing clean TypeScript code...",
      author: "Jane Smith",
      category: "Programming",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-14"
    },
    {
      id: "3",
      title: "Building Scalable Applications",
      content: "Strategies for building applications that scale with your business...",
      author: "Mike Johnson",
      category: "Architecture",
      createdAt: "2024-01-13",
      updatedAt: "2024-01-13"
    },
  ];

  const displayArticles = articles.length > 0 ? articles : sampleArticles;

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setEditForm({
      title: article.title,
      content: article.content,
      category: article.category
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editForm.title && editForm.content) {
      const updatedArticles = displayArticles.map(article =>
        article.id === editingId
          ? { ...article, ...editForm, updatedAt: new Date().toISOString().split('T')[0] }
          : article
      );
      
      setArticles(updatedArticles);
      
      const updatedArticle = updatedArticles.find(a => a.id === editingId);
      if (updatedArticle && onUpdate) {
        onUpdate(updatedArticle);
      }
      
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (articleId: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this article?");
    if (shouldDelete) {
      const updatedArticles = displayArticles.filter(article => article.id !== articleId);
      setArticles(updatedArticles);
      
      if (onDelete) {
        onDelete(articleId);
      }
    }
  };

  const handleInputChange = (field: keyof Article, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-10 bg-white rounded-3xl shadow-md w-full max-w-2xl relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FiX />
        </button>
      )}
      
      <h2 className="text-lg font-semibold mb-2">Manage Articles</h2>
      <p className="text-sm text-gray-500 mb-4">Edit or delete articles</p>

      <div className="space-y-3">
        {displayArticles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-50 rounded-lg p-4 shadow-sm"
          >
            {editingId === article.id ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={editForm.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <FiCheck className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    <FiXCircle className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{article.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">By {article.author}</span>
                    <span className="text-xs text-gray-500">Category: {article.category}</span>
                    <span className="text-xs text-gray-400">Updated: {article.updatedAt}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(article)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Edit article"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete article"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {displayArticles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No articles found</p>
        </div>
      )}
    </div>
  );
};

export default ManageArticles;
