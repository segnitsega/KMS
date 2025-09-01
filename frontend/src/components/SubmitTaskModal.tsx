import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utility/api";
import { toast } from "sonner";
import { FiUpload, FiX } from "react-icons/fi";

interface SubmitTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
  onSubmitSuccess: () => void;
}

const SubmitTaskModal: React.FC<SubmitTaskModalProps> = ({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  onSubmitSuccess,
}) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file to upload");
    if (!description.trim()) return toast.error("Please provide a description");

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);

      await api.post(`/tasks/submit/${taskId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Task submitted successfully!");
      onSubmitSuccess();
      onClose();
      setDescription("");
      setFile(null);
    } catch (error: any) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.message || "Failed to submit task");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiUpload className="text-blue-600 w-5 h-5" />
              Submit Task
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Task Title */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-700">{taskTitle}</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your submission..."
                className="mt-1"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="file">Upload File</Label>
              <div className="mt-1">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              {file && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <FiUpload className="w-4 h-4" />
                    Submit
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitTaskModal;
