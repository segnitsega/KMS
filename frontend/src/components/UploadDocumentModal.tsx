import api from "@/utility/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { FiUpload } from "react-icons/fi";

interface UploadDocumentModalProps {
  onClose: () => void;
}

const categories = [
  "Financial and Accounting",
  "Technical and Project Docs",
  "Reports and Analytics ",
  "Policies and Procedures",
  "HR",
];

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate: uploadDocument, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post(`/docs/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast("✅ Document uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["docs"] }); // 🔄 refetch docs
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast("❌ Failed to upload document");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !title || !description) {
      toast("⚠️ Please fill all required fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    uploadDocument(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-700/85 backdrop-blur-700 flex justify-center items-center z-50">
      <div className="bg-white rounded-t-md px-6 py-8 w-full max-w-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Upload New Document</h2>

        <div className="flex gap-6 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter document title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
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
          <label className="block font-semibold mb-1">File Upload</label>
          <div
            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-gray-600 cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
            <FiUpload className="text-4xl mb-2 text-blue-600" />
            <p>{file ? file.name : "Click to select or drag & drop a file"}</p>
            <p className="text-xs text-gray-400 mt-1">
              Supported: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onClick={handleUpload}
            disabled={isPending}
            className={`px-4 py-2 rounded-md text-white ${
              isPending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
