import React, { useState } from 'react';

interface NewDiscussionModalProps {
  onClose: () => void;
}

const NewDiscussionModal: React.FC<NewDiscussionModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleCreate = () => {
    // Here you would handle form submission, e.g., API call to create discussion
    console.log('Creating discussion:', { title, content, tags });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-700/85 backdrop-blur-700 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Start New Discussion</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter discussion title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            placeholder="What would you like to discuss?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            rows={4}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1" htmlFor="tags">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            placeholder="Enter tags separated by commas..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Discussion
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDiscussionModal;
