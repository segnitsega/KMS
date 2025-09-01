import React, { useState, useEffect } from "react";
import { FiFileText } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Header from "@/components/reusable-header";
import loadingSpinner from "@/assets/loading-spinner.svg";
import api from "@/utility/api";

const AdminTasksDashboard: React.FC = () => {
  const [submittedTasks, setSubmittedTasks] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionDetails, setSubmissionDetails] = useState<any | null>(null);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [submissionsRes, tasksRes] = await Promise.all([
        api.get("/tasks/submit"),
        api.get("/tasks"),
      ]);
      const submissions = submissionsRes.data.tasks || submissionsRes.data;
      const allTasks = tasksRes.data.tasks || tasksRes.data.tasks;
      setTasks(allTasks);
      // Match submissions with tasks
      const matchedTasks = submissions.map((sub: any) => {
        const task = allTasks.find((t: any) => t.id === sub.taskId);
        return {
          id: sub.id,
          title: task ? task.title : "Unknown Task",
          user: task ? `${task.user.firstName} ${task.user.lastName}` : "Unknown User",
          submittedAt: new Date(sub.createdAt).toLocaleDateString(),
          description: sub.description,
          fileUrl: sub.documentUrl,
          status: "Submitted",
          dueDate: task ? new Date(task.dueDate).toLocaleDateString() : "N/A",
          taskStatus: task ? task.taskStatus : "UNKNOWN",
          taskId: sub.taskId,
        };
      });
      setSubmittedTasks(matchedTasks);
    } catch (err: any) {
      setError("Failed to load submitted tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissionDetails = async (taskId: string) => {
    setSubmissionLoading(true);
    setSubmissionError(null);
    try {
      const res = await api.get(`/tasks/submit/${taskId}`);
      setSubmissionDetails(res.data.data.submission);
    } catch (err: any) {
      setSubmissionError("Failed to load submission details");
    } finally {
      setSubmissionLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openSubmissionModal = (task: any) => {
    setCurrentTask(task);
    fetchSubmissionDetails(task.taskId);
    setShowSubmissionModal(true);
  };

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

  const handleDownload = (taskId: string) => {
    const url= import.meta.env.VITE_BACKEND_URL
    console.log(taskId)
    const downloadEndpoint = `${url}/tasks/download/${taskId}`
    window.location.href = downloadEndpoint;
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
                      onClick={() => openSubmissionModal(task)}
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
              {submissionLoading && (
                <p className="text-gray-500">Loading submission details...</p>
              )}
              {submissionError && (
                <p className="text-red-500">{submissionError}</p>
              )}
              {submissionDetails && (
                <>
                  <p>
                    <strong>Description:</strong> {submissionDetails.description}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() =>  handleDownload(currentTask.id)}
                      className="text-blue-600 underline font-medium"
                    >
                      View Submitted File
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTasksDashboard;
