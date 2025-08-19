import api from "@/utility/api";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

interface NewDiscussionModalProps {
  onClose: () => void;
}
const categories = [
  "Financial & Accounting",
  "Technical & Project Docs",
  "Reports & Analytics ",
  "Policies & Procedures",
  "HR",
];

const NewDiscussionModal: React.FC<NewDiscussionModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);

  // const data = {
  //   title,
  //   description: content,
  //   category,
  // };

  const { mutate: createDiscussion, isPending } = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
    }) => {
      console.log(data);
      const res = await api.post(`/discussions/post`, data);
      return res.data;
    },
    onSuccess: () => {
      toast("✅ Discussion created successfully!");
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast("❌ Failed to create discussion");
    },
  });

  const handleCreate = async () => {
    createDiscussion({ title, description: content, category });
  };

  return (
    <div className="fixed inset-0 bg-gray-700/85 backdrop-blur-700 flex justify-center items-center z-50">
      <div className="bg-white rounded-t-md px-6 py-8 w-full max-w-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Start New Discussion</h2>
        <div className="flex  gap-6">
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
          <div className="flex-1">
            <label className="block font-semibold mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2  outline-none focus:ring-1 focus:ring-blue-500"
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
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className={`px-4 py-2 rounded-md text-white  hover:bg-blue-700 ${
              isPending ? "bg-blue-400" : "bg-blue-600"
            }`}
          >
            {isPending ? "Creating Discussion..." : "Create Discussion"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDiscussionModal;
