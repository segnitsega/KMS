import React, { useState } from "react";
import api from "@/utility/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateArticleModalProps {
  onClose: () => void;
}

const categories = [
  "Financial and Accounting",
  "Technical and Project Docs",
  "Reports and Analytics",
  "Policies and Procedures",
  "HR",
];

const CreateArticleModal: React.FC<CreateArticleModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const queryClient = useQueryClient();

  const { mutate: createArticle, isPending } = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
    }) => {
      const res = await api.post(`/articles/post`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        <span className="flex items-center gap-2">
          <span className="text-green-500 text-xl">✅</span>
          Article created successfully!
        </span>,
        { icon: null }
      );
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      onClose();
    },
    onError: (error: any) => {
      console.error(error.response?.data || error.message);
      toast.error(
        <span className="flex items-center gap-2">
          <span className="text-red-500 text-xl">❌</span>
          {error.response?.data?.message || "Failed to create article"}
        </span>,
        { icon: null }
      );
    },
  });

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) {
      toast.error(
        <span className="flex items-center gap-2">
          <span className="text-yellow-500 text-xl">⚠️</span>
          Title and Content are required
        </span>,
        { icon: null }
      );
      return;
    }
    createArticle({ title, description: content, category });
  };

  return (
    <div className="fixed inset-0 bg-gray-700/85 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-md px-6 py-8 w-full max-w-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Create New Article</h2>

        <div className="flex gap-6 mb-4">
          {/* Title */}
          <div className="flex-1">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter article title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Category */}
          <div className="flex-1">
            <label className="block font-semibold mb-1">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            placeholder="Write your article content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            rows={5}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className={`px-4 py-2 rounded-md text-white ${
              isPending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isPending}
          >
            {isPending ? "Creating Article..." : "Create Article"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleModal;
