import React from "react";
import { IoDocumentTextOutline, IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { formatDateDDMMYY } from "@/lib/utils";

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
  // const handleShare = async () => {
  //   if (!doc.downloadUrl) return;
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({
  //         title: doc.title,
  //         text: `Check out this document: ${doc.title}`,
  //         url: doc.downloadUrl,
  //       });
  //     } else {
  //       await navigator.clipboard.writeText(doc.downloadUrl);
  //       alert("Link copied to clipboard!");
  //     }
  //   } catch (err) {
  //     console.error("Share failed:", err);
  //   }
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm sm:p-4">
      <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-3 rounded-t-2xl bg-blue-50 px-4 py-4 sm:items-center sm:px-8 sm:py-6">
          <h2 className="min-w-0 flex-1 text-lg font-bold tracking-wide text-gray-900 sm:text-2xl">
            {doc.title}
          </h2>
          <button
            className="shrink-0 text-2xl font-bold text-gray-400 transition-colors hover:text-gray-700"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:gap-6 sm:p-6 lg:flex-row">
          <div className="flex flex-1 flex-col gap-4 sm:gap-6">
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4 sm:p-8">
              <h3 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">Document Preview</h3>
              <IoDocumentTextOutline className="mb-3 text-5xl text-blue-500 sm:text-6xl" />
              <p className="mb-4 text-center text-sm text-gray-500 sm:mb-5 sm:text-base">
                Document preview not available
              </p>
              <button
                onClick={handleDownload}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-base font-bold text-white transition-colors hover:bg-blue-700 sm:w-auto sm:px-8 sm:py-3 sm:text-lg"
              >
                Download to View Full Document
              </button>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-gray-100 bg-gray-180 p-4 sm:p-6">
              <h3 className="mb-2 text-lg font-bold sm:text-xl">Description</h3>
              <div className="min-h-[70px] whitespace-pre-wrap rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 sm:text-base">
                {doc.description?.trim() || "No description provided."}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex w-full shrink-0 flex-col gap-4 sm:gap-6 lg:w-96">
            {/* Document Info */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
              <h3 className="mb-2 text-lg font-bold sm:mb-4 sm:text-xl">Document Information</h3>
              <div>
                <div className="text-gray-500 text-sm">Author</div>
                <div className="font-bold">{doc.author}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Upload Date</div>
                <div className="font-bold">{formatDateDDMMYY(doc.date)}</div>
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 sm:text-lg"
              >
                <FiDownload className="text-xl sm:text-2xl" /> Download Document
              </button>

              {/* <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-lg transition-colors"
              >
                <FiShare2 className="text-2xl" /> Share Document
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
