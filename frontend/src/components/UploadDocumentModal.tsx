import React, { useRef, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

interface UploadDocumentModalProps {
  onClose: () => void;
  onUpload?: (file: File, description: string, title: string, category: string, tags: string[]) => void;
}

const categories = ["General", "Engineering", "HR", "Marketing", "Finance", "Legal"];

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-8x1 max-h-[95vh] relative border border-blue-200 transform scale-95 animate-scaleIn flex flex-col">
        <button
          className="absolute top-5 right-5 text-black-400 hover:text-black-700 transition-colors text-2xl font-bold z-20"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <div className="flex items-center gap-3 px-8 py-8 bg-blue-600 text-white rounded-t-3xl shadow-md z-10">
          <IoDocumentTextOutline className="text-3xl text-white" />
          <h2 className="text-3xl font-bold tracking-wide">Upload New Document</h2>
        </div>
        <div className="p-8 flex-1 flex flex-col gap-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">Document Title</label>
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
              className="w-full border border-gray-300 rounded-lg p-4 min-h-[100px] text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write a short description about the document..."
              value={description}
              onChange={e => setDescription(e.target.value)}
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
              style={{ backgroundColor: '#0f5bf1ff', color: '#fff', fontWeight: 'bold', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontSize: '1.125rem', border: 'none', outline: 'none', boxShadow: 'none' }}
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
