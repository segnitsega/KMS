import React, { useEffect, useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import type { TaskCardProps } from "@/components/TaskCard";
import api from "@/utility/api";

const mapTaskStatusToDisplay = (status: string) => {
  switch (status) {
    case "PENDING":
      return { label: "Pending", color: "bg-yellow-100 text-yellow-700" };
    case "ONPROGRESS":
      return { label: "In Progress", color: "bg-blue-100 text-blue-700" };
    case "DONE":
      return { label: "Completed", color: "bg-green-100 text-green-700" };
    default:
      return { label: status, color: "bg-gray-100 text-gray-700" };
  }
};

const calculatePriority = (dueDateStr: string | undefined) => {
  if (!dueDateStr) return { label: "No Priority", color: "bg-gray-100 text-gray-700" };
  const dueDate = new Date(dueDateStr);
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();
  if (diff < 0) {
    return { label: "Urgent", color: "bg-red-600 text-white" };
  } else if (diff < 3 * 24 * 60 * 60 * 1000) {
    return { label: "High Priority", color: "bg-red-100 text-red-700" };
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    return { label: "Medium Priority", color: "bg-yellow-100 text-yellow-700" };
  } else {
    return { label: "Low Priority", color: "bg-green-100 text-green-700" };
  }
};

const formatAssignedAgo = (uploadedAtStr: string | undefined) => {
  if (!uploadedAtStr) return "";
  const uploadedAt = new Date(uploadedAtStr);
  const now = new Date();
  const diffMs = now.getTime() - uploadedAt.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState<string>("");
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSubmissionViewModal, setShowSubmissionViewModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/tasks/user");
      if (response.data.status === "success") {
        const backendTasks = response.data.data.tasks;
        setTasks(backendTasks);
      } else {
        setError("Failed to load tasks");
      }
    } catch (err) {
      setError("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };


  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await api.put(`/tasks/${taskId}/status`, { taskStatus: newStatus });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task status");
    }
  };

  const submitTask = async () => {
    if (!currentTaskId) return;
    try {
      // For simplicity, only sending submissionText; file upload handling can be added later
      await api.post(`/tasks/${currentTaskId}/submit`, {
        submissionText,
        submissionFiles: [], // file upload not implemented yet
      });
      setShowSubmissionModal(false);
      setSubmissionText("");
      setSubmissionFiles([]);
      fetchTasks();
    } catch (err) {
      setError("Failed to submit task");
    }
  };

  const getActionsForStatus = (status: string, task: any, refresh: () => void) => {
    switch (status) {
      case "PENDING":
        return [
          {
            label: "Start Task",
            variant: "solid" as const,
            color: "bg-blue-600 text-white",
            onClick: () => updateTaskStatus(task.id, "ONPROGRESS"),
          },
          {
            label: "View Details",
            variant: "outline" as const,
            color: "border border-[#e3eafc] text-[#1976ed] bg-white",
            onClick: () => {
              setCurrentTask(task);
              setShowDetailsModal(true);
            },
          },
        ];
      case "ONPROGRESS":
        return [
          {
            label: "Submit Solution",
            variant: "solid" as const,
            color: "bg-blue-600 text-white",
            onClick: () => {
              setCurrentTaskId(task.id);
              setShowSubmissionModal(true);
            },
          },
          {
            label: "View Details",
            variant: "outline" as const,
            color: "border border-[#e3eafc] text-[#1976ed] bg-white",
            onClick: () => {
              setCurrentTask(task);
              setShowDetailsModal(true);
            },
          },
        ];
      case "DONE":
        return [
          {
            label: "View Submission",
            variant: "solid" as const,
            color: "bg-green-600 text-white",
            onClick: () => {
              setCurrentTask(task);
              setShowSubmissionViewModal(true);
            },
          },
          {
            label: "View Details",
            variant: "outline" as const,
            color: "border border-[#e3eafc] text-[#1976ed] bg-white",
            onClick: () => {
              setCurrentTask(task);
              setShowDetailsModal(true);
            },
          },
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div>No tasks assigned.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold  gap-3">My Tasks</h1>
        <p className="text-gray-500 ">
          View and manage your assigned tasks, priorities, and deadlines.
        </p>
        <div className="flex flex-col gap-6">
          {tasks.map((task, idx) => (
            <TaskCard
              key={idx}
              title={task.title}
              status={mapTaskStatusToDisplay(task.taskStatus).label}
              statusColor={mapTaskStatusToDisplay(task.taskStatus).color}
              priority={calculatePriority(task.dueDate).label}
              priorityColor={calculatePriority(task.dueDate).color}
              desc={task.description}
              due={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : undefined}
              assignedAgo={formatAssignedAgo(task.uploadedAt)}
              assignedBy="Admin"
              actions={getActionsForStatus(task.taskStatus, task, fetchTasks)}
            />
          ))}
        </div>
      </div>

      {showSubmissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 text-3xl font-bold hover:text-red-500 cursor-pointer"
              onClick={() => setShowSubmissionModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6 text-blue-700">Submit Task</h2>
            <textarea
              className="w-full mb-4 p-3 border rounded-lg"
              placeholder="Enter your solution or submission details here..."
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            />
            {/* File upload can be added here */}
            <div className="flex justify-end gap-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                onClick={submitTask}
              >
                Submit
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300"
                onClick={() => setShowSubmissionModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
            <h2 className="text-xl font-bold mb-6 text-blue-700">Task Details</h2>
            <p><strong>Title:</strong> {currentTask.title}</p>
            <p><strong>Description:</strong> {currentTask.description}</p>
            <p><strong>Status:</strong> {mapTaskStatusToDisplay(currentTask.taskStatus).label}</p>
            <p><strong>Due Date:</strong> {currentTask.dueDate ? new Date(currentTask.dueDate).toLocaleDateString() : "N/A"}</p>
            <p><strong>Uploaded At:</strong> {currentTask.uploadedAt ? new Date(currentTask.uploadedAt).toLocaleString() : "N/A"}</p>
          </div>
        </div>
      )}

      {showSubmissionViewModal && currentTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 text-3xl font-bold hover:text-red-500 cursor-pointer"
              onClick={() => setShowSubmissionViewModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6 text-green-700">View Submission</h2>
            <p>Submission details UI placeholder.</p>
            <p>(Submission data is not yet implemented in backend.)</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTasks;
