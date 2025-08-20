import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiX, FiCheck, FiXCircle } from "react-icons/fi";

interface Document {
  id: string;
  title: string;
  fileName: string;
  author: string;
  category: string;
  updatedAt: string;
}

interface ManageDocumentsProps {
  onClose?: () => void;
  documents?: Document[];
  onUpdate?: (updatedDocument: Document) => void;
  onDelete?: (documentId: string) => void;
}

const ManageDocuments: React.FC<ManageDocumentsProps> = ({ 
  onClose, 
  documents: initialDocuments = [], 
  onUpdate, 
  onDelete 
}) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Document>>({});

  const sampleDocuments: Document[] = [
    {
      id: "1",
      title: "Employee Onboarding Guide",
      fileName: "onboarding-guide-2024.pdf",
      author: "Sarah Wilson",
      category: "HR",
      updatedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "API Documentation v2.1",
      fileName: "api-docs-v2.1.pdf",
      author: "Michael Chen",
      category: "Development",
      updatedAt: "2024-01-14"
    },
    {
      id: "3",
      title: "Marketing Strategy Q1",
      fileName: "marketing-strategy-q1-2024.pdf",
      author: "Emma Davis",
      category: "Marketing",
      updatedAt: "2024-01-13"
    },
  ];

  const displayDocuments = documents.length > 0 ? documents : sampleDocuments;

  const handleEdit = (document: Document) => {
    setEditingId(document.id);
    setEditForm({
      title: document.title,
      category: document.category
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editForm.title) {
      const updatedDocuments = displayDocuments.map(document =>
        document.id === editingId
          ? { ...document, ...editForm, updatedAt: new Date().toISOString().split('T')[0] }
          : document
      );
      
      setDocuments(updatedDocuments);
      
      const updatedDocument = updatedDocuments.find(d => d.id === editingId);
      if (updatedDocument && onUpdate) {
        onUpdate(updatedDocument);
      }
      
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (documentId: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this document?");
    if (shouldDelete) {
      const updatedDocuments = displayDocuments.filter(document => document.id !== documentId);
      setDocuments(updatedDocuments);
      
      if (onDelete) {
        onDelete(documentId);
      }
    }
  };

  const handleInputChange = (field: keyof Document, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          <FiX />
        </button>
      )}
      
      <h2 className="text-base font-semibold mb-1">Manage Documents</h2>
      <p className="text-xs text-gray-500 mb-3">Edit or delete documents</p>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {displayDocuments.map((document) => (
          <div
            key={document.id}
            className="bg-gray-50 rounded-lg p-3 shadow-sm"
          >
            {editingId === document.id ? (
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                  >
                    <FiCheck className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                  >
                    <FiXCircle className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{document.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{document.fileName}</span>
                    <span className="text-xs text-gray-500">{document.category}</span>
                    <span className="text-xs text-gray-400">{document.updatedAt}</span>
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => handleEdit(document)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Edit document"
                  >
                    <FiEdit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(document.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete document"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {displayDocuments.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">No documents found</p>
        </div>
      )}
    </div>
  );
};

export default ManageDocuments;
