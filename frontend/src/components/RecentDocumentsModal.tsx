import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import DocumentPageCard from "@/cards/documents/document-page-card";

const RecentDocumentsModal = ({ documents, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-[1200px] max-h-[105vh] relative border border-gray-200 transform scale-95 animate-scaleIn flex flex-col">
        
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold z-10"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

    
        <div className="flex items-center gap-3 px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-t-3xl shadow-md z-10">
          <IoDocumentTextOutline className="text-3xl" />
          <h2 className="text-2xl font-bold tracking-wide">
            All Recent Documents
          </h2>
        </div>


        <div className="p-8 overflow-y-auto flex-1">
          {documents.length > 0 ? (
            <div className="flex flex-col gap-6">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 rounded-xl"
                >
                  <DocumentPageCard
                    title={doc.title}
                    author={doc.owner || doc.author}
                    date={doc.uploadDate || doc.date}
                    numberOfDownloads={parseInt(doc.downloads || doc.numberOfDownloads || "0")}
                    categories={doc.categories || []}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-10">
              No recent documents found.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RecentDocumentsModal;
