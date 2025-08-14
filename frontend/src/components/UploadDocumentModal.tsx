import React, { useRef, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

interface UploadDocumentModalProps {
  onClose: () => void;
  onUpload?: (file: File, description: string, title: string, category: string, tags: string[]) => void;
}

const categories = ["Financial & Accounting", "Technical & Project Docs", "Reports & Analytics ", "Policies & Procedures", "HR"];

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [tags, setTags] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file && onUpload && title) {
      const tagsArr = tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
      onUpload(file, description, title, category, tagsArr);
      setFile(null);
      setDescription("");
      setTitle("");
      setCategory(categories[0]);
      setTags("");
      onClose();
    }
  };

  return (
    <div className="fixed rounded-t-md px-40 border inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-t-md w-full max-w-8x1 max-h-[95vh] relative transform scale-95 animate-scaleIn flex flex-col">
        <button
          className="absolute top-5 right-5 text-white  text-4xl z-20"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <div className="flex items-center gap-1 pl-8 py-6 bg-blue-500 rounded-t-md text-white">
          <IoDocumentTextOutline className="text-2xl text-white" />
          <h2 className="text-2xl tracking-wide">Upload New Document</h2>
        </div>
        <div className="p-8 flex-1 flex flex-col gap-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Document Title</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2    outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter a descriptive title..."
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2  outline-none focus:ring-1 focus:ring-blue-500"
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
            <label className="block text-gray-700 font-semibold mb-2">File Upload</label>
            <div
              className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-colors duration-200 ${dragActive ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-blue-50"}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              style={{ cursor: "pointer" }}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />
              <FiUpload className="text-blue-700 text-6xl mb-4" />
              <p className="text-gray-700 font-semibold mb-1 text-lg">
                {file ? file.name : "Drag and drop your file here"}
              </p>
              <p className="text-gray-400 text-sm">or click to browse from your computer</p>
              <p className="text-gray-400 text-sm mt-2">Supported: PDF, DOC, DOCX, TXT</p>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 min-h-[100px] text-base outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write a short description about the document..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          {/* <div>
            <label className="block text-gray-700 font-semibold mb-2">Tags</label>
            <input
              className="w-full border border-gray-200 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter tags separated by commas (e.g., policy, guidelines, training)..."
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div> */}
          <div className="flex justify-end gap-4 mt-2">
            <button
              className="px-6 py-3 rounded-md text-gray-600 bg-gray-100 font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
            className="bg-blue-500 text-white p-3 rounded-md text-lg cursor-pointer hover:bg-blue-600"
              onClick={handleUpload}
              disabled={!file || !description || !title}
              type="button"
            >
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
