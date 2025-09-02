import api from "@/utility/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiX, FiCheck, FiXCircle } from "react-icons/fi";
import spinner from "../assets/loading-spinner.svg";
import { toast } from "sonner";
import { formatDateDDMMYY } from "@/lib/utils";

const categories = [
  "Financial and Accounting",
  "Technical and Project Docs",
  "Reports and Analytics ",
  "Policies and Procedures",
  "HR",
];

interface Document {
  id: string;
  title: string;
  description: string;
  fileName: string;
  author: string;
  category: string;
  updatedAt: string;
}

interface ManageDocumentsProps {
  onClose?: () => void;
}

const ManageDocuments: React.FC<ManageDocumentsProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    title: string;
    description: string;
    category: string;
  }>({ title: "", description: "", category: "" });

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", description: "", category: "" });
  };

  const getDocs = async (limit: number) => {
    const docs = await api.get(`/docs?&limit=${limit}`);
    return docs.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getDocs(100),
    queryKey: ["docs"],
  });

  const { mutate: updateDocument, isPending } = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
      id: string;
    }) => {
      console.log(data);
      const response = await api.post(`/admin/update-doc/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docs"] });
      toast("✅ Document updated successfully");
    },
    onError: () => {
      toast("❌ Error updating document");
    },
  });

  const { mutate: deleteDocument, isPending: deletePending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/admin/delete-doc/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["docs"] });
      toast("✅ Document deleted successfully");
    },
    onError: () => {
      toast("❌ Error deleting document");
    },
  });

  const handleDeleteDocument = (id: string) => {
    deleteDocument(id);
  };

  const handleDocumentUpdate = (id: string) => {
    const requestData = {
      title: editForm.title,
      description: editForm.description,
      category: editForm.category,
      id: id,
    };
    updateDocument(requestData);
  };

  return (
    <div className="p-6 bg-white rounded-lg w-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Documents</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-xl"
        >
          <FiX />
        </button>
      </div>
      <p className=" text-gray-500 mb-3">Edit or delete documents</p>
      {isLoading && (
        <div className="flex bg-white justify-center mt-10">
          <img src={spinner} width={50} alt="loading" />
        </div>
      )}

      {isError && (
        <div className="flex h-screen bg-white text-red-500 justify-center items-center">
          Error getting documents please refresh the page !
        </div>
      )}

      {data && (
        <div className="max-h-100 overflow-y-auto">
          {data.documents.map((document) => (
            <div
              key={document.id}
              className="border mr-2 mb-4 rounded-lg p-3 shadow"
            >
              <div className="flex gap-2 justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {document.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {document.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs bg-gray-200 border p-1 rounded-lg">
                      {document.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDateDDMMYY(document.uploadedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => setEditingId(document.id)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Edit document"
                  >
                    <FiEdit2 className="w-3 h-3" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete document"
                    onClick={() => handleDeleteDocument(document.id)}
                  >
                    <FiTrash2
                      className={`w-3 h-3  ${deletePending && "text-red-400"} `}
                    />
                  </button>
                </div>
              </div>

              {editingId === document.id && (
                <div className="space-y-2 mt-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      placeholder="Add new title"
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editForm.description}
                      placeholder="Add new description"
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <select
                      className="border p-1 rounded"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          category: e.target.value,
                        })
                      }
                    >
                      {categories.map((category) => (
                        <option value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDocumentUpdate(document.id)}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      <FiCheck className="w-3 h-3" />
                      {isPending ? "Saving..." : "Save"}
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDocuments;
