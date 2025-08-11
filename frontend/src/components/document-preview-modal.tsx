import React from "react";
import { IoDocumentTextOutline, IoClose } from "react-icons/io5";
import { FiDownload, FiShare2, FiStar } from "react-icons/fi";

interface DocumentPreviewModalProps {
  open: boolean;
  onClose: () => void;
  document: {
    title: string;
    author: string;
    date: string;
    category: string;
    description?: string;
    tags?: string[];
    downloads?: number;
    downloadUrl?: string;
  };
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ open, onClose, document }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-50 rounded-t-2xl px-8 py-6 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-wide text-gray-900">{document.title}</h2>
          <button
            className="text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-y-auto p-6 gap-6">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Preview Box */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">Document Preview</h3>
              <IoDocumentTextOutline className="text-blue-500 text-6xl mb-3" />
              <p className="text-gray-500 mb-5">Document preview not available</p>
              <a
                href={document.downloadUrl || "#"}
                download
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                Download to View Full Document
              </a>
            </div>

            {/* Description Box */}
            <div className="bg-gray-180 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-xl mb-2">Description</h3>
              <div className="bg-gray-50 rounded-2xl p-4 text-gray-700 min-h-[70px] whitespace-pre-wrap">
                {document.description?.trim() || "No description provided."}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-96 flex-shrink-0 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-4">Document Information</h3>
              <div>
                <div className="text-gray-500 text-sm">Author</div>
                <div className="font-bold">{document.author}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Upload Date</div>
                <div className="font-bold">{document.date}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Category</div>
                <div className="font-bold">{document.category}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Downloads</div>
                <div className="font-bold">{document.downloads ?? 0}</div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="font-bold mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {document.tags?.length
                  ? document.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))
                  : <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">No tags</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <a
                href={document.downloadUrl || "#"}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg transition-colors"
                download
              >
                <FiDownload className="text-2xl" /> Download Document
              </a>
              <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-lg transition-colors">
                <FiShare2 className="text-2xl" /> Share Document
              </button>
              <button className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl text-lg transition-colors">
                <FiStar className="text-2xl" /> Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
