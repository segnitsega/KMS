import React from "react";
import { Button } from "@/components/ui/button";
import {
  FiX,
  FiDownload,
  FiEye,
  FiInfo,
  FiFileText,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { toast } from "sonner";
import { formatDateDDMMYY } from "@/lib/utils";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
  submission?: any;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  submission,
}) => {
  if (!isOpen || !task) return null;

  const handleDownload = () => {
    if (submission?.documentUrl) {
      window.open(submission.documentUrl, "_blank");
    } else {
      toast.error("❌ No submission file available");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <FiInfo className="w-5 h-5 text-blue-600" />
              Task Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Task Information */}
            <div className="border rounded-xl p-5 bg-gray-50">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-700">
                <FiFileText className="text-indigo-500" /> Task Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Title" value={task.title} />
                <BadgeField
                  label="Status"
                  value={task.taskStatus || "Pending"}
                  color={
                    task.taskStatus === "DONE"
                      ? "bg-green-100 text-green-700"
                      : task.taskStatus === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }
                />
                <BadgeField
                  label="Priority"
                  value={task.priority || "Normal"}
                  color={
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }
                />
                <InfoField
                  label="Assigned By"
                  value="Department Manager"
                  icon={<FiUser className="w-4 h-4 text-gray-500" />}
                />
                {task.dueDate && (
                  <InfoField
                    label="Due Date"
                    value={formatDateDDMMYY(task.dueDate)}
                    icon={<FiClock className="w-4 h-4 text-gray-500" />}
                  />
                )}
                {task.uploadedAt && (
                  <InfoField
                    label="Assigned Date"
                    value={formatDateDDMMYY(task.uploadedAt)}
                    icon={<FiClock className="w-4 h-4 text-gray-500" />}
                  />
                )}
              </div>

              {task.description && (
                <div className="mt-5">
                  <label className="text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <p className="text-gray-800 mt-1 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              )}
            </div>

            {/* Submission Information */}
            {submission && (
              <div className="border rounded-xl p-5 bg-blue-50">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-700">
                  <FiEye className="text-blue-600" /> Submission Details
                </h3>
                <div className="space-y-4">
                  <InfoField
                    label="Submission Description"
                    value={submission.description}
                  />
                  <InfoField
                    label="Submitted At"
                    value={`${formatDateDDMMYY(
                      submission.createdAt
                    )} at ${new Date(
                      submission.createdAt
                    ).toLocaleTimeString()}`}
                  />
                  {submission.documentUrl && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-gray-600">
                        Document
                      </label>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <FiDownload className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No Submission Yet */}
            {!submission && task.taskStatus !== "DONE" && (
              <div className="border rounded-xl p-5 bg-yellow-50">
                <div className="flex items-center gap-3">
                  <FiEye className="w-5 h-5 text-yellow-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800">
                      Not Submitted Yet
                    </h3>
                    <p className="text-yellow-700 text-sm">
                      This task has not been submitted yet.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end mt-6 border-t pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable field components */
const InfoField = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div>
    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
      {icon} {label}
    </label>
    <p className="text-gray-900">{value}</p>
  </div>
);

const BadgeField = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {value}
    </span>
  </div>
);

export default TaskDetailModal;
