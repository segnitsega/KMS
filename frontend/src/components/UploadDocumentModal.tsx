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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/85 p-3 backdrop-blur-sm sm:p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-white px-4 py-6 shadow-md sm:px-6 sm:py-8">
        <h2 className="mb-4 text-lg font-bold sm:text-xl">Upload New Document</h2>

        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="min-w-0 flex-1">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter document title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="min-w-0 flex-1">
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

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
          <button
            onClick={onClose}
            className="w-full rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isPending}
            className={`w-full rounded-md px-4 py-2 text-white sm:w-auto ${
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
