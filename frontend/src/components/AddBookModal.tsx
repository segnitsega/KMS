import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/utility/api";

interface AddBookModalProps {
  onClose: () => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate: uploadBook, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post(`/library/upload-book`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast("✅ Book uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onClose();
      resetForm();
    },
    onError: (error) => {
      console.error(error);
      toast("❌ Failed to upload book");
    },
  });

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setDescription("");
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !title || !author || !genre) {
      toast("⚠️ Please fill all required fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("book", file);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("description", description);

    uploadBook(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl px-6 py-4 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">Upload New Book</h2>

        {/* Title + Author */}
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Title *</label>
            <input
              type="text"
              placeholder="Enter book title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">Author *</label>
            <input
              type="text"
              placeholder="Enter author name..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Genre */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">Genre *</label>
          <input
            type="text"
            placeholder="Enter genre..."
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* File Upload */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">File Upload *</label>
          <div
            className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-gray-600 cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
            <FiUpload className="text-2xl mb-2 text-blue-600" />
            <p className="text-sm">
              {file ? file.name : "Click to select or drag & drop a file"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supported: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isPending}
            className={`px-4 py-2 rounded-md text-white ${
              isPending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Uploading..." : "Upload Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
