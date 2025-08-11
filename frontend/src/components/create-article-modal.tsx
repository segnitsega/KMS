import React, { useState, useRef } from "react";

interface CreateArticleModalProps {
  onClose: () => void;
  onCreate?: (article: {
    title: string;
    category: string;
    content: string;
    tags: string[];
  }) => void;
}

const categories = ["General", "Engineering", "HR", "Marketing", "Finance", "Legal"];

const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCreate = () => {
    if (title && content) {
      const tagsArr = tags.split(",").map(t => t.trim()).filter(Boolean);
      onCreate?.({ title, category, content, tags: tagsArr });
      setTitle("");
      setCategory(categories[0]);
      setContent("");
      setTags("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-8xl max-h-[100vh] relative border border-blue-200 transform scale-95 animate-scaleIn flex flex-col">
        <button
          className="absolute top-5 right-5 text-black-400 hover:text-gray-700 transition-colors text-2xl font-bold z-20"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <div className="flex items-center gap-3 px-8 py-8 bg-blue-600 text-white rounded-t-3xl shadow-md z-10">
          <h2 className="text-3xl font-bold tracking-wide">Create New Article</h2>
        </div>
        <div className="p-8 flex-1 flex flex-col gap-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Article Title</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter a descriptive title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              ref={textareaRef}
              className="w-full border border-gray-300 rounded-lg p-4 min-h-[180px] text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your article content here..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tags</label>
            <input
              className="w-full border border-gray-200 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter tags separated by commas (e.g., policy, guidelines, training)..."
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4 mt-2">
            <button
              className="px-6 py-3 rounded-lg text-gray-600 bg-gray-100 font-semibold hover:bg-gray-200 transition-colors"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              style={{ backgroundColor: '#155dedff', color: '#fff', fontWeight: 'bold', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', border: 'none', outline: 'none', boxShadow: 'none' }}
              onClick={handleCreate}
              disabled={!title || !content}
              type="button"
            >
              Create Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleModal;
