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
    downloads?: number;
    downloadUrl?: string;
  };
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  open,
  onClose,
  document: doc,
}) => {
  if (!open) return null;
  const filenameFromUrl = (url: string, fallback: string) => {
    try {
      const u = new URL(url);
      const last = u.pathname.split("/").pop();
      if (last && last.trim()) return last;
    } catch {}
    return (fallback || "document").replace(/[^\w.-]+/g, "_");
  };
  const handleDownload = async () => {
    if (!doc.downloadUrl) return;

    try {
      const response = await fetch(doc.downloadUrl, { credentials: "include" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = globalThis.document.createElement("a");
      a.href = url;
      a.download = filenameFromUrl(doc.downloadUrl, doc.title || "document");
      globalThis.document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      if (doc.downloadUrl) {
        window.open(doc.downloadUrl, "_blank");
      }
    }
  };
  const handleShare = async () => {
    if (!doc.downloadUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: doc.title,
          text: `Check out this document: ${doc.title}`,
          url: doc.downloadUrl,
        });
      } else {
        await navigator.clipboard.writeText(doc.downloadUrl);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 rounded-t-2xl px-8 py-6 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-wide text-gray-900">
            {doc.title}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex flex-1 overflow-y-auto p-6 gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">Document Preview</h3>
              <IoDocumentTextOutline className="text-blue-500 text-6xl mb-3" />
              <p className="text-gray-500 mb-5">
                Document preview not available
              </p>
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                Download to View Full Document
              </button>
            </div>

            {/* Description */}
            <div className="bg-gray-180 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-xl mb-2">Description</h3>
              <div className="bg-gray-50 rounded-2xl p-4 text-gray-700 min-h-[70px] whitespace-pre-wrap">
                {doc.description?.trim() || "No description provided."}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-96 flex-shrink-0 flex flex-col gap-6">
            {/* Document Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-4">Document Information</h3>
              <div>
                <div className="text-gray-500 text-sm">Author</div>
                <div className="font-bold">{doc.author}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Upload Date</div>
                <div className="font-bold">{doc.date}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Category</div>
                <div className="font-bold">{doc.category}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Downloads</div>
                <div className="font-bold">{doc.downloads ?? 0}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg transition-colors"
              >
                <FiDownload className="text-2xl" /> Download Document
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-lg transition-colors"
              >
                <FiShare2 className="text-2xl" /> Share Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
