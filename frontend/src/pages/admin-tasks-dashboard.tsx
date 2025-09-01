import React, { useState } from "react";
import { FiEye, FiFileText } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Header from "@/components/reusable-header";
import loadingSpinner from "@/assets/loading-spinner.svg";

// Mock data (replace with API later)
const submittedTasks = [
  {
    id: 1,
    title: "Website UI Design",
    user: "John Doe",
    submittedAt: "2025-08-30",
    description: "Redesigned the dashboard UI using Tailwind and Shadcn.",
    fileUrl: "/mock-files/design-solution.pdf",
    status: "Pending",
    dueDate: "2025-09-05",
    taskStatus: "DONE",
  },
  {
    id: 2,
    title: "Database Schema",
    user: "Jane Smith",
    submittedAt: "2025-08-28",
    description: "Normalized schema for project DB with ER diagram.",
    fileUrl: "/mock-files/schema.pdf",
    status: "Reviewed",
    dueDate: "2025-09-02",
    taskStatus: "DONE",
  },
];

const AdminTasksDashboard: React.FC = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<
    (typeof submittedTasks)[0] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <img src={loadingSpinner} alt="Loading tasks" className="w-16 h-16" />
        <p className="mt-4 text-gray-500">Loading submitted tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Header
        title="Submitted Solutions"
        subtitle="View and manage submitted tasks from users."
      />
      <div className="mt-6">
        {/* Table Format */}
        <div className="overflow-x-auto rounded-lg border shadow">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Submitted At</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {submittedTasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{task.title}</td>
                  <td className="px-6 py-4">{task.user}</td>
                  <td className="px-6 py-4">{task.submittedAt}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        task.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentTask(task);
                        setShowDetailsModal(true);
                      }}
                      className="flex items-center gap-2"
                    >
                      <FiEye /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentTask(task);
                        setShowSubmissionModal(true);
                      }}
                      className="flex items-center gap-2"
                    >
                      <FiFileText /> View Submission
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Details Modal */}
        {showDetailsModal && currentTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative max-h-[80vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-500 text-3xl font-bold hover:text-red-500 cursor-pointer"
                onClick={() => setShowDetailsModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-6 text-blue-700">
                {currentTask.title}
              </h2>
              <p>
                <strong>Submitted by:</strong> {currentTask.user}
              </p>
              <p>
                <strong>Submitted At:</strong> {currentTask.submittedAt}
              </p>
              <p>
                <strong>Status:</strong> {currentTask.status}
              </p>
              <p>
                <strong>Due Date:</strong> {currentTask.dueDate}
              </p>
              <p>
                <strong>Description:</strong> {currentTask.description}
              </p>
              <div className="mt-4">
                <a
                  href={currentTask.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-medium"
                >
                  View Submitted File
                </a>
              </div>
            </div>
          </div>
        )}

        {/* View Submission Modal */}
        {showSubmissionModal && currentTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative max-h-[80vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-500 text-3xl font-bold hover:text-red-500 cursor-pointer"
                onClick={() => setShowSubmissionModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-6 text-green-700">
                Submission Details
              </h2>
              <p>
                <strong>Task:</strong> {currentTask.title}
              </p>
              <p>Submission details UI placeholder.</p>
              <p>(Submission data is not yet implemented in backend.)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTasksDashboard;
