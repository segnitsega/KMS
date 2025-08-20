import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiSave, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface ManageDocumentsProps {
  onClose?: () => void; // optional callback to close the page
}

const ManageDocuments: React.FC<ManageDocumentsProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [documents, setDocuments] = useState<
    { title: string; content: string }[]
  >([
    {
      title: "Employee Onboarding Guide",
      content: "Details about onboarding new employees.",
    },
    {
      title: "API Documentation v2.1",
      content: "Documentation for the API version 2.1.",
    },
    {
      title: "Marketing Strategy Q1",
      content: "Marketing strategies for the first quarter.",
    },
  ]);

  const handleSaveDocument = () => {
    if (title && content) {
      setDocuments([...documents, { title, content }]);
      setTitle("");
      setContent("");
    }
  };

  const handleDeleteDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    setDocuments(newDocuments);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-lg relative">
    
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FiX />
        </button>
      )}

    
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Manage Documents</h2>
        <p className="text-sm text-gray-500">
          Create, edit, and organize documents
        </p>
      </div>

 
      <label className="block text-sm font-medium mb-1">Document Title</label>
      <input
        type="text"
        placeholder="Enter document title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-lg p-2 mb-3 w-full focus:ring-2 focus:ring-blue-400"
      />

      <label className="block text-sm font-medium mb-1">Content</label>
      <textarea
        placeholder="Enter document content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded-lg p-2 mb-4 w-full focus:ring-2 focus:ring-blue-400"
        rows={3}
      />

      <Button
        onClick={handleSaveDocument}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl w-full py-2 text-sm font-medium shadow"
      >
        <FiSave className="w-4 h-4" /> Save Document
      </Button>

      <h3 className="font-semibold text-md mt-6 mb-2">Recent Documents</h3>
      <div className="space-y-2">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 shadow-sm"
          >
            <span className="text-sm">{doc.title}</span>
            <div className="flex gap-3">
              <button className="text-blue-500 hover:text-blue-700">
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteDocument(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDocuments;
