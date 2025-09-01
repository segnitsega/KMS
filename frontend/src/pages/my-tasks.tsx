import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TaskCard } from "@/components/TaskCard";
import type { TaskCardProps } from "@/components/TaskCard";
import SubmitTaskModal from "@/components/SubmitTaskModal";
import TaskDetailModal from "@/components/TaskDetailModal";
import api from "@/utility/api"; // axios instance with token interceptor
import { toast } from "sonner";
import loadingSpinner from "@/assets/loading-spinner.svg";

// API call to fetch user tasks
const getUserTasks = async () => {
  const res = await api.get("/tasks/user");
  return res.data.data.tasks; // matches your controller return
};

const MyTasks: React.FC = () => {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userTasks"],
    queryFn: getUserTasks,
  });

  const handleSubmitTask = (taskId: string, taskData: any) => {
    setSelectedTask(taskData);
    setSubmitModalOpen(true);
  };

  const handleViewDetails = async (taskId: string, taskData: any) => {
    try {
      // Fetch task details
      const taskResponse = await api.get(`/tasks/${taskId}`);
      const taskDetails = taskResponse.data.data.task;

      // If task is done, try to fetch submission details
      let submission = null;
      if (taskDetails.taskStatus === 'DONE') {
        try {
          const submissionResponse = await api.get(`/tasks/submit/${taskId}`);
          submission = submissionResponse.data.data.submission;
        } catch (error) {
          console.log('No submission found for this task');
        }
      }

      setSelectedTask(taskDetails);
      setSelectedSubmission(submission);
      setDetailModalOpen(true);
    } catch (error: any) {
      toast.error('Failed to load task details');
      console.error('Error fetching task details:', error);
    }
  };

  const handleSubmitSuccess = () => {
    refetch(); // Refresh the tasks list
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <img src={loadingSpinner} alt="Loading..." className="w-8 h-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load tasks. Please try again.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">My Tasks</h1>
      <p className="text-gray-500">
        View and manage your assigned tasks, priorities, and deadlines.
      </p>

      <div className="flex flex-col gap-6">
        {tasks && tasks.length > 0 ? (
          tasks.map((task: any) => {
            // Map backend task into TaskCardProps shape
            const taskProps: TaskCardProps = {
              title: task.title,
              status: task.taskStatus || "Pending",
              priority: task.priority || "Normal",
              priorityColor:
                task.priority === "High"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700",
              statusColor:
                task.taskStatus === "DONE"
                  ? "bg-green-100 text-green-700"
                  : task.taskStatus === "IN_PROGRESS"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700",
              desc: task.description || "",
              due: task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : undefined,
              completed: task.completedAt
                ? new Date(task.completedAt).toLocaleDateString()
                : undefined,
              assignedAgo: task.uploadedAt
                ? new Date(task.uploadedAt).toLocaleDateString()
                : undefined,
              submitted: task.submissionStatus,
              assignedBy:
                `${task.user?.firstName || ""} ${
                  task.user?.lastName || ""
                }`.trim() || "System",
              taskId: task.id,
              taskData: task,
              actions: [
                {
                  label:
                    task.taskStatus === "DONE" ? "View Submission" : "Submit",
                  variant: "solid",
                  color:
                    task.taskStatus === "DONE"
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white",
                  onClick: task.taskStatus === "DONE"
                    ? (taskId, taskData) => handleViewDetails(taskId, taskData)
                    : (taskId, taskData) => handleSubmitTask(taskId, taskData),
                },
                {
                  label: "View Details",
                  variant: "outline",
                  color: "border border-[#e3eafc] text-[#1976ed] bg-white",
                  onClick: (taskId, taskData) => handleViewDetails(taskId, taskData),
                },
              ],
              completedText:
                task.taskStatus === "DONE" ? "Task Completed" : undefined,
              completedTextColor:
                task.taskStatus === "DONE" ? "text-green-600" : undefined,
            };

            return <TaskCard key={task.id} {...taskProps} />;
          })
        ) : (
          <p className="text-gray-500 text-center">No tasks assigned yet.</p>
        )}
      </div>

      {/* Submit Task Modal */}
      <SubmitTaskModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        taskId={selectedTask?.id || ''}
        taskTitle={selectedTask?.title || ''}
        onSubmitSuccess={handleSubmitSuccess}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        task={selectedTask}
        submission={selectedSubmission}
      />
    </div>
  );
};

export default MyTasks;
